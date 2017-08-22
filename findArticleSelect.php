<?php

require 'vendor/autoload.php';

$_id = isset($_GET['_id']) ? $_GET['_id'] : 1;
$position = isset($_GET['position']) ? $_GET['position'] : 1;

$client = new MongoDB\Client();

$arts = [];

if ($_id != 1 && $position != 1) {

    $cat = $client->newsfeed->category->findOne(['_id' => new MongoDB\BSON\ObjectID('' . $_id)], ['projection' => [
        'sub_category' => 1,
    ]]);

    $sub = $cat['sub_category'][$position]['articles'];

    $articles = [];

    foreach ($sub as $value) {
        $value = get_object_vars($value);
        $articles[] = $client->newsfeed->article->findOne(['_id' => new MongoDB\BSON\ObjectID('' . $value['oid'])]);
    }

    echo(json_encode($articles));
}
