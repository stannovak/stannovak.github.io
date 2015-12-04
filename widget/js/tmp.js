var totalAmount = 0;
var currentSlide = 'preset';
var beforeCalcSlide = 'preset';
var designateObj = {};

$('.give-presets__button[rel!=other]').on('click', function() {
    totalAmount = parseInt($(this).attr('rel'));
    setAmount();
    $('.give-presets__button[rel!=other]').removeClass('is-active');

    $(this).addClass('is-active');
});

$('.give-presets__button[rel!=other]').one('click', function() {
     $(this)
     .parents('.give-widget')
     .find('.give-confirmation-container')
     .slideDown(300)
     .attr('rel','visible');
});



var beforePoint = document.querySelector('.give-amount__before-point');
beforePoint.maxLen = 6;
var afterPoint = document.querySelector('.give-amount__after-point');
afterPoint.maxLen = 2;
var clearBtn = document.querySelector('.give-amount-bar__right-button');


if (beforePoint) {
    beforePoint.onclick = function() {
        beforePoint.classList.toggle('give-focus-in');
        currentInput = beforePoint;
    };
}

if (afterPoint) {
    afterPoint.onclick = function() {
        afterPoint.classList.toggle('give-focus-in');
        currentInput = afterPoint;
    };
}

var resetPreset = function() {
    $('.give-presets__button[rel!=other]').removeClass('is-active');
    $('.give-presets__button[rel='+parseInt(totalAmount)+']').addClass('is-active');
}

// beforePoint.classList.add('give-focus-in');
var currentInput = beforePoint;
function handleClick(e) {
    var value = e.target.textContent;
    if (value === '.') {
        afterPoint.classList.toggle('give-focus-in');
        beforePoint.classList.toggle('give-focus-in');
        currentInput = afterPoint.classList.contains('give-focus-in') ? afterPoint : beforePoint;
        return;
    }

    var parts = totalAmount.formatMoney().replace(',','').split('.');
    var idx = 0;
    if (currentInput.maxLen == 2) {
        idx = 1;
    }
    parts[idx] = (parseInt(parts[idx])*10 + parseInt(value)).toString();
    console.log(parts[idx]);
    if (parts[idx].length > currentInput.maxLen) {
        return;
    }

    var newAmountParts = (parseInt(parts[0]) + parseInt(parts[1])/100).formatMoney().split('.');
    if (currentInput.maxLen == 2) {
        currentInput.textContent = newAmountParts[1];
    } else {
        currentInput.textContent = newAmountParts[0];
    }
    updateCalcTotal();
}

var updateCalcTotal = function() {
    totalAmount = parseInt(beforePoint.textContent.replace(',','')) + parseInt(afterPoint.textContent)/100;
};

function clearLastChar() {

    var parts = totalAmount.formatMoney().replace(',','').split('.');
    var idx = 0;
    if (currentInput.maxLen == 2) {
        idx = 1;
    }
    parts[idx] = parts[idx].slice(0,-1);
    var newAmountParts = (parseInt(parts[0]) + parseInt(parts[1])/100).formatMoney().split('.');
    if (currentInput.maxLen == 2) {
        currentInput.textContent = newAmountParts[1];
    } else {
        currentInput.textContent = newAmountParts[0];
    }
    updateCalcTotal();
}

if (clearBtn) {
    clearBtn.addEventListener('click', clearLastChar);
}

Array.prototype.forEach.call(document.querySelectorAll('.give-keyboard__button'), function(button) {
    if (!button.classList.contains('_ok-button')) {
        button.addEventListener('click', handleClick);
    } else {
        button.addEventListener('click', function() {
            // show confirmation block
            if (totalAmount > 0) {
                if (beforeCalcSlide != 'preset') {
                    closePopupCalc();
                } else {
                    $('.give-calculator')
                        .transition({
                            x: '100%',
                            opacity: 0
                        }, 250, function(){
                            $('.give-calculator').hide();
                            $('.give-widget-main-container').hide().attr('rel','hide');
                            setAmount();
                            $('#give-amount-bar').slideDown(150);
                            $('.give-confirmation-container')
                                .slideDown(150)
                                .attr('rel', 'visible');
                        });

                }
            }
        });
    }
});

