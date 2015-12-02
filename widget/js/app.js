(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./modules/common');

require('./modules/presets-slider');

require('./modules/field-classes');

require('./modules/animations');


},{"./modules/animations":2,"./modules/common":3,"./modules/field-classes":4,"./modules/presets-slider":5}],2:[function(require,module,exports){
(function(){

    var container = $('.give-widget-main-container');

    if (!container.length) return;

    var presets        = container.find('.give-presets');
    var keyboard       = container.find('.give-keyboard');
    var calc           = container.find('.give-calculator');
    var bar            = container.find('.give-bar-container');
    var otherAmountBtn = container.find('[rel=other]');
    var closeCalcBtn   = bar.find('.calc-close');


    var sizes = {
        presets: presets.outerHeight(),
        calc: calc.outerHeight() + parseInt(keyboard.css('margin-bottom'), 10),
        bar: bar.outerHeight()
    };

    console.log(sizes);
    console.log({presets: presets.height(), calc: calc.height()});

    // functions
    function animContainerSize(size, cb) {
        console.log(sizes);
        /*
        container.animate({
            height: size
        }, 300, cb);
        */
    }

    function toggleToCalc() {
        animContainerSize(sizes.calc);
        presets.fadeOut(300, function() {
            calc
                .css({
                    x: '100%',
                    opacity: 0
                })
                .show()
                .transition({
                    x: '0',
                    opacity: 1
                }, 500);
            currentSlide = 'calc';
        });
        if ($('.give-confirmation-container').attr('rel') == 'visible') {
            $('.give-confirmation-container').hide();
        }
    }

    function toggleToPresets() {
        calc
            .transition({
                x: '100%',
                opacity: 0
            }, 500, function() {
                calc.hide();
                animContainerSize(sizes.presets);
                presets.fadeIn(300);
                resetPreset();
            });
        currentSlide = 'preset';
    }

    calc.hide();
    // events
    otherAmountBtn.on('click', toggleToCalc);
    closeCalcBtn.on('click', function(){
        if (beforeCalcSlide != 'preset') {
            closePopupCalc();

        } else {
            toggleToPresets();
        }
    });


})();

},{}],3:[function(require,module,exports){

document.body.addEventListener('click', function(e) {
    var tabs;
    el = e.target;
    if (el.classList.contains('give-tabs__button')) {
        tabs = document.querySelectorAll('.give-tabs__item');

        Array.prototype.forEach.call(tabs, function(el) {
            if (el.classList.contains('is-active')) {
                el.classList.remove('is-active');
            }
        });

        if (!el.parentNode.classList.contains('is-active')) {
            el.parentNode.classList.add('is-active');
        }

        return false;
    }
});


$('.give-icon._eye-closed').on('click', function(e) {
    e.preventDefault();
    $this = $(this);
    $input = $this.siblings('input');

    $this.toggleClass('_eye-open _eye-closed');

    switch ($input.attr('type')) {
        case 'password':
            $input.attr('type', 'text');
            break;
        case 'text':
            $input.attr('type', 'password');
            break;
    }
});

$('#show-thank').on('click', function(e) {
    var $msg = $('.give-thank');
    $msg.fadeToggle(500);
});


$('.give-in-memory-of').each(function(i, el) {
    var field = $(el)
    field.parents('.give-check-group')
        .find('input[type="checkbox"]:eq(1)')
        .on('change', function() {
            field.slideToggle();
        });
});

},{}],4:[function(require,module,exports){
$('.give-field__input')
    .on('focus', function(e) {
        $(this).parent().addClass('is-focus is-filled');
    })
    .on('blur', function(e) {
        var $this = $(this);
        $this.parent().removeClass('is-focus');
        if (!$this.val()) $this.parent().removeClass('is-filled');
    });

},{}],5:[function(require,module,exports){
(function(){
    $('.give-presets__slides').each(function(index, el) {
        var slider = $(el);

        slider.slick({
            slide: '.give-presets__slide',
            prevArrow: slider.parent().find('.give-prev-button'),
            nextArrow: slider.parent().find('.give-next-button'),
            responsive: [
                {
                    breakpoint: 568,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    });
})();

},{}]},{},[1]);

//# sourceMappingURL=app.js.map
