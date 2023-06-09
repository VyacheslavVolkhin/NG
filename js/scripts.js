$(document).ready(function(){

	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$('input[type="tel"]').on('click', function() {
		$(this).setCursorPosition(4);
	})
	$.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};

    //swipebox
    if (!!$('[data-swipebox]').offset()) {
        $('[data-swipebox]').swipebox();
    }


    //file input 
    $('.js-field-file .js-file-button').on('click', function () {
        $(this).parent().find('input').click();
        return false;
    })
    $('.js-field-file input[type=file]').on('change', function () {
        let fileName = ('' + $(this).val());
        if (fileName == "") {
            fileName = $(this).parent().find('.js-file-button').attr('data-title');
            $(this).parent().removeClass('active').find('.js-file-button').children('.button-title').html(fileName);
        } else {
            $(this).parent().addClass('active').find('.js-file-button').children('.button-title').html(fileName);
        }
    });


    //timer
    if (!!$('#timer').offset()) {
        $("#timer")
            .countdown("2023/08/01", function(event) {
                $(this).html(
                    event.strftime('<span class="timer-section"><span class="timer-value">%D</span> Дней </span><span class="timer-section"><span class="timer-value">%H</span> Часов </span><span class="timer-section"><span class="timer-value">%M</span> минут </span><span class="timer-section"><span class="timer-value">%S</span> Секунд</span>')
                );
            });
    }
    
    //catalog view
    $('.catalog-actions-box .ico-view-rows').on('click', function() {
        if ($(this).hasClass('active')) {} else {
            $('.ico-view-tiles').removeClass('active');
            $('.ico-view-rows').addClass('active');
            $('.course-tiles-box').addClass('view-rows');
        }
        return false;
    })
    $('.catalog-actions-box .ico-view-tiles').on('click', function() {
        if ($(this).hasClass('active')) {} else {
            $('.ico-view-rows').removeClass('active');
            $('.ico-view-tiles').addClass('active');
            $('.course-tiles-box').removeClass('view-rows');
        }
        return false;
    })


    //popups
    let popupCurrent;
    $('.js-popup-open').on('click', function () {
        $('.popup-outer-box').removeClass('active');
        $('body').addClass('popup-open');
        popupCurrent = $(this).attr('data-popup');
        $('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
        return false;
    })
    $('.js-popup-close').on('click', function () {
        $('body').removeClass('popup-open');
        $('.popup-outer-box').removeClass('active');
        return false;
    })


    //popup block
    $('.js-popup-wrap .js-btn-toggle').on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('body').removeClass('menu-show');
            $('.js-popup-wrap').removeClass('popup-right');
        } else {
            $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
            $(this).addClass('active');
            if ($(this).parent().hasClass('main-menu-wrap')) {
                $('body').addClass('menu-show');
            }
            pLeft = $(this).parent('.js-popup-wrap').find('.js-popup-block').offset().left;
            pWidth = $(this).parent('.js-popup-wrap').find('.js-popup-block').outerWidth();
            pMax = pLeft + pWidth;
            if ( pMax > $('.wrap').width() ) {
                $(this).parent('.js-popup-wrap').addClass('popup-right');
            } else {
                $('.js-popup-wrap').removeClass('popup-right');
            }
        }
        return false;
    })
    $('.js-popup-wrap .js-btn-close').on('click', function() {
        $(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
        $('.js-popup-wrap').removeClass('popup-right');
        $('body').removeClass('menu-show');
        return false;
    })
    $(document).click(function(event) {
        if ($(event.target).closest(".js-popup-block").length) return;
        $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
        $('.js-popup-wrap').removeClass('popup-right');
        $('body').removeClass('menu-show');
        event.stopPropagation();
    });
    $('.js-popup-wrap').each(function() {
        if ($(this).hasClass('js-popup-select')) {
            if ($(this).find('.js-popup-block').find('.active').length>0) {
                $(this).find('.js-btn-toggle').addClass('selected');
                var currentSelect = $(this).find('.js-popup-block').find('.active').html();
                $(this).find('.js-btn-toggle').children('.button-title').html(currentSelect);
            } else {
                $(this).find('.js-btn-toggle').removeClass('selected');
            }
        }
    })
    $('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
        if ($(this).hasClass('active')) {} else {
            $(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
            $(this).addClass('active');
            $('.js-tab-block').removeClass('active');
            $('.js-tabs-nav').each(function() {
                $('.js-tab-block[data-tab*="'+$(this).find('.js-popup-block').find('.active').attr('data-tab')+'"]').addClass('active');
            })
        }
        $('.js-popup-wrap').each(function() {
            if ($(this).hasClass('js-popup-select')) {
                if ($(this).find('.js-popup-block').find('.active').length>0) {
                    $(this).find('.js-btn-toggle').addClass('selected');
                    var currentSelect = $(this).find('.js-popup-block').find('.active').html();
                    $(this).find('.js-btn-toggle').children('.button-title').html(currentSelect);
                } else {
                    $(this).find('.js-btn-toggle').removeClass('selected');
                }
            }
        })
        $(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
        return false;
    })

    //tabs
    $('.js-tabs-nav').each(function() {
        $('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
    })
    $('.js-tab-title').each(function() {
        if ($(this).hasClass('active')) {
            $(this).next('.js-tab-content').show(0);
        }
    })
    $('.js-tabs-nav').on('click', 'a[data-tab]', function() {
        if ($(this).hasClass('active')) {} else {
            $('.js-tab-block').removeClass('active');
            $(this).parents('.js-tabs-nav').find('.active').removeClass('active');
            $(this).addClass('active');
            $('.js-tabs-nav').each(function() {
                $('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
            })
        }
        return false;
    })
    $('.js-tab-title').on('click' , function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').next('.js-tab-content').slideUp(200);
        } else {
            $(this).addClass('active').next('.js-tab-content').slideDown(200);
        }
    })


    //teachers-box
    if (!!$('.teachers-box').offset()) {
        $('.teachers-box .slider').slick({
            dots: false,
            slidesToShow: 4,
            variableWidth: false,
            infinite: false,
            adaptiveHeight: false,
            rows: 1,
            swipeToSlide: true,
            prevArrow: false,
            nextArrow: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        infinite: true,
                    }
                },
            ]
        });
    }


    //about-info-box
    if (!!$('.about-info-box').offset()) {
        $('.about-info-box .slider').slick({
            dots: false,
            slidesToShow: 4,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            rows: 1,
            swipeToSlide: true,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        adaptiveHeight: true,
                    }
                },
            ]
        });
    }
    //news-box
    if (!!$('.news-box').offset()) {
        $('.news-box .slider').slick({
            dots: false,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            rows: 1,
            swipeToSlide: true,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        adaptiveHeight: true,
                    }
                },
            ]
        });
    }
	
});