var Designate = {
    sliders:null,
    amount:0,
    newAmount:function(amount){
        if (amount == this.amount) {
            return;
        }
        console.log('Designation newAmount: ' + amount);
        var oldAmount = [];
        // destroy all sliders
        for (var idx in this.sliders) {
            oldAmount[idx] = parseInt(this.sliders[idx][0].noUiSlider.get());
            this.sliders[idx][0].noUiSlider.destroy();
        }
        oldAmount[0] -= this.amount - amount;
        if (oldAmount[0] < 0) {
            var diff = Math.abs(oldAmount[0]);
            oldAmount[0] = 0;
            // decrese proportionaly
            var optionalAmounts = 0;
            for (var i=1; i < oldAmount.length; i++) {
                optionalAmounts += oldAmount[i];
            }
            for (var i=1; i < oldAmount.length; i++) {
                oldAmount[i] -= diff*(oldAmount[i] / optionalAmounts);
                if (oldAmount[i] < 0) {
                    oldAmount[i] = 0;
                }
            }
        }
        this.amount = amount;
        this.createSliders(oldAmount);
    },
    setZeroValue:function(idx){
        this.sliders[idx][0].noUiSlider.set(0);
        this.handlerChange([0], idx, 0);
    },
    createSliders:function(amountValues){
        this.sliders = [];
        $('.give .give-js-range').each(function(index, el) {
            var slider = $(el);
            noUiSlider.create(slider[0], {
                start: typeof(amountValues[index]) == 'undefined' ? 0 : amountValues[index],
                connect: 'lower',
                step: 1,
                range: {
                    'min': 0,
                    'max': Designate.amount
                }
            });
            Designate.sliders.push(slider);
            slider[0].noUiSlider.on('update', function(arr, handlerIndex, val){Designate.handlerUpdate(index, val)});
            slider[0].noUiSlider.on('change', function(arr, handlerIndex, val){Designate.handlerChange(arr, index, val)});
        });
    },
    init:function(amount){
        console.log('Designation amount: ' + amount);
        if (this.amount > 0) {
            if (this.amount != amount) {
                // destroy all sliders
                for (var idx in this.sliders) {
                    this.sliders[idx][0].noUiSlider.destroy();
                }
                delete this.sliders;
            } else {
                return;
            }
        }
        this.amount = amount;
        var amountSet = {0 : parseInt(amount)};
        this.createSliders(amountSet);
    },
    handlerChange:function(arr, handlerIndex, val) {
        console.log('handlerChange - ' + handlerIndex + ' : ' + val);
        var oldTotalAmount = 0;
        var valueMap = {};

        if (handlerIndex == 0) {
            for (var idx in Designate.sliders) {
                if (idx != handlerIndex) {
                    var curVal = parseInt(Designate.sliders[idx][0].noUiSlider.get());
                    oldTotalAmount += curVal;
                    valueMap[idx] = curVal;
                }
            }
            idx = 0;
            var diff = (Designate.amount - (val + oldTotalAmount)) / (Designate.sliders.length - 1);
            console.log('Diff: ' + diff + ', oldTotalAmount: ' + oldTotalAmount);
            var negDiff = 0;
            var nonNegCount = 0;
            for (var key in valueMap) {
                valueMap[key] += diff;
                if (valueMap[key] < 0) {
                    negDiff += Math.abs(valueMap[key]);
                    valueMap[key] = 0;
                } else {
                    nonNegCount++;
                }
            }
            console.log(valueMap);
            var i = 0;
            while (negDiff > 0) {
                console.log('{begin} negDiff: ' + negDiff + ', nonNegCount: ' + nonNegCount);
                // distribute negative diff between >0 elements
                diff = negDiff / nonNegCount;
                nonNegCount = 0;
                negDiff = 0;
                for (var key2 in valueMap) {
                    if (valueMap[key2] > 0) {
                        console.log('valueMap[key2] = ' + valueMap[key2] + ', diff: ' + diff);
                        valueMap[key2] = valueMap[key2] - diff;
                        if (valueMap[key2] < 0) {
                            negDiff += Math.abs(valueMap[key2]);
                            valueMap[key2] = 0;
                        } else {
                            nonNegCount++;
                        }
                    }
                }
                console.log('{end} negDiff: ' + negDiff + ', nonNegCount: ' + nonNegCount);
                console.log(valueMap);
                if (i++ > 10) {
                    break;
                }
            }
        } else {
            // subtruct from Main (idx=0) fund only

            for (var idx in Designate.sliders) {
                if (idx > 0) { // calculate all amounts except current and Main
                    var curVal = parseInt(Designate.sliders[idx][0].noUiSlider.get());
                    oldTotalAmount += curVal;
                }
            }
            var newMainVal = Designate.amount - oldTotalAmount;
            valueMap[0] = newMainVal;
            if (newMainVal < 0) {
                valueMap[0] = 0;
                console.log('Reached amount limit: ' + newMainVal);
                valueMap[handlerIndex] = val + newMainVal;
            }

        }

        for (var idx in valueMap) {
            var slider = Designate.sliders[idx][0].noUiSlider;
            console.log('Set new val: ' + valueMap[idx] + ', idx: ' + idx);
            slider.set(parseInt(valueMap[idx]));
            Designate.sliders[idx]['value'] = slider.get();
        }
    },
    handlerUpdate:function(handlerIndex, val) {
        console.log('handlerUpdate: ' + handlerIndex + ' = ' + val);
        var active;
        var activeClass = 'is-active';
        var parent = Designate.sliders[handlerIndex].parents('.give-range');
        var value = parent.find('.give-range__val');
        var percentValue = parent.find('.give-range__val-percent');
        active = parent.hasClass(activeClass);
        if (val === 0) {
            if (active) {
                parent.removeClass(activeClass);
            }
        } else {
            if (!active) {
                parent.addClass(activeClass);
            }
        }
        //value.text("$" + (Math.round(val)));
        value.text("$" + parseInt(val).formatMoney(0));
        designateObj[handlerIndex] = val;
        return percentValue.text((Math.round((100/Designate.amount) * val)) + "%");
    }
};

