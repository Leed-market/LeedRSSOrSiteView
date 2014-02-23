<?php

    require_once( __DIR__ . '/common.php' );

    mysql_query('
        CREATE TABLE IF NOT EXISTS `' . MYSQL_PREFIX . LEEDRSSORSITEVIEW_TABLE . '` (
          `id` int(11) NOT NULL,
          `view` int(1) NOT NULL
        ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
    ');

    mysql_query('
        INSERT INTO `' . MYSQL_PREFIX . LEEDRSSORSITEVIEW_TABLE . '`(
              id,
              view )
        SELECT `id`,
               \'0\'
        FROM `' . MYSQL_PREFIX . 'feed`;
    ');
?>
