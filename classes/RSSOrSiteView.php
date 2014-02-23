<?php

class RSSOrFeedView {

    public function getView($feed_id) {
        $result = mysql_query('
            SELECT id, view FROM `'.MYSQL_PREFIX.'plugin_leedrssorsiteview`
            WHERE `id` = ' . $feed_id . '
        ');
        
        if($result) {
            $row = mysql_fetch_assoc($result);
            return $row['view'];
        }
    }

}
