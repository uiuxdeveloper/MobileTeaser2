$(window).ready(function(){
	
	var accordionCache = new Array();
	
	$('.accordion-toggle').each(function(i ,item){
		console.log(i);
		accordionCache.push({
			$next: $(this).next(),
			$expander: $(this).children('.expander').find('.fa'),
			//nextHeight:$(this).next().height()//getSize().height
		});
		
		
	});
	var slideOn =false;
	$('.accordion-toggle').on('click', function(){
		

		var index = $('.accordion-toggle').index(this);
		accordionCache[index].$next.slideToggle(400, function() {
			if ( accordionCache[index].$expander.hasClass('fa-plus-square-o') ) {
				accordionCache[index].$expander.removeClass('fa-plus-square-o');
				accordionCache[index].$expander.addClass('fa-minus-square-o');
			} else {
				accordionCache[index].$expander.removeClass('fa-minus-square-o');
				accordionCache[index].$expander.addClass('fa-plus-square-o');
			}
		});
		
    });
	
	

  	$('body').flowtype({
		maximum   : 1200,
		minimum   : 320,
		maxFont   : 27,
		minFont   : 12,
		fontRatio : 28
	});

	orientation();

  	window.onresize = function(event) {
		orientation();
		
		
	}
	
	
	$('.ga-tracker').on('click',function(){
		ga('send', 'button', 'click', $(this).data('track')); 
	});
  	

});

function setHeights(theHeight,theWidth,oheight,multiplyer) {
	var h = oheight - 50;
	//if ( theWidth === 320 && theHeight < 480 ) {
	//	$('#bottom-section').height( ( h * .441 ) * multiplyer );
	//	$('#top-section').height( ( h * .324 ) * multiplyer );
	//	$('#what-is-maplestory').height( ( h * .08 ) * multiplyer );
	//	$('#game-features').height( ( h * .08 ) * multiplyer );
	//	$('#our-community').height( ( h * .08 ) * multiplyer );	
	//} else {
		$('#bottom-section').height( ( h * .36 ) * multiplyer );
		$('#top-section').height( ( h * .36 ) * multiplyer );
		$('#what-is-mabinogi').height( ( h * .081 ) * multiplyer );
		$('#game-features').height( ( h * .081 ) * multiplyer );
		$('#our-community').height( ( h * .081 ) * multiplyer );	
	//}
}

function getViewportSize(w) {

    // Use the specified window or the current window if no argument
    w = w || window;

    // This works for all browsers except IE8 and before
    if (w.innerWidth != null) return { w: w.innerWidth, h: w.innerHeight };

    // For IE (or any browser) in Standards mode
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return { w: d.documentElement.clientWidth,
           h: d.documentElement.clientHeight };

    // For browsers in Quirks mode
    return { w: d.body.clientWidth, h: d.body.clientHeight };

}

function orientation() {
	var viewPort = getViewportSize();

	if(viewPort.h < viewPort.w){
		var landscapeHeight = viewPort.w;
		setHeights(viewPort.h,viewPort.w,landscapeHeight,viewPort.w/viewPort.h);	   
	} else {
		var portraitHeight = viewPort.h;
		setHeights(viewPort.h,viewPort.w,portraitHeight,1);		
	}
}


