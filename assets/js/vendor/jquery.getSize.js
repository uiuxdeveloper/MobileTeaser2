/*
jQuery getSize 1.0.0
Copyright (c) 2014 Tomer Almog
*/


(function($) {

     $.fn.getSize = function() {    
    var $wrap = $("<div />").appendTo($("body"));
    $wrap.css({
        "position":   "absolute !important",
        "visibility": "hidden !important",
        "display":    "block !important"
    });

    $clone = $(this).clone().appendTo($wrap);

    sizes = {
        "width": this.outerWidth(),
        "height": this.outerHeight()
    };

    $wrap.remove();

    return sizes;
};
     
})(jQuery);

