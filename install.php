<?php

mysql_query('
    CREATE TABLE IF NOT EXISTS `'.MYSQL_PREFIX.'plugin_leedrssorsiteview` (
      `id` int(11) NOT NULL,
      `view` int(1) NOT NULL,
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
');

mysql_query('
    INSERT INTO `'.MYSQL_PREFIX.'plugin_leedrssorsiteview`(
          id,
          view )
    SELECT `id`,
           \'0\'
    FROM `'.MYSQL_PREFIX.'feed`;
');
?>
