<?php

class RSSOrFeedView extends MysqlEntity {

    protected $table_name = 'plugin_leedrssorsiteview';

    public function getView($feed_id) {
        $result = $this->dbconnector->connection->query('
            SELECT id, view FROM `' . MYSQL_PREFIX . $this->table_name . '`
            WHERE `id` = ' . $feed_id . '
        ');

        if($result) {
            $row = $result->fetch_assoc();
            return $row['view'];
        }
    }

    public function setView($id, $view) {
        $result = $this->dbconnector->connection->query('
            INSERT INTO ' . MYSQL_PREFIX . $this->table_name . '
            (id, view) VALUES (' . $id . ', ' . $view . ')
            ON DUPLICATE KEY UPDATE `view`=VALUES(view);
        ');

        return $result ? true : false;
    }

    public function install() {
        $this->dbconnector->connection->query('
            CREATE TABLE IF NOT EXISTS `' . MYSQL_PREFIX . $this->table_name . '` (
              `id` int(11) NOT NULL PRIMARY KEY CONSTRAINT id UNIQUE,
              `view` int(1) NOT NULL,
              PRIMARY KEY (`id`)
            ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
        ');

        $this->dbconnector->connection->query('
            INSERT INTO `' . MYSQL_PREFIX . $this->table_name . '`(
                  id,
                  view )
            SELECT `id`,
                   \'0\'
            FROM `' . MYSQL_PREFIX . 'feed`;
        ');
    }

    public function uninstall() {
        $this->destroy();
    }

}
