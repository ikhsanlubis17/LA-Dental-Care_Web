<?php
$db = new PDO('sqlite:' . __DIR__ . '/../database/database.sqlite');
$sth = $db->query('SELECT * FROM bookings ORDER BY id DESC LIMIT 1');
$res = $sth->fetch(PDO::FETCH_ASSOC);
echo json_encode($res, JSON_PRETTY_PRINT) . PHP_EOL;
