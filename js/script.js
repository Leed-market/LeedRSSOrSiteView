$('document').ready(function(){
    $( '.wrapper' ).on( 'click', '.js-switch-view', function( event ) {
        event.preventDefault();
        switchFeedView( $(this) );
    });

    var sheets = document.styleSheets,
        firstSheet = document.styleSheets[0],
        iframeHeight = $(window).height() - $('.article__header').height() - 20;
    addCSSRule(
        firstSheet,
        ".event--website-view .article__content",
        "height: " + iframeHeight + "px"
    );

});

function switchFeedView(element) {
    var newRssOrSiteView = + ! element.data('view'),
        entry = element.parents('.js-event');

    $.ajax({
        url: "./plugins/LeedRSSOrSiteView/update_view.php",
        data:{ id: entry.data( 'feed-id' ), view: newRssOrSiteView },
    })
        .done(function() {
            var newRssOrSiteViewText = ( newRssOrSiteView == 1 ) ?  'RSS_VIEW' : 'SITE_VIEW';
            element.data('view', newRssOrSiteView)
                .html( _t( newRssOrSiteViewText ) );
            
            toggleView( entry.find('.js-article__content'), newRssOrSiteView );
            
        })
        .fail(function() {
            alert( "error" );
        });
}

// Create the site iframe
function toggleWebsite( element, callback ) {
    var entry = element.parents('.js-event'),
        articleContent = entry.find('.js-article__content');

    if( entry.hasClass('js-focus') ) {
        var iframeLoadingId = 'iframe-loading',
            iframeId = 'entry-iframe-' + entry.data('id');
        articleContent.append( '<img src="plugins/LeedRSSOrSiteView/img/leed-logo.png" class="iframe-loader" alt="Loading..." id="' + iframeLoadingId + '" />' );

        jQuery('<iframe id="' + iframeId + '" frameborder="0" src="' + articleContent.data('article-url') + '" style="position: relative; width: 100%; height: 100%; z-index: 10;" />').appendTo( articleContent );
        $( '#' + iframeId ).load(function () {
            $( '#' + iframeLoadingId ).remove();
        });

        if( typeof( callback ) == "function" ) {
            callback();
        }
    }
}

function toggleRSSOrSiteClasses( events, action ) {
    var classes = 'event--website-view js-website-view';
    if( action === 'remove' ) {
        events.each( function() {
            $(this).removeClass( classes );
        });
    } else {
        events.each( function() {
            $(this).addClass( classes );
        });
    }
}

// [todo] - Create a general object to avoid these repetitive node switches
function toggleView( element, view ) {
    var entry = element.parents('.js-event'),
        eventContent = entry.find( '.js-article__content' ),
        allEvents = $( '[data-feed-id="' + entry.data('feed-id') + '"]' );
    eventContent.children().remove();
    if( view == 1 ) {
        toggleWebsite( eventContent );
        toggleRSSOrSiteClasses( allEvents );
    } else {
        eventObj.toggleContent();
        toggleRSSOrSiteClasses( allEvents, 'remove' );
    }
}

//
// TOOLS
//
function addCSSRule(sheet, selector, rules, index) {
    if( index === undefined ) {
        index = sheet.cssRules.length;
    }

    if("insertRule" in sheet) {
        sheet.insertRule(selector + "{" + rules + "}", index);
    }
    else if("addRule" in sheet) {
        sheet.addRule(selector, rules, index);
    }
}
