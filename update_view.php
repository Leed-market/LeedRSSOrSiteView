<?php

    require_once( __DIR__ . '/../../common.php');
    require_once( __DIR__ . '/common.php');

    $result = mysql_query('
        UPDATE ' . MYSQL_PREFIX . LEEDRSSORSITEVIEW_TABLE . ' 
        SET `view`="' . $_GET['view'] . '"
        WHERE `id`="' . $_GET['id'] . '";
    ');

    return $result ? true : false;

?>