var setAmount = function() {
    var amount = totalAmount.formatMoney();
    var parts = amount.split('.');
    $('.give-amount__before-point').text(parts[0]);
    $('.give-amount__after-point').text(parts[1]);
    $('.give-ach__sum').text('$' + amount);
    /*var afterPoint = totalAmount - parseInt(totalAmount);
    var beforePoint = totalAmount - afterPoint;
    $('.give-amount__before-point').text(beforePoint);
    afterPoint = (Math.round(afterPoint*100)).toString().substr(0,2);
    afterPoint = afterPoint > 0 ? (afterPoint > 10 ? afterPoint : '0' + afterPoint) : '00'
    $('.give-amount__after-point').text(afterPoint);
    $('.give-ach__sum').text('$' + beforePoint + '.' + afterPoint);
    */
};

var recalculateTotalAmount = function(step) {
    if (step < 0 && totalAmount - Math.abs(step) <= 0) {
        console.log('Minimum limit was reached');
        return;
    }
    totalAmount += step;
    setAmount();
    if ($('.give-designate').hasClass('is-active')) {
        Designate.newAmount(totalAmount);
    }
};

$('.give-amount-bar__change-value button').on('click', function(){
    var step = 10; // option to replace
    recalculateTotalAmount($(this).hasClass('_minus') ? -1*step : step);
});

$('.give-range__remove').on('click', function(){
    Designate.setZeroValue(parseInt($(this).attr('rel')));
});


var toggleDesignate = function() {
    var el = $('.give-designate');
    el.toggleClass('is-active');
    el.find('.give-designate__inner').slideToggle(300);

    if (el.hasClass('is-active')) {
        $('#give-amount-bar').slideDown(300);
        $('.give-widget-main-container').slideUp(300);
        setAmount(totalAmount);
        Designate.init(totalAmount);
        if ($('.give-confirmation-container').attr('rel') == 'visible') {
            $('.give-confirmation-container').hide();
        }
        beforeCalcSlide = 'designate';
    } else {
        if ($('.give-widget-main-container').attr('rel') !== 'hide') {
            $('.give-widget-main-container').slideDown(300);
            $('#give-amount-bar').slideUp(300);
        }
        if ($('.give-confirmation-container').attr('rel') == 'visible') {
            $('.give-confirmation-container').show();
        }
        resetPreset();
        beforeCalcSlide = 'preset';
    }
}

