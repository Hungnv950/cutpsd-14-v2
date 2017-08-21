/**
 * Created by vietv on 3/4/2017.
 */
var watchesApp = angular.module('deniApp', ['ngCookies']);

watchesApp.controller('newFeedCtrl', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {
    $scope.data = null;

    $scope.catsUrl = "mongodb.php";

    $scope.cats = [];

    if (!angular.isUndefined($cookieStore.get('cats'))) {
        $scope.cats = $cookieStore.get('cats');
    }

    console.log($scope.cats);

    if ($scope.cats.length == 0) {

    }
    else {

    }


    $scope.show = [];

    function getCats(url) {
        $http({
            method: 'GET',
            url: url
        }).success(function (data) {
            $scope.data = data;

            for (var i = 0; i < $scope.cats.length; i++) {
                var index = $scope.cats.indexOf($scope.cats[i]);
                $scope.show.push(data[index]);
            }
        }).error(function (data, status, headers, config) {
        });
    }

    getCats($scope.catsUrl);

    $scope.keyCat = null;
    $scope.keySub = null;

    $scope.newfeed_starten_btn = function () {
        if ($scope.keySub !== null) {
            $cookieStore.put('keySub', $scope.keySub);
        }

        $cookieStore.put('keyCat', $scope.cats[$scope.keyCat]);
        window.location.replace("newfeed_4.html");
    };

    $scope.saveKey = function (keyCat, keySub) {
        $scope.keyCat = keyCat;
        $scope.keySub = keySub;
    };

}]);