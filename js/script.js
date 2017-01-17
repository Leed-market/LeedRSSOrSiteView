$('document').ready(function () {
    $('.wrapper').on('click', '.js-switch-view', function (event) {
        event.preventDefault();
        switchFeedView($(this));
    });
});

function switchFeedView (element) {
    var newRssOrSiteView = +!element.data('view');
    var entry = element.parents('.js-event');

    $.ajax({
        url: './plugins/LeedRSSOrSiteView/update_view.php',
        data: { id: entry.data('feed-id'), view: newRssOrSiteView }
    })
        .done(function () {
            var newRssOrSiteViewText = (newRssOrSiteView === 1) ? 'RSS_VIEW' : 'SITE_VIEW';
            element.data('view', newRssOrSiteView)
                .html(_t(newRssOrSiteViewText));

            toggleView(entry.find('.js-article__content'), newRssOrSiteView);
        })
        .fail(function () {
            alert('error');
        });
}

// Create the site iframe
function toggleWebsite (element, removeIframe, callback) {
    var entry = element.parents('.js-event');
    var articleContent = entry.find('.js-article__content');

    if (removeIframe) {
        element.children().remove();
    }

    if (entry.hasClass('js-focus')) {
        var iframeLoadingId = 'iframe-loading';
        var iframeId = 'entry-iframe-' + entry.data('id');
        articleContent.append('<img src="plugins/LeedRSSOrSiteView/img/leed-logo.svg" class="iframe-loader" alt="Loading..." id="' + iframeLoadingId + '" />');

        jQuery('<iframe id="' + iframeId + '" frameborder="0" src="' + articleContent.data('article-url') + '" style="position: relative; width: 100%; height: 100%; z-index: 10;" />').appendTo(articleContent);
        $('#' + iframeId).load(function () {
            $('#' + iframeLoadingId).remove();
        });

        if (typeof (callback) === 'function') {
            callback();
        }
    }
}

function toggleRSSOrSiteClasses (events, action) {
    var classes = 'event--website-view js-website-view';
    if (action === 'remove') {
        events.each(function () {
            $(this).removeClass(classes);
        });
    } else {
        events.each(function () {
            $(this).addClass(classes);
        });
    }
}

// [todo] - Create a general object to avoid these repetitive node switches
function toggleView (element, view) {
    var entry = element.parents('.js-event');
    var eventContent = entry.find('.js-article__content');
    var allEvents = $('[data-feed-id="' + entry.data('feed-id') + '"]');
    eventContent.children().remove();
    if (view === 1) {
        toggleWebsite(eventContent);
        toggleRSSOrSiteClasses(allEvents);
    } else {
        eventObj.toggleContent();
        toggleRSSOrSiteClasses(allEvents, 'remove');
    }
}