// other button, calc slide
$('.give-bar-container .designate-other').on('click', function(){
    if (beforeCalcSlide == 'payment') {
        $('.give-payment-form').fadeOut(300);
    }
    if (beforeCalcSlide == 'designate') {
        $('.give-designate').fadeOut(300);
    }
    $('#give-amount-bar').fadeOut(300);
    setTimeout(function() {
        $('.give-presets').hide();
        $('.give-widget-main-container').show();
        $('.give-calculator')
            .css({
                x: '100%',
                opacity: 0
            })
            .show()
            .transition({
                x: '0',
                opacity: 1
            }, 500);
    }, 300);

    //toggleDesignate();
});

$('.give-designate-button').on('click', function(e) {
    if (totalAmount == 0) {
        alert('Select or enter Give amount');
        return false;
    }

    toggleDesignate();

});

$('.give-designate input').on('click', function(e) {
    e.stopPropagation();
});

$('.give-select__hidden').on('change', function(e){
    var el = $(this);
    if (el.val().length) {
        el.parent().find('.give-select__value').text(el.find(':selected').text());
    }
    if (el.hasClass('sub-period-select')) {
        if (el.val() == 'monthly') {
            $('.month-day-block').show();
        } else {
            $('.month-day-block').hide();
        }
    } else if (el.hasClass('country-select')) {
        if (el.val() != 'US') {
            $('.state-select-block').hide();
        } else {
            $('.state-select-block').show();
        }
    }

});

$('.day-of-month').each(function() {
    var curDay = (new Date()).getDate();
    var el = $(this);
    for (var i = 1; i <= 30; i++) {
        var opt = $('<option/>', {
            value: i,
            text : i
        });
        if (i == curDay) {
            opt.attr('selected', true);
            el.parent().find('.give-select__value').text(i);
        }
        el.append(opt);
    }
});


// payment part

var monthes = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

var paymentInitiated = false;

var validationConfig = {
    // ordinary validation config
    form : '#payment-form',
    // reference to elements and the validation rules that should be applied
    validate : {
        '#give-field-fname,#give-field-lname' : {
            validation : 'required,length,custom',
            length : '3-50',
            regexp: '^([a-zA-Z\\s]+)$'
        },
        '#ach_first_name,#ach_last_name' : {
            validation : 'length,custom',
            length : '3-50',
            regexp: '^([a-zA-Z\\s]+)$',
            type: 'ach'
        },
        '#give-card-holder' : {
            validation : 'length,custom',
            length : '3-50',
            regexp: '^([a-zA-Z\\s]+)$',
            type: 'cc'
        },
        '#give-card-number' : {
            validation : 'length,creditcard',
            length:'min14',
            type: 'cc'
        },
        '#give-ach-routing' : {
            validation : 'bankrouting',
            type: 'ach'
        },
        '#give-ach-account' : {
            validation : 'number,length',
            length: '7-17',
            type: 'ach'
        },
        '#give-card-cvv' : {
            validation : 'cvv',
            type: 'cc'
        },
        '#give-field-country,#give-field-address,#give-field-city' : {
            validation : 'required'
        },
        '#give-card-exp-date' : {
            validation : 'length',
            length: 'min1',
            type:'cc'
        },
        '#give-field-email' : {
            validation : 'required,email'
        },
        '#give-field-phone' : {
            validation : 'length,number',
            length : '9-15'
        },
        '#give-field-postal' : {
            validation : 'required,length,number',
            length : '5-6'
        }
    },
    onElementValidate : function(valid, $el, $form, errorMess) {
        $el.attr('rel', valid ? 1 : 0);
    },
    validateHiddenInputs: true,
    validateOnBlur: false,
    errorElementClass:'is-error',
    inputParentClassOnError:'is-error',
    inputParentClassOnSuccess: 'is-valid',
    errorMessageClass: 'give-tooltip'
};

