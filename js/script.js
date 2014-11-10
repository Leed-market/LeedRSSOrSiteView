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
        ".article__content--website .article__content",
        "height: " + iframeHeight + "px"
    );

});

function switchFeedView(element) {
    var newRssOrSiteView = + ! element.data('view'),
        entry = element.parents('.js-feed__entry');

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
    var entry = element.parents('.js-feed__entry'),
        articleContent = entry.find('.js-article__content');
    if( articleContent.not(':has(iframe)').length ) {
        entry.addClass('article__content--website js-website');
        entry.find('.js-article__content--rss').remove();
        if( entry.hasClass('js-focus') ) {
            jQuery('<iframe frameborder="0" src="' + articleContent.data('article-url') + '" style="width: 100%; height: 100%;" />').appendTo( articleContent );
            if( typeof( callback ) == "function" )
                callback();
        }
    } else {
        articleContent.children('iframe').remove();
    }
}

// [todo] - Get RSS content instead of this show/hide trick
function toggleRSS( element ) {
    var entry = element.parents('.js-feed__entry'),
        content = entry.find('.js-article__content'),
        contentIframe = content.find( 'iframe' );
    
    if( contentIframe.length > 0 )
        contentIframe.remove();
    
    entry.removeClass('article__content--website js-website');
}

// [todo] - Create a general object to avoid these repetitive node switches
function toggleView( element, view ) {
    var entry = element.parents('.js-feed__entry');

    $( '[data-feed-id="' + entry.data('feed-id') + '"]' ).each(function() {
        if( view == 1 ) {
            toggleWebsite( $(this).children() );
        } else {
            toggleRSS( $(this).children() );
        }
    });
    
    if( view == 0 ) {
        toggleContent( entry.data('id'), element );
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
