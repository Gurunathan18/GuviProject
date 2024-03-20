<?php
require_once __DIR__ . './predis/autoload.php';

Predis\Autoloader::register();

$redis = new Predis\Client();
?>