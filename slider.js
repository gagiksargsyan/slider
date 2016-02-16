/**
 * Created by root on 2/15/16.
 */
/*slider script for all sliders*/
(function ($) {
    $.fn.slider = function (D, options) {
        /* ***********
         *  slider
         *  D - Time before next slide in milliseconds
         *  E - Any parent element of .slide tag Element
         *  script adds dots
         *  there must be .slider .slider__film, slider__frame elements inside the E variables
         * ***********/


        var defaults = {};
        var settings = $.extend({}, defaults, options);

        var S = this.find('.slider'),
            SF = this.find('.slider__film'),
            SFR = this.find('.slider__frame'),
            x = 0,
            intervalAction = '',
            movePos = S.width(),
            hasDots = true,
            direction = true,
            frameIndex = 0,
            counter = 0;


        window.clearTimeout(intervalAction);

        SF.width((S.width() + 10) * SFR.size());
        SFR.width(S.width() - 10);
        SFR.each(function () {
            $(this).attr('data-index', frameIndex);
            frameIndex++
        });


        if (options) {
            if (hasDots) {
                _dotsDraw();
            }
            _startEvent();
        } else {
            destroy();
            return console.log('destroyed');
        }

        function _startEvent() {
            if (direction) {
                if (++x === (SFR.size())) {
                    _reverseCycle();
                }
                movePos -= S.width();
            } else {
                movePos += S.width();
                if (--x === -(SFR.size())) {
                    _reverseCycle();
                }
            }

            var intervalAction = setTimeout(function () {
                console.log(Math.abs(x));
                SF.css('transform', 'translateX(' + movePos + 'px)');
                dotsAnimate();
                _startEvent();
            }, D);

        }


        function _reverseCycle() {
            if (direction) {
                direction = false;
                x = 0;
            } else {
                direction = true;
                movePos = 0;
                x = 1;
            }
            //_startEvent();
        }

        function _dotsDraw() {
            var dots = '<div class="slider__dotsWrapper">' +
                '<ul class="slider__dots ">' +
                '<li class="slider__dot active" data-index="0"></li>';
            for (var i = 1; i < (SFR.size()); i++) {
                dots += '<li class="slider__dot" data-index="' + i + '"></li>';
            }
            dots += '</ul></div>';
            S.append(dots);
        }

        function dotsAnimate() {
            if (direction){
                S.find('.slider__dot.active').not(':last-child').removeClass('active').next().addClass('active');
            } else {
                S.find('.slider__dot.active').not(':first-child').removeClass('active').prev().addClass('active');
            }


            //S.find('.slider__dot').last().removeClass('active').prev().not(':last-child').addClass('active');
            return true;
        }

        function destroy() {
            //$('.slider__dotsWrapper').remove();
            console.log(this + 'has been destroyed')
        }

        return this;
    }
}(jQuery));