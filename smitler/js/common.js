$(document).ready(function() {

	// иницализация mmenu
	var $menu = $('#my-menu').mmenu({
		extensions: [ 
		'theme-dark', 
		'fx-menu-slide', 
		'pagedim-black', 
		'position-right',
		'border-none'
		],
		navbar: {
			title: "<img src='img/logo-1.svg' alt='Салон красоты S&Mitler'>"
		}
	});

	var mmenuApi = $menu.data( 'mmenu' );
	var $icon = $('#my-icon');

	mmenuApi.bind( 'open:finish', function() {
		$icon.addClass( 'is-active' );
	});
	mmenuApi.bind( 'close:finish', function() {
		$icon.removeClass( 'is-active' );
	});

	$('.carousel-services').on('initialized.owl.carousel', function () {
		setTimeout(function () {
			carouselService();
		}, 100);
	});
	$('.carousel-services').owlCarousel({
		loop: true,
		nav: true,
		smartSpeed: 700,
		dots: false,
		navText: ['<i class="fas fa-angle-double-left"></i>', '<i class="fas fa-angle-double-right"></i>'],
		responsiveClass: true,
		responsive: {
			0: {items: 1},
			800: {items: 2},
			1201: {items: 3}
		}
	});

	function carouselService() {
		$('.carousel-services-item').each(function () {
			var height = $(this).find('.carousel-services-content').outerHeight();
			$(this).find('.carousel-services-image').css('min-height', height);
		});
	}

	$('.carousel-services-composition .h3').each(function () {
		$(this).html($(this).html().replace(/(\S+)\s*$/, '<span>$1</span>'));
	});

	$('section .h2').each(function () {
		$(this).html($(this).html().replace(/^(\S+)/, '<span>$1</span>'));
	});

	// $('.carousel-services-content').equalHeights();
	// resize window
	function onResize() {
		$('.carousel-services-content').equalHeights();
	};
	window.onresize = function() {onResize()};

	$('select').selectize();

	//E-mail Ajax Send
	$("form.callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
			setTimeout(function() {
				// Done Functions
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});

	$('.reviews').owlCarousel({
		loop: true,
		items: 1,
		smartSpeed: 700,
		nav: false
		// autoHeight: true
	});

	$('.partners').owlCarousel({
		loop: true,
		nav: true,
		smartSpeed: 700,
		dots: false,
		navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
		responsiveClass: true,
		responsive: {
			0: {items: 1},
			768: {items: 2},
			992: {items: 3},
			1200: {items: 4}
		}
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > $(this).height()) {
			$('.top').addClass('active');
		} else {
			$('.top').removeClass('active');
		}
	});

	$('.top').click(function () {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});
});

$(window).on('load', function () {
	$('.preloader').delay(1000).fadeOut('slow');
});