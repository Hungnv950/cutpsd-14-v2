var watchesApp = angular.module('deniApp', ['ngCookies']);

watchesApp.controller('newFeedCtrl', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    //loading gif
    $scope.load = angular.element(document.querySelector('#load'));

    $scope.findCatsUrl = "findCategory.php";

    $scope.cats = [];

    if (!angular.isUndefined($cookieStore.get('cats'))) {
        $scope.cats = $cookieStore.get('cats');
    }

    if ($scope.cats.length != 0) {
        $scope.findCatsUrl += "?_id=" + JSON.stringify($scope.cats);
    }

    $scope.show = [];

    getCats($scope.findCatsUrl);

    $scope.keyCat = null;
    $scope.keySub = null;

    $scope.newfeed_starten_btn = function () {
        if ($scope.keySub !== null) {
            $cookieStore.put('keySub', $scope.keySub);
        }

        $cookieStore.put('keyCat', $scope.cats[$scope.keyCat]);
        window.location.replace("newfeed_4.html");
    };

    function getCats(url) {
        $http({
            method: 'GET',
            url: url
        }).success(function (data) {
            $scope.show = data;
            $scope.load.css('display', 'none');

        }).error(function (data, status, headers, config) {
        });
    }

    $scope.subs = [];
    $scope.temp = [];

    $scope.checkClick = function (keyCat, keySub) {

        var myButtonClasses = document.getElementById("sub_" + keyCat + "_" + keySub).classList;

        var temp = keyCat + "_" + keySub;

        if ($scope.temp.indexOf(temp) === -1) {
            $scope.temp.push(temp);
            $scope.subs.push({
                "keyCat": $scope.cats[keyCat],
                "keySub": keySub
            });
            myButtonClasses.add("cate-active");
        }
        else {
            var index = $scope.temp.indexOf(temp);
            if (index > -1) {
                $scope.subs.splice(index, 1);
                $scope.temp.splice(index, 1);
            }

            myButtonClasses.remove("cate-active");
        }

    };

    $scope.newfeed_starten_btn = function () {
        if ($scope.subs.length !== 0) {
            $cookieStore.put('subs', $scope.subs);
        }
        else {
            $cookieStore.remove('subs');
        }

        window.location.replace("sass_newfeed_4.html");
    };

    $scope.back = function () {
        window.location.replace("sass_newfeed_2.html");
    };

}]);