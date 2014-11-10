<?php
/*
@name LeedRSSOrSiteView
@author Simounet <contact@simounet.net>
@link http://www.simounet.net
@licence WTFPL
@version 1.0.0
@description Allow us to choose the view (RSS or website) for each feed
*/

include( __DIR__ . '/classes/RSSOrSiteView.php' );

function leedrssorsiteview_plugin_getView(&$event) {
    $rss_or_feed_view = new RSSOrFeedView();
    $event->view = $rss_or_feed_view->getView($event->getFeed());
}

Plugin::addCss("/css/style.css");
Plugin::addJs("/js/script.js");

Plugin::addHook("event_pre_section", "leedrssorsiteview_plugin_getView");
?>
