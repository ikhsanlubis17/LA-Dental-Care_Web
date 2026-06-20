<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$config = $app->make('config');
echo $config->get('database.default') . PHP_EOL;
echo 'DB_DATABASE=' . $config->get('database.connections.' . $config->get('database.default') . '.database') . PHP_EOL;
