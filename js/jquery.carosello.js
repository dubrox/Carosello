/*
 * Carosello v1.0
 * 
 * Copyright 2013, Luca Lauretta
 * Dual licensed under the MIT or GPL version 2 licenses.
 */
(function($) {
	
	$.fn.carosello = function(o) {
		o = o || {};
		var SHOWING_CLASS = o.showing_class || "showing";
		var AUTOPLAY = o.autoplay || false;
		var ANIMATION_SPEED = o.animationSpeed || 200;
		
		return this.each(function() {

			var $c = $(this);

			var $contents = $c.find(".c-contents").first();
			var $content = $contents.children();
			var $index = $c.find(".c-index").first();
			var $pointerClone = $index.find(".c-pointer").first().clone();

			var n_contents = $content.size();

			var goTo = function(to) {
				to = Math.abs( Math.round(to) ) % n_contents;

				$index.find(".c-pointer").removeClass(SHOWING_CLASS)
						.eq(to).addClass(SHOWING_CLASS);

				$content.removeClass(SHOWING_CLASS)
						.eq(to).fadeIn(ANIMATION_SPEED).addClass(SHOWING_CLASS);
				
				$content.each(function(i) {
					if(i < to) {
						$(this).show();
					} else if(i > to && i !== n_contents-1) {
						$(this).hide();
					} else if(i !== to && i === n_contents-1) {
						$(this).fadeOut(ANIMATION_SPEED);
					}
				});
			};

			var move = function(step) {
				var $current = $content.filter("."+SHOWING_CLASS).removeClass(SHOWING_CLASS);
				$content.each(function(i) {
					if(this == $current[0]) {
						goTo(i+step);
					}
				});
			};

			// set-up arrows
			$c.find(".c-previous").click(function() {
				move(-1);
			});
			$c.find(".c-next").click(function() {
				move(1);
			});

			// set-up pointers
			$index.find(".c-pointer").remove();
			$content.each(function(i) {
				var $pointer = $pointerClone.clone();
				var selector = $.trim( $pointer.find('a').text() );
				$pointer.find('a').text( $(this).find(selector).text() );
				$pointer.click(function() {
					goTo(i);
				});
				$index.append($pointer);
			});

			// init
			goTo(0);
			if(AUTOPLAY) {
				setInterval(function() {
					move(1);
				}, AUTOPLAY);
			}
		});
	};
	
}( jQuery ));