$('.give-confirmation-container button').on('click', function() {
    $(this).parent().hide();
    $('.give-designate').hide();
    $('.give-widget-main-container').hide();
    setAmount();
    $('#give-amount-bar').fadeIn(300);
    $('.give-payment-form').fadeIn(300);

    beforeCalcSlide = 'payment';

    if (!paymentInitiated) {
        var contentSlider = $('.give-payment-tabs-content');
        var tabSlider = $('.give-payment-tabs__inner');

        contentSlider.slick({
            slide: '.give-payment-tabs-slide',
            dots: false,
            arrows: false,
            adaptiveHeight: true,
            infinite: false,
            draggable: false,
            swipe: false,
            asNavFor: tabSlider
        });

        tabSlider.slick({
            slide: '.give-payment-tabs__button',
            arrows: false,
            dots: false,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true,
            focusOnSelect: true,
            infinite: false,
            asNavFor: contentSlider
        });

        //initiate validator
        console.log('setupValidation start');



        $.validate({
            modules : 'jsconf,security.dev',

            onModulesLoaded : function() {
                console.log('setupValidation init');
                $.setupValidation(validationConfig);
                console.log('setupValidation end');
                $('[data-validation]').on('change', function(){
                    if ($(this).hasClass('is-error')) {
                        $(this).validate();
                    }
                });

            }
        });

        // setup date picker
        var monthSelect = $('.give-dropdown__list.month');
        var yearSelect = $('.give-dropdown__list.year');

        var curMonth = (new Date()).getMonth();
        var curYear = (new Date()).getFullYear();
        for (var i=0; i<12; i++) {
            monthSelect.append($('<li/>', {
                rel: i+1,
                class: 'give-dropdown__item',
                text : monthes[i]
            }));
            yearSelect.append($('<li/>', {
                rel: curYear + i,
                class: 'give-dropdown__item',
                text : curYear + i
            }));
        }

        monthSelect.find('li').on('click',function(e){
            monthSelect.find('li.is-selected').removeClass('is-selected');
            $(this).addClass('is-selected');
            e.stopPropagation();
            if (yearSelect.find('li.is-selected').length) {
                closeValidToPicker();
            }
        });

        yearSelect.find('li').on('click',function(e){
            yearSelect.find('li.is-selected').removeClass('is-selected');
            $(this).addClass('is-selected');
            e.stopPropagation();
            if (monthSelect.find('li.is-selected').length) {
                closeValidToPicker();
            }
        });

        $('#give-card-holder').on('change',function(){
            $('.give-card__holder .give-card__value').text($(this).val());
        });

        $('#give-field-fname,#give-field-lname,#give-field-address,#give-field-city,#give-card-holder').on('keyup', function(e){
            formatSentence($(this));
        });

        $('#give-card-number').on('keyup', function(e){
            var code = e.which || e.keyCode;
            if (code == 8 || code == 46) {
                // del and backspace
                return;
            }
            formatCardNum($(this));

        });
        $('#give-card-number').on('change', function(e){
            formatCardNum($(this));
        });

        paymentInitiated = true;
    }
});

$('#in-memory-of-value').on('keyup', function(e){
    formatSentence($(this));
});

var formatSentence = function(el){
    var val = el.val().replace(/\s{2,}/g," ").split(" ");
    var res = [];
    for (var idx in val) {
        if (val[idx] != " ") {
            res.push(val[idx].substr(0, 1).toUpperCase() + val[idx].substr(1).toLowerCase());
        }
    }
    el.val(res.join(' '));
};

var formatCardNum = function(obj) {
    console.log('formatCardNum');
    var val = obj.val().replace(/[^0-9]/g,'');
    var cardType = getCardType(val);
    var logo = $('.give-card__logo img');
    if (cardType == 'unknown') {
        logo.remove();
    } else if (logo.attr('rel') !== cardType) {
        if (!logo.length) {
            logo = $('<img />');
            $('.give-card__logo').append(logo);
        }
        logo.attr('src','img/svg/payments/' + cardType + '.svg').attr('rel',cardType);
    }

    val = val.split('').slice(0,16);
    var len = val.length;
    if (len >= 4) {
        var inserted = 0;
        for(var i=1; i <= len; i++) {
            if (i%4 == 0 && inserted < 3) {
                val.splice(i + inserted++,0,' ');
            }
        }
    }
    var finalNum = val.join('');
    $('.give-card .give-card__number').text(finalNum);
    if (obj.parent().find('.give-icon').hasClass('_eye-closed')) {
        finalNum = finalNum.replace(/\s/g,'');
    }
    obj.val(finalNum);
};

