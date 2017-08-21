<?php

require 'vendor/autoload.php';

$_id = isset($_GET['_id']) ? json_decode($_GET['_id']) : 1;

$client = new MongoDB\Client();

$cat = [];

if ($_id == 1) {
    $cats = $client->newsfeed->category->find([], [
        'projection' => [
            'cat_name' => 1,
            'sub_category' => 1,
        ],
    ]);
} else {
    $search = [];

    foreach ($_id as $value) {
        $search[] = ['_id' => new MongoDB\BSON\ObjectID('' . $value)];
    }

    $cat = $client->newsfeed->category->find(['$or' => $search], ['projection' => [
        'cat_name' => 1,
        'sub_category' => 1,
    ]]);
}

echo(json_encode($cat));