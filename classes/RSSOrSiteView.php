<?php

class RSSOrFeedView {

    protected $table_name = 'plugin_leedrssorsiteview';

    public function getView($feed_id) {
        $result = mysql_query('
            SELECT id, view FROM `' . MYSQL_PREFIX . $this->table_name . '`
            WHERE `id` = ' . $feed_id . '
        ');
        
        if($result) {
            $row = mysql_fetch_assoc($result);
            return $row['view'];
        }
    }

    public function setView($id, $view) {
        $result = mysql_query('
            UPDATE ' . MYSQL_PREFIX . $this->table_name . ' 
            SET `view`="' . $view . '"
            WHERE `id`="' . $id . '";
        ');

        return $result ? true : false;
    }

    public function install() {
        mysql_query('
            CREATE TABLE IF NOT EXISTS `' . MYSQL_PREFIX . $this->table_name . '` (
              `id` int(11) NOT NULL,
              `view` int(1) NOT NULL
            ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
        ');

        mysql_query('
            INSERT INTO `' . MYSQL_PREFIX . $this->table_name . '`(
                  id,
                  view )
            SELECT `id`,
                   \'0\'
            FROM `' . MYSQL_PREFIX . 'feed`;
        ');
    }

    public function uninstall() {
        mysql_query( 'DROP TABLE ' . MYSQL_PREFIX . $this->table_name );
    }

}
