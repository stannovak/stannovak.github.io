var totalAmount = 0;
var currentSlide = 'preset';
var beforeCalcSlide = 'preset';

(function() {
    $('.give-confirmation-container').each(function(index, el) {
        $(el).slideUp(0);
    });
    $('#show-thank').next().next().find('.give-confirmation-container').show();

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
})();




var beforePoint = document.querySelector('.give-amount__before-point');
beforePoint.maxLen = 5;
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
    var intVal = parseInt(currentInput.textContent);
    var intValLen = intVal.toString().length;
    if (intVal.toString().length < currentInput.maxLen) {
        var char = '';
        if (currentInput.maxLen == 2) {
            char = '0';
        }
        currentInput.textContent = (intVal ? intVal.toString() : char) + value;
    } else {
        console.log('max amount');
    }
    updateCalcTotal();
}

var updateCalcTotal = function() {
    totalAmount = parseInt(beforePoint.textContent) + parseInt(afterPoint.textContent)/100;
};

function clearLastChar() {
    var str = currentInput.textContent;
    var intVal = parseInt(str.slice(0, -1));
    var intValLen = str.length-1;
    currentInput.textContent = intVal ? intVal.toString() : '0';
    if (currentInput.maxLen == 2) {
        if (!intVal) {
            currentInput.textContent = '00';
        } else if (intValLen == 1) {
            currentInput.textContent = '0' + currentInput.textContent;
        }
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
                    $('.give-confirmation-container')
                        .slideDown(300)
                        .attr('rel', 'visible');
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
        var amountSet = {0 : amount};
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
            slider.set(valueMap[idx]);
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
        value.text("$" + val);
        return percentValue.text((Math.round((100/Designate.amount) * val)) + "%");
    }
};

var setAmount = function() {
    var afterPoint = totalAmount - parseInt(totalAmount);
    var beforePoint = totalAmount - afterPoint;
    $('.give-amount__before-point').text(beforePoint);
    afterPoint = (Math.round(afterPoint*100)).toString().substr(0,2);
    afterPoint = afterPoint > 0 ? (afterPoint > 10 ? afterPoint : '0' + afterPoint) : '00'
    $('.give-amount__after-point').text(afterPoint);
    $('.give-ach__sum').text('$' + beforePoint + '.' + afterPoint);
};

var recalculateTotalAmount = function(step) {
    if (step > totalAmount) {
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
    $('.give-widget-main-container').slideToggle(300);
    el.find('.give-designate__inner').slideToggle(300);
    $('#give-amount-bar').slideToggle(300);
    if (el.hasClass('is-active')) {
        setAmount(totalAmount);
        Designate.init(totalAmount);
        if ($('.give-confirmation-container').attr('rel') == 'visible') {
            $('.give-confirmation-container').hide();
        }
        beforeCalcSlide = 'designate';
    } else {
        if ($('.give-confirmation-container').attr('rel') == 'visible') {
            $('.give-confirmation-container').show();
        }
        resetPreset();
        beforeCalcSlide = 'preset';
    }
}

$('.give-designate').each(function(i, el) {
    var $el = $(el);
    var $btn = $el.find('.give-designate-button');
    var $input = $el.find('input');
    var $inner = $el.find('.give-designate__inner');
    var $mainContainer = $('.give-widget-main-container');

    // other button, calc slide
    $('.give-bar-container .designate-other').on('click', function(){
        if (beforeCalcSlide == 'payment') {
            $('.give-payment-form').fadeOut(300);
        }
        if (beforeCalcSlide == 'designate') {
            $el.fadeOut(300);
        }
        $('#give-amount-bar').fadeOut(300);
        setTimeout(function() {
            $('.give-presets').hide();
            $mainContainer.show();
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

    $btn.on('click', function(e) {
        if (totalAmount == 0) {
            alert('Select or enter Give amount');
            return false;
        }

        toggleDesignate();

    });

    $input.on('click', function(e) {
        e.stopPropagation();
    });
});

$('.give-select__hidden').on('change', function(e){
    var el = $(this);
    el.parent().find('.give-select__value').text(el.find(':selected').text());
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
        '#ach_first_name,#ach_last_name,#give-card-holder' : {
            validation : 'length,custom',
            length : '3-50',
            regexp: '^([a-zA-Z\\s]+)$'
        },
        '#give-card-number' : {
            validation : 'creditcard'
        },
        '#give-ach-routing' : {
            validation : 'bankrouting'
        },
        '#give-ach-account' : {
            validation : 'number,length',
            length: '7-17'
        },
        '#give-card-cvv' : {
            validation : 'cvv'
        },
        '#give-field-email' : {
            validation : 'required,email'
        },
        '#give-field-address' : {
            validation : 'required'
        },
        '#give-field-city' : {
            validation : 'required'
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

        $('#give-card-holder').on('blur',function(){
            $('.give-card__holder .give-card__value').text($(this).val());
        });

        $('#give-field-fname,#give-field-lname,#give-field-address,#give-field-city').on('keyup', function(e){
            var el = $(this);
            var val = $(this).val().replace(/\s{2,}/g," ").split(" ");
            var res = [];
            for (var idx in val) {
                if (val[idx] != " ") {
                    res.push(val[idx].substr(0, 1).toUpperCase() + val[idx].substr(1).toLowerCase());
                }
            }
            el.val(res.join(' '));
        });

        $('#give-card-number').on('keyup', function(e){
            var code = e.which || e.keyCode;
            if (code == 8 || code == 46) {
                // del and backspace
                return;
            }
            var val = $(this).val().replace(/[^0-9]/g,'');
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
            $(this).val(val.join(''));
            var backNum = val.join('');
            if ($(this).parent().find('.give-icon').hasClass('_eye-closed')) {
                backNum = backNum.replace(/[0-9]/g,'*');
            }
            $('.give-card .give-card__number').text(backNum);
        });

        paymentInitiated = true;
    }
});

var paymentCard = (function() {
    var $el      = $('.give-card-box');
    // var $front   = $el.find('.give-card').first();
    // var $back    = $el.find('.give-card').last();
    var class1   = 'is-hide-front';
    var class2   = 'is-show-back';
    var duration = 300;
    return {
        toBackSide: function(dur) {
            $el.addClass(class1);
            setTimeout(function() {
                $el.addClass(class2);
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
};

var getCardType = function (number) {
    var cards = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/
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
        cholder.val(firstName + ' ' + lastName);
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


    if (creditCard) {
        // validate all related options
        console.log('validate credit card');
        var cholder = $('#give-card-holder');

    }

    var options = {

    };

    alert('Submit form')
    return false;
});


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
                $('.give-payment-form').fadeIn(300);
            }
            $('#give-amount-bar').fadeIn(300);
        });
};

