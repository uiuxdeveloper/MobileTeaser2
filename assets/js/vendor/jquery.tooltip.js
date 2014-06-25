/*
jQuery Tooltip 1.0.0
Copyright (c) 2014 Roger Nikunen
*/


(function($) {

     $.fn.tooltip = function(options) {
     
          var set = $.extend( {
          
               'speed' : 200,
               'position' : 'bottom'
          
          }, options);

          return this.each(function() {
          
               var tooltip_container = '.tooltip_container_' + set.position;

               $(this).focusin(
                    function ()
                    {
                         var out = '<div class="tooltip_container_' + set.position + '"><div class="tooltip_point_' + set.position + '"><div class="tooltip_content">' + $(this).attr('data-tiptext') + '</div></div></div>';
                         
                         $(this).append(out);
                    
                         var w_t = $(tooltip_container).outerWidth() - 50;
                         var h_t = $(tooltip_container).outerHeight();
                         var w_e = $(this).width();
                         var m_l = (w_e / 2) - (w_t / 2) ;
                         var o_t = $(this).offset().top - (h_t + 10)
                    
                         $(tooltip_container).css('margin-left', m_l + 'px');
                         $(tooltip_container).css('top', o_t + 'px');
                         $(this).removeAttr('title');
                         $(tooltip_container).fadeIn(set.speed);
                    }
               );

               $(this).focusout(
                    function ()
                    {
                         $(tooltip_container).remove();
                    }
               );
                              
          });
     };
     
})(jQuery);

