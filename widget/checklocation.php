<?php

$result = [
    'cc' => 'US',
    'phone' => '1',
    'state' => 'CA',
    'city' => 'Mountain View',
    'zip' => '94043'
];


header('application/json');
echo json_encode($result);
