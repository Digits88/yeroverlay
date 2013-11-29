var YerOverlay = {
    
    dom: {},
    
    init: function () {
        jQuery('body').append('<div class="yeroverlay-wrap"><div class="yeroverlay-box"><div class="yeroverlay-content">');
        
        YerOverlay.dom.wrap = jQuery('.yeroverlay-wrap');
        YerOverlay.dom.box = jQuery('.yeroverlay-box');
        YerOverlay.dom.cont = jQuery('.yeroverlay-content');
        
        YerOverlay.dom.wrap.on('click', function(event) { YerOverlay.dom.wrap.fadeOut( 100 ); event.stopPropagation(); });
        YerOverlay.dom.box.on('click', function(event) { event.stopPropagation(); });
    },
    
    open: function () {
          
          YerOverlay.dom.wrap.fadeIn( 200 );
          YerOverlay.fitboxsize();
    },
    
    
    zoom: function () {
        
        
    },
    
    
    selector: function () {
        
        
    },
    
    
    form: function ( p ) {
        
        if ( typeof p === 'undefined' ) { p = {}; }
        if ( typeof p.path === 'undefined' ) { p.path = '/'; }
        if ( typeof p.selector === 'undefined' ) { p.selector = '#overlay'; }
        
        YerOverlay.dom.wrap.fadeIn( 200 );
        
        YerOverlay.dom.box.hide();
        YerOverlay.dom.cont.load( p.path + ' ' + p.selector, function() {
            
            YerOverlay.fitboxsize();
            
            YerOverlay.dom.box.fadeIn( 200 , function(){
            
                YerOverlay.formsubmit( p );
                YerOverlay.closebtn();
                
            });
        });
        
    },
    
    
    formsubmit: function ( p ) {
         
         
         YerOverlay.dom.cont.find('form').submit( function(event) {
             event.preventDefault();
             
             jQuery(this).css('opacity', 0.3 ).find('input[type="submit"]').parent().css('visibility', 'hidden');
             
             var form = jQuery(this),
                 url = form.attr('action');

             jQuery.post( url + '?ajax=y', form.serialize(), function( data ) {
                 
                 var content = jQuery( data ).find( p.selector );
                 YerOverlay.dom.cont.children().fadeOut( 200, function(){

                    jQuery(this).parent().empty().append( content ).children().css('opacity', 0);
                    YerOverlay.fitboxsize();
                    YerOverlay.dom.cont.children().hide().css('opacity', 1).fadeIn( 200 );
                    
                    YerOverlay.formsubmit( p );
                    YerOverlay.closebtn();
                    
                 });
                 
             });
         });
    },
    
    
    fitboxsize: function () {
         
         var box_padding_top = parseInt( YerOverlay.dom.box.css('padding-top'), 10 ),
             box_padding_bottom = parseInt( YerOverlay.dom.box.css('padding-bottom'), 10 ),
             box_margin_top = parseInt( YerOverlay.dom.box.css('margin-top'), 10 ),
             box_margin_bottom = parseInt( YerOverlay.dom.box.css('margin-bottom'), 10 ),
             cont_height = YerOverlay.dom.box.height(),
             windowsize = YerOverlay.windowsize(),
             box_vert_space = cont_height + box_padding_top + box_padding_bottom + box_margin_top + box_margin_bottom;

        if ( windowsize.height < box_vert_space ) {

            YerOverlay.dom.cont.height( windowsize.height - box_margin_top - box_margin_bottom );
        }

        jQuery(window).resize( function() {

            windowsize = YerOverlay.windowsize();
            YerOverlay.dom.cont.height( windowsize.height - box_margin_top - box_margin_bottom );
        });
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

        YerOverlay.dom.box.append('<div class="yeroverlay-close">');
        YerOverlay.dom.close = YerOverlay.dom.box.find('.yeroverlay-close');

        YerOverlay.dom.close.on( 'click', function (event) {
            YerOverlay.dom.wrap.fadeOut( 100 );
            event.stopPropagation();
        });
    }
    
};