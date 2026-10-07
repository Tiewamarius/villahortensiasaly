( function( $ ) {
	"use strict";
	
	var count = 2;
	var total = ajax_gallery_infinite_scroll_data.max_num;

	//console.log('totalNumber: ' + total);
	var flag = 1;

	$(window).on('scroll', function(){
	    if ( $(window).scrollTop() + $(window).height() >= $('.js-gallery').offset().top + $('.js-gallery').height() ) {
	        if ( count > total ) {
	            return false;
	        } else {
	        	if( flag == 1 ){
	        		//console.log('pageNumber: ' + count);
	            	loadContent(count);
	            }
	        }
	        if( flag == 1 ){
	        	flag = 0;
	        	count++;
	        }
	    }
	});

	function loadContent(pageNumber) {
	    $.ajax({
	        url: ajax_gallery_infinite_scroll_data.url,
	        type:'POST',
	        data: "action=infinite_scroll_el&page_no="+ pageNumber + '&post_type=gallery' + '&page_id=' + ajax_gallery_infinite_scroll_data.page_id + '&order_by=' + ajax_gallery_infinite_scroll_data.order_by + '&order=' + ajax_gallery_infinite_scroll_data.order + '&per_page=' + ajax_gallery_infinite_scroll_data.per_page + '&source=' + ajax_gallery_infinite_scroll_data.source + '&temp=' + ajax_gallery_infinite_scroll_data.temp + '&cat_ids=' + ajax_gallery_infinite_scroll_data.cat_ids + '&show_title=' + ajax_gallery_infinite_scroll_data.show_title + '&show_category=' + ajax_gallery_infinite_scroll_data.show_category,
	        success: function(html){
	        	//html = html.replace(/js-scroll-show/g, '');
	     
	            var $html = $(html);
	            var $container = $('.js-gallery');

	            $html.imagesLoaded(function(){
					$container.append($html);
					$container.isotope('appended', $html );
					$container.isotope('layout');
				});

	            flag = 1;
	        }
	    });
	    return false;
	}
} )( jQuery );