var paymentCard = (function() {
    var $el      = $('.give-card-box');
    // var $front   = $el.find('.give-card').first();
    // var $back    = $el.find('.give-card').last();
    var class1   = 'is-hide-front';
    var class2   = 'is-show-back';
    var duration = 200;
    return {
        toBackSide: function(dur) {
            $el.addClass(class1);
            setTimeout(function() {
                $el.addClass(class2);
                if ($('#give-card-cvv').val().length < 3) {
                    $('#give-card-cvv').focus();
                }
            }, dur || duration);

        },
        toFrontSide: function(dur) {
            $el.removeClass(class2);
            setTimeout(function() {
                $el.removeClass(class1);
            }, dur || duration);
        }
    };
})();

$('.give-card__chip').on('click', function(e) {
    // $(this).parents('.give-card-box').addClass('is-active');
    paymentCard.toBackSide();
});

$('.give-card__rotate-btn').on('click', function(e) {
    // $(this).parents('.give-card-box').removeClass('is-active');
    paymentCard.toFrontSide();
});

var closeValidToPicker = function(){
    $('#exp-date').hide();
    showCardExp();
    // if everything is filled up, flip the card
    if ($('#give-card-holder').val().length && $('#give-card-number').val().length) {
        paymentCard.toBackSide();
    }
};

var showCardExp = function(){
    var month = parseInt($('.give-dropdown__list.month li.is-selected').attr('rel'));
    if (month < 10) {
        month = '0' + month.toString();
    }
    var year = $('.give-dropdown__list.year li.is-selected').attr('rel');
    $('.give-select._expires .give-select__value').text(month + '/' + year.substr(-2));
    $('.give-card__expires .give-card__value').text(month + ' / ' + year);

    $('#give-card-exp-date').val(month + ' / ' + year).validate();
};

var getCardType = function (number) {
    var cards = {
        visa: /^4[0-9][0-9]{1,}$/,
        mastercard: /^5[1-5][0-9]{1,}$/,
        amex: /^3[47][0-9]{1,}$/,
        diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{1,}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{1,}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{1,}$/
    };
    for (var card in cards) {
        if (cards[card].test(number)) {
            return card;
        }
    }
    return 'unknown';
};

$('.give-select._expires').on('click',function(){
    $(this).find('.give-dropdown').toggle('fast');
});

$('#give-field-lname').on('blur', function(){
    var cholder = $('#give-card-holder');
    var firstName = $('#give-field-fname').val();
    var lastName = $(this).val();
    if (firstName.length && lastName.length && cholder.val().length == 0) {
        cholder.val(firstName + ' ' + lastName).change();
    }
    $('#ach_first_name').val(firstName);
    $('#ach_last_name').val(lastName);
});

var setupCountry = function() {
    console.log('call setupCountry');
    // this function will be called after script loads
    var country = $('.country-select');
    var state = $('.state-select');
    var phone = $('.phone-select');
    country.append($('<option/>', {
        value: '',
        text : 'Select your country'
    }));
    for (var idx in CountryList) {
        country.append($('<option/>', {
            value: CountryList[idx]['code'],
            text : CountryList[idx]['name']
        }));
        phone.append($('<option/>', {
            value: CountryList[idx]['code']+':'+CountryList[idx]['dial'],
            text : CountryList[idx]['code'] + ' +' + CountryList[idx]['dial']
        }));
    }
    for (var code in USStateList) {
        state.append($('<option/>', {
            value: code,
            text: USStateList[code]
        }));
    }
    // set country, state, city and zip
    checkUserLocation();
};

var checkUserLocation = function(){
    var result = {cc:'US',state:'CA',phone:'1',city:'Mountain View',zip:'94043'};
    $('.country-select').val(result['cc']).change();
    $('.state-select').val(result['state']).change();
    $('.phone-select').val(result['cc'] + ':' + result['phone']).change();
    $('#give-field-city').val(result['city']);
    $('#give-field-postal').val(result['zip']);
    return;

    $.ajax({
        url: "checklocation.php",
        dataType: "json",
        method: "post",
        success: function(result){
            if (typeof(result['cc']) !== 'undefined') {
                $('.country-select').val(result['cc']).change();
                $('.state-select').val(result['state']).change();
                $('.phone-select').val(result['cc'] + ':' + result['phone']).change();
                $('#give-field-city').val(result['city']);
                $('#give-field-postal').val(result['zip']);
            }
        }
    });
};

