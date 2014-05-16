function YerOverlay () {

	var t = this;

	t.dom = {};

	t.init = function () {

		jQuery( 'body' ).append( '<div class="yeroverlay-wrap"><div class="yeroverlay-box"><div class="yeroverlay-content">' );

		t.dom.wrap = jQuery( '.yeroverlay-wrap' );
		t.dom.box = jQuery( '.yeroverlay-box' );
		t.dom.cont = jQuery( '.yeroverlay-content' );

		t.dom.wrap.on( 'click', function( event ) { t.dom.wrap.fadeOut( 100 ); event.stopPropagation(); });
		t.dom.box.on( 'click', function( event ) { event.stopPropagation(); });
	};

	t.listen = function ( ) {

		jQuery( '.yeroverlay' ).on( 'click', function () {

			var source = jQuery( this ).data( 'yeroverlay-source' ),
				content = '';

			if ( source ) {

				content = jQuery( source ).html();
			}

			t.open( content );
		} );

	};

	t.open = function ( content ) {

		t.dom.cont.html( content );
		t.dom.wrap.fadeIn( 200 );
		t.fitboxsize();
	};

	t.zoom = function () {

	};

	t.selector = function () {

	};

	t.form = function ( p ) {

		if ( typeof p === 'undefined' ) { p = {}; }
		if ( typeof p.path === 'undefined' ) { p.path = '/'; }
		if ( typeof p.selector === 'undefined' ) { p.selector = '#overlay'; }

		t.dom.wrap.fadeIn( 200 );

		t.dom.box.hide();
		t.dom.cont.load( p.path + ' ' + p.selector, function() {

			t.fitboxsize();

			t.dom.box.fadeIn( 200 , function(){

				t.formsubmit( p );
				t.closebtn();

			});
		});

	};

	t.formsubmit = function ( p ) {

		t.dom.cont.find( 'form' ).submit( function( event ) {

			event.preventDefault();

			jQuery(this).css( 'opacity', 0.3 ).find( 'input[type="submit"]' ).parent().css( 'visibility', 'hidden' );

			var form = jQuery(this),
				url = form.attr( 'action' );

			jQuery.post( url + '?ajax=y', form.serialize(), function( data ) {

				var content = jQuery( data ).find( p.selector );

				t.dom.cont.children().fadeOut( 200, function(){

					jQuery(this).parent().empty().append( content ).children().css( 'opacity', 0 );

					t.fitboxsize();

					t.dom.cont.children().hide().css( 'opacity', 1 ).fadeIn( 200 );

					t.formsubmit( p );

					t.closebtn();

				});

			});
		});
	};

	t.fitboxsize = function () {

		t.fitboxsize_job();

		jQuery( window ).resize( function() {

			t.fitboxsize_job();
		});
	};

	t.fitboxsize_job = function () {

		t.dom.cont.height( '' );

		var windowsize = t.windowsize(),
			box_padding_top = parseInt( t.dom.box.css( 'padding-top' ), 10 ),
			box_padding_bottom = parseInt( t.dom.box.css( 'padding-bottom' ), 10 ),
			box_margin_top = parseInt( t.dom.box.css( 'margin-top' ), 10 ),
			box_margin_bottom = parseInt( t.dom.box.css( 'margin-bottom' ), 10 ),
			cont_height = t.dom.box.height(),
			cont_height_max = windowsize.height - box_margin_top - box_margin_bottom - box_padding_top - box_padding_bottom,
			box_vert_space = cont_height + box_padding_top + box_padding_bottom + box_margin_top + box_margin_bottom;

		if ( windowsize.height < box_vert_space ) {

			t.dom.cont.height( cont_height_max );
		}
	};

	t.windowsize = function () {

		var data = {};

		data.width = jQuery( window ).width();
		data.height = jQuery( window ).height();

		return data;
	};

	t.closebtn = function () {

		t.dom.box.append( '<div class="yeroverlay-close">' );
		t.dom.close = t.dom.box.find( '.yeroverlay-close' );

		t.dom.close.on( 'click', function (event) {

			t.dom.wrap.fadeOut( 100 );
			event.stopPropagation();
		});
	};

};