<?php

class RSSOrFeedView extends MysqlEntity {

    protected $TABLE_NAME = 'plugin_leedrssorsiteview';

    public function getView($event) {
        $secureProtocolAsked = $_SERVER['REQUEST_SCHEME'] === 'https';
        $eventUrlNotSecure = strpos($event->getLink(), 'http:') === 0;
        if($secureProtocolAsked && $eventUrlNotSecure ) {
            return 0;
        }
        $result = $this->dbconnector->connection->query('
            SELECT id, view FROM `' . MYSQL_PREFIX . $this->TABLE_NAME . '`
            WHERE `id` = ' . $event->getFeed() . '
        ');

        if($result) {
            $row = $result->fetch_assoc();
            return $row['view'];
        }
    }

    public function setView($id, $view) {
        $result = $this->dbconnector->connection->query('
            INSERT INTO ' . MYSQL_PREFIX . $this->TABLE_NAME . '
            (id, view) VALUES (' . $id . ', ' . $view . ')
            ON DUPLICATE KEY UPDATE `view`=VALUES(view);
        ');

        return $result ? true : false;
    }

    public function addView($feedId) {
        $this->dbconnector->connection->query('
            INSERT INTO `' . MYSQL_PREFIX . $this->TABLE_NAME . '`
            ( id )
            VALUES(' . $feedId . ');
        ');
    }

    public function removeView($feedId) {
        $this->dbconnector->connection->query('
            DELETE FROM `' . MYSQL_PREFIX . $this->TABLE_NAME . '`
            WHERE id=' . $feedId . ';
        ');
    }

    public function install() {
        $query = '
            CREATE TABLE IF NOT EXISTS `' . MYSQL_PREFIX . $this->TABLE_NAME . '` (
              `id` int(11),
              `view` int(1) DEFAULT 0,
              PRIMARY KEY (`id`)
            ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
        ';
        $this->dbconnector->connection->query($query);

        $this->dbconnector->connection->query('
            INSERT INTO `' . MYSQL_PREFIX . $this->TABLE_NAME . '`(
                  id)
            SELECT `id`
            FROM `' . MYSQL_PREFIX . 'feed`;
        ');
    }

    public function uninstall() {
        $this->destroy();
    }

}