$('.give-payment-form__footer button').on('click', function(){

    var creditCard = $('.give-payment-tabs-slide.slick-current').attr('data-slick-index') == '0';

    var isFormValid = true;
    var options = {
        type: creditCard ? 'cc' : 'ach'
    };
    options[options['type']] = {};

    var ccNonValid = [];
    for(var ids in validationConfig['validate']) {
        var obj = validationConfig['validate'][ids];
        if (obj.hasOwnProperty('validation')) {
            var methods = obj['validation'].split(',');

            for (var m in methods) {
                // check for mandatory fields
                if (methods[m] == 'required') {
                    $(ids).validate(function (valid, elem) {
                        console.log('Element ' + elem.name + ' is ' + ( valid ? 'valid' : 'invalid') + '; value="' + $(elem).val() +'"');
                        isFormValid &= valid;
                        if (valid) {
                            options[elem.name] = elem.value;
                        }
                    });
                    break;
                }
            }
        }
        if (obj.hasOwnProperty('type')) {
            // verify card or ACH
            if ((creditCard && obj['type'] == 'cc') || (!creditCard && obj['type'] == 'ach')) {
                $(ids).validate(function (valid, elem) {
                    console.log('['+obj['type']+'] Element ' + elem.name + ' is ' + ( valid ? 'valid' : 'invalid'));
                    isFormValid &= valid;
                    if (valid) {
                        options[obj['type']][elem.name] = elem.value;
                    }
                    if (!valid && obj['type'] == 'cc') {
                        ccNonValid.push(elem.name);
                    }
                });
            }
        }
    }
    // non mandatory fields (not a payment fields)
    var ids = ['#give-field-phone','#country-phone','#country-state'];
    for (var idx in ids) {
        var obj = $(ids[idx]);
        if (obj.val().length) {
            options[obj.attr('name')] = obj.val();
        }
    }

    if (ccNonValid.length) {
        // check what side of card we are showing now and flip if any
        var isBackSide = $('.give-card-box').hasClass('is-show-back');
        if (!isBackSide && ccNonValid.length == 1 && ccNonValid.indexOf('cvv') !== -1) {
            // flip to back side
            paymentCard.toBackSide();
        } else if (isBackSide && ccNonValid.indexOf('cvv') == -1) {
            // flip to front side
            paymentCard.toFrontSide();
        }

    }

    if (!isFormValid) {
        return false;
    }

    options['amount'] = totalAmount;
    options['designate'] = designateObj;
    if ($('#subscription').is(':checked')) {
        options['sub'] = {
            period: $('.sub-period-select').val(),
            day: $('.day-of-month').val()
        };
    }
    if ($('#in-memory-of').is(':checked')) {
        options['in-memory'] = $('#in-memory-of-value').val();
    }

    console.log(options);
    $('#submit-payment').hide();
    $('#processing-payment').show();
    setTimeout(function(){
        var success = true;

        if (success) {
            $('.give-thank').fadeIn(250);
            $('.give-thank__close').on('click',function(){
                $('.give-thank').fadeOut(250,function(){
                    resetAllData();
                });
            });
        } else {
            alert('Show an error');
        }
    },3000);

    return false;
});

var resetAllData = function(){
    $(validationConfig['form']).get(0).reset();
    totalAmount = 0;
    currentSlide = 'preset';
    beforeCalcSlide = 'preset';
    designateObj = {};
    $('.give-presets__button[rel!=other]').removeClass('is-active');
    setAmount();
    $('.give-confirmation-container').removeAttr('rel').hide();
    $('.give-widget-main-container').show();
    $('.give-presets').show();
    $('.give-calculator').hide();
    $('.give-payment-form').hide();
    $('#give-amount-bar').hide();
    $('.give-designate').show();

};

var closePopupCalc = function(){
    $('.give-calculator')
        .transition({
            x: '100%',
            opacity: 0
        }, 500, function(){
            $('.give-calculator').hide();
            setAmount();
            if (beforeCalcSlide == 'designate') {
                Designate.newAmount(totalAmount);
                $('.give-designate').fadeIn(300, function () {
                    $('.give-widget-main-container').hide();
                    $('.give-presets').show();
                });
            } else if (beforeCalcSlide == 'payment') {
                $('.give-widget-main-container').hide();
                $('.give-payment-form').fadeIn(300);
            }
            $('#give-amount-bar').fadeIn(300);
        });
};

Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};
