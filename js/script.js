$('document').ready(function(){
    $( '.wrapper' ).on( 'click', '.js-switch-view', function( event ) {
        event.preventDefault();
        switchView( $(this) );
    });
});

function switchView(e) {
   var newRssOrSiteView = + ! e.data('view');

    $.ajax({
        url: "./plugins/LeedRSSOrSiteView/update_view.php",
        data:{ id: 176, view: newRssOrSiteView },
    })
        .done(function() {
            var newRssOrSiteViewText = ( newRssOrSiteView == 1 ) ? 'SITE_VIEW' : 'RSS_VIEW';
            e.data('view', newRssOrSiteView)
                .html( _t( newRssOrSiteViewText ) );
            
        })
        .fail(function() {
            alert( "error" );
        });
}
