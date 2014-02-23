<?php

    require_once( __DIR__ . '/../../common.php');
    require_once( __DIR__ . '/classes/RSSOrSiteView.php');

    $rss_or_feed_view = new RSSOrFeedView();
    $update = $rss_or_feed_view->setView($_GET['id'], $_GET['view']);
    return $update;

?>
