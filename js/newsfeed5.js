var newsFeedApp = angular.module('newsFeedApp', ['ngCookies']);

newsFeedApp.controller('newsfeed5Ctrl', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    //loading gif
    $scope.load = angular.element(document.querySelector('#load'));

    $scope.articles = [];

    $scope.findArtsUrl = "findArticleSelect.php";

    function getSubSelect(url) {
        var subSelect = $cookieStore.get('subSelect');

        $http({
            method: 'GET',
            url: url + "?_id=[" + JSON.stringify(subSelect['keyCat'])+"]" + "&position=" + subSelect['keySub']
        }).success(function (data) {
            $scope.articles = data;

            Load();
        }).error(function (data, status, headers, config) {
        });
    }

    getSubSelect($scope.findArtsUrl);

    $scope.seeArticle = function (_id) {
        $cookieStore.put('seeArticle', _id);
        window.location.replace("sass_newfeed_6.html");
    };

    $scope.back = function () {
        window.location.replace("sass_newfeed_4.html");
    };

    function Load() {

        var countUp = function () {
            $scope.load.css('display', 'none');
            $timeout(countUp, 1000);
        };

        $timeout(countUp, 1000);
    }

}]);