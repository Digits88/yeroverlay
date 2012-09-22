var yerOverlay = {
    
    dom: {},
    
    init: function () {
        jQuery('body').append('<div class="yeroverlay-wrap"><div class="yeroverlay-box"><div class="yeroverlay-content">');
        
        yerOverlay.dom.wrap = jQuery('.yeroverlay-wrap');
        yerOverlay.dom.box = jQuery('.yeroverlay-box');
        yerOverlay.dom.cont = jQuery('.yeroverlay-content');
        
        yerOverlay.dom.wrap.on('click', function(event) { yerOverlay.dom.wrap.fadeOut( 100 ); event.stopPropagation(); });
        yerOverlay.dom.box.on('click', function(event) { event.stopPropagation(); });
        
    },
    
    
    zoom: function () {
        
        
    },
    
    
    selector: function () {
        
        
    },
    
    
    form: function ( param ) {
        
        if ( !param  ) { param = {}; }
        if ( !param.path  ) { param.path = '/'; }
        if ( !param.path  ) { param.selector = '#overlay'; }
        
        yerOverlay.dom.wrap.fadeIn( 200 );
        
        yerOverlay.dom.box.hide();
        yerOverlay.dom.cont.load( param.path + ' ' + param.selector, function() {
            
            yerOverlay.fitboxsize();
            
            yerOverlay.dom.box.fadeIn( 200 , function(){
            
                yerOverlay.formsubmit( param );
                yerOverlay.closebtn();
                
            });
        });
        
    },
    
    
    formsubmit: function ( param ) {
         
         
         yerOverlay.dom.cont.find('form').submit( function(event) {
             event.preventDefault();
             
             jQuery(this).css('opacity', 0.3 ).find('input[type="submit"]').parent().css('visibility', 'hidden');
             
             var form = jQuery(this),
                 url = form.attr('action');

             jQuery.post( url + '?ajax=y', form.serialize(), function( data ) {
                 
                 var content = jQuery( data ).find( param.selector );
                 yerOverlay.dom.cont.children().fadeOut( 200, function(){

                    jQuery(this).parent().empty().append( content ).children().css('opacity', 0);
                    yerOverlay.fitboxsize();
                    yerOverlay.dom.cont.children().hide().css('opacity', 1).fadeIn( 200 );
                    
                    yerOverlay.formsubmit( param );
                    yerOverlay.closebtn();
                    
                 });
                 
             });
         });
    },
    
    
    fitboxsize: function () {
         
         var box_padding_top = parseInt( yerOverlay.dom.box.css('padding-top'), 10 ),
             box_padding_bottom = parseInt( yerOverlay.dom.box.css('padding-bottom'), 10 ),
             box_margin_top = parseInt( yerOverlay.dom.box.css('margin-top'), 10 ),
             box_margin_bottom = parseInt( yerOverlay.dom.box.css('margin-bottom'), 10 ),
             cont_height = yerOverlay.dom.box.height(),
             windowsize = yerOverlay.windowsize(),
             box_vert_space = cont_height + box_padding_top + box_padding_bottom + box_margin_top + box_margin_bottom;
        
        if ( windowsize.height < box_vert_space ) { yerOverlay.dom.cont.height( windowsize.height  - box_margin_top - box_margin_bottom ); }
    
        window.onresize = function() {
            jQuery('.yeroverlay-box').height( cont_height + box_padding_top + box_padding_bottom );
            yerOverlay.fitboxsize();
        };
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
     },
     
     
    closebtn: function () {

        yerOverlay.dom.box.append('<div class="yeroverlay-close">');
        yerOverlay.dom.close = yerOverlay.dom.box.find('.yeroverlay-close');

        yerOverlay.dom.close.on( 'click', function (event) {
            yerOverlay.dom.wrap.fadeOut( 100 );
            event.stopPropagation();
        });
    }
    
};