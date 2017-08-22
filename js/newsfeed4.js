var watchesApp = angular.module('deniApp', ['ngCookies', 'ngColorThis']);

watchesApp.controller('newFeed4', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    $scope.findCatsUrl = "findCategory.php";

    $scope.cats = [];

    if (!angular.isUndefined($cookieStore.get('cats'))) {
        $scope.cats = $cookieStore.get('cats');
    }

    if ($scope.cats.length != 0) {
        $scope.findCatsUrl += "?_id=" + JSON.stringify($scope.cats);
    }

    $scope.subs = [];
    $scope.show = [];

    getCats($scope.findCatsUrl);

    $scope.randomColor = function () {
        return (Math.random() * 16);
    };

    $scope.back_to_newfeed3 = function () {
        window.location.replace("newfeed_3.html");
    };

    $scope.savePreArticles = function (keyPre) {
        $cookieStore.put('keyPre', keyPre);
        window.location.replace("newfeed_5.html");
    };

    function getCats(url) {
        $http({
            method: 'GET',
            url: url
        }).success(function (data) {

            if (!angular.isUndefined($cookieStore.get('subs'))) {
                $scope.subs = $cookieStore.get('subs');
            }

            if ($scope.subs.length == 0) {
                angular.forEach(data, function (value, key) {
                    angular.forEach(value['sub_category'], function (value_1, key_1) {
                        var temp = value['sub_category'][key_1];

                        if (temp['articles'].length) {
                            $http({
                                method: 'GET',
                                url: "findArticle.php?_id=[" + JSON.stringify(temp['articles'][0]) + "]"
                            }).success(function (data_1) {
                                temp['image'] = data_1[0]['image'];
                            }).error(function (data_1, status_1, headers_1, config_1) {
                            });
                        }

                        temp['keyCat'] = value['_id'];
                        temp['keySub'] = key_1;
                        $scope.show.push(temp);
                    });
                });
            }
            else {
                angular.forEach(data, function (value, key) {
                    angular.forEach($scope.subs, function (value_1, key_1) {
                        if (value['_id']['$oid'] == value_1['keyCat']['$oid']) {
                            var temp = value['sub_category'][value_1['keySub']];

                            if (temp['articles'].length) {
                                $http({
                                    method: 'GET',
                                    url: "findArticle.php?_id=[" + JSON.stringify(temp['articles'][0]) + "]"
                                }).success(function (data_1) {
                                    temp['image'] = data_1[0]['image'];
                                }).error(function (data_1, status_1, headers_1, config_1) {
                                });
                            }

                            temp['keyCat'] = value['_id'];
                            temp['keySub'] = value_1['keySub'];
                            $scope.show.push(value['sub_category'][value_1['keySub']]);
                        }
                    });
                });
            }

        }).error(function (data, status, headers, config) {
        });
    }

    $scope.articles = function (keyCat, keySub) {
        $cookieStore.put('subs', $scope.subs);
        console.log(keyCat);
        console.log(keySub);
    }

}]);