<?php

require 'vendor/autoload.php';

$_id = isset($_GET['_id']) ? json_decode($_GET['_id']) : 1;

$positions = isset($_GET['positions']) ? $_GET['positions'] : -1;

if ($positions) {
    $positions = json_decode($positions);
}

$client = new MongoDB\Client();

$cats = [];
$search = [];

if ($_id == 1) {
    $search = $client->newsfeed->category->find([], [
        'projection' => [
            'cat_name' => 1,
            'sub_category' => 1,
        ],
    ]);

} else {
    foreach ($_id as $value) {
        $value = get_object_vars($value);
        $search[] = $client->newsfeed->category->findOne(['_id' => new MongoDB\BSON\ObjectID('' . $value['$oid'])], ['projection' => [
            'cat_name' => 1,
            'sub_category' => 1,
        ]]);
    }
}

foreach ($search as $cat) {
    foreach ($cat['sub_category'] as $key => $sub) {
        $temp = $sub;

        $articles = $sub['articles'];
        if (count($articles)) {
            $article = get_object_vars($articles[0]);
            $article = $client->newsfeed->article->findOne(['_id' => new MongoDB\BSON\ObjectID('' . $article['oid'])], ['projection' => [
                'image' => 1,
            ]]);

            $cat['sub_category'][$key]['image'] = $article['image'];
            $cat['sub_category'][$key]['view'] = 0;


            if ($positions != -1 && $positions != 0) {
                foreach ($positions as $position) {

                    $position = get_object_vars($position);

                    $keyCat = get_object_vars($position['keyCat'])['$oid'];
                    $keySub = $position['keySub'];

                    if ((string)$cat['_id'] == $keyCat) {
                        $cat['sub_category'][$keySub]['view'] = 1;
                    }

                }
            } else {
                $cat['sub_category'][$key]['view'] = 1;
            }

        }
    }

    $cats[] = $cat;
}

echo(json_encode($cats));

