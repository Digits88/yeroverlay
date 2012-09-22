var yerOverlay = {


    selector: false,
    type: 'zoom',
    
    
    init: function () {
        jQuery('body').append('<div class="yeroverlay-wrap"><div class="yeroverlay-box">');
        jQuery('.yeroverlay-wrap').on('click', function(event) { jQuery(this).fadeOut( 100 ); event.stopPropagation(); });
        jQuery('.yeroverlay-box').on('click', function(event) { event.stopPropagation(); });
    },
    
    
    zoom: function () {
        
    },
    
    
    selector: function () {
        
        
    },
    
    
    form: function ( param ) {
        
        if ( !param  ) param = {};
        if ( !param.path  ) param.path = '/';
        if ( !param.path  ) param.selector = '#overlay';
        
        jQuery('.yeroverlay-wrap').fadeIn( 200 );
        
        jQuery('.yeroverlay-box').hide().load( param.path + ' ' + param.selector, function() {
            
            yerOverlay.fitboxsize();
            
            jQuery(this).fadeIn( 200 , function(){
            
                yerOverlay.formsubmit( param );
                
            });
        });
        
    },
    
    
    formsubmit: function ( param ) {
         
         
         jQuery('.yeroverlay-box').find('form').submit( function(event) {
             event.preventDefault(); 
             
             jQuery(this).css('opacity', 0.3 ).find('input[type="submit"]').parent().css('visibility', 'hidden');
             
             var form = jQuery( this ),
                 url = form.attr('action');

             jQuery.post( url + '?ajax=y', form.serialize(), function( data ) {
                 
                 var content = jQuery( data ).find( param.selector );
                 jQuery( '.yeroverlay-box > *' ).fadeOut( 200, function(){

                    jQuery(this).parent().empty().append( content ).children().css('opacity', 0);
                    yerOverlay.fitboxsize();
                    jQuery('.yeroverlay-box > *').hide().css('opacity', 1).fadeIn( 200 );
                    
                    yerOverlay.formsubmit( param );
                    
                 })
                 
             });
         });
    },
    
    
    fitboxsize: function () {
         
         var box = jQuery('.yeroverlay-box'),
             box_padding_top = parseInt( box.css('padding-top') ),
             box_padding_bottom = parseInt( box.css('padding-bottom') ),
             box_margin_top = parseInt( box.css('margin-top') ),
             box_margin_bottom = parseInt( box.css('margin-bottom') ),
             cont_height = box.height(),
             windowsize = yerOverlay.windowsize(),
             box_vert_space = cont_height + box_padding_top + box_padding_bottom + box_margin_top + box_margin_bottom;
        
        if ( windowsize.height < box_vert_space ) box.height( windowsize.height  - box_margin_top - box_margin_bottom );
    
        window.onresize = function(event) {
            box.height( cont_height + box_padding_top + box_padding_bottom );
            yerOverlay.fitboxsize();
        }
    },
    
    
    windowsize: function () {
  
         var data = {};

          /* all browsers exept IE */
          if(window.innerWidth) {
              data.width = window.innerWidth;
              data.height = window.innerHeight;
          }
          /* for IE with doctype */
          else if(document.documentElement && document.documentElement.clientWidth) {
              data.width = document.documentElement.clientWidth;
              data.height = document.documentElement.clientHeight;
          }
          /* for IE without doctype */
          else if(document.body.clientWidth) {
              data.width = document.body.clientWidth;
              data.height = document.body.clientHeight;
          }

          return data;
     }    
    
};