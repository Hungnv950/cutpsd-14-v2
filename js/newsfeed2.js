var newsFeedApp = angular.module('newsFeedApp', ['ngCookies']);

newsFeedApp.controller('newsFeedCtrl', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    //loading gif
    $scope.load = angular.element(document.querySelector('#load'));

    $scope.newsfeed = null;

    $scope.catsUrl = "getCategory.php";

    function getCats(url) {
        $http({
            method: 'GET',
            url: url
        }).success(function (newsfeed) {
            $scope.newsfeed = newsfeed;

            $scope.load.css('display', 'none');

        }).error(function (newsfeed, status, headers, config) {
        });
    }

    getCats($scope.catsUrl);

    $scope.cats = [];

    $scope.checkClick = function (key, _id) {
        var myButtonClasses = document.getElementById("cat_id_" + key).classList;
        if ($scope.cats.indexOf(_id) === -1) {
            $scope.cats.push(_id);
            myButtonClasses.add("cate-active");
        }
        else {
            var index = $scope.cats.indexOf(_id);
            if (index > -1) {
                $scope.cats.splice(index, 1);
            }
            myButtonClasses.remove("cate-active");
        }

        console.log($scope.cats);
    };

    $scope.checkNext = function () {

        if ($scope.cats.length != 0) {
            $cookieStore.put('cats', $scope.cats);
        }

        window.location.replace("sass_newfeed_3.html");
    };

    $scope.back = function () {
        window.location.replace("sass_newfeed_1.html");
    };
}]);