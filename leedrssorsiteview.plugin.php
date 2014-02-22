<?php
/*
@name LeedRSSOrSiteView
@author Simounet <contact@simounet.net>
@link http://www.simounet.net
@licence WTFPL
@version 1.0.0
@description Allow us to choose the view (RSS or website) for each feed
*/

function getView($feed_id) {
    $result = mysql_query('
        SELECT id, view FROM `'.MYSQL_PREFIX.'plugin_leedrssorsiteview`
        WHERE `id` = ' . $feed_id . '
    ');
    
    if($result) {
        $row = mysql_fetch_assoc($result);
        return $row['view'];
    }
}

function leedrssorsiteview_plugin_getView(&$event) {
    $event->view = getView($event->getFeed());
}

//Plugin::addJs("/js/script.js");

Plugin::addHook("event_pre_section", "leedrssorsiteview_plugin_getView");
?>
