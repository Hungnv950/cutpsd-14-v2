var watchesApp = angular.module('newsFeedApp', ['ngCookies']);

watchesApp.controller('newsfeed6Ctrl', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    $scope.article = null;

    $scope.findArtsUrl = "findArticle.php";

    function getArticle(url) {
        var seeArticle = $cookieStore.get('seeArticle');
        $http({
            method: 'GET',
            url: url + "?_id=[" + JSON.stringify(seeArticle) + "]"
        }).success(function (data) {
            $scope.article = data[0];
        }).error(function (data, status, headers, config) {
        });
    }

    getArticle($scope.findArtsUrl);

    $scope.saveToNewFeed6 = function (keyArt) {
        $cookieStore.put('keyArt', keyArt);
        window.location.replace("newfeed_6.html");
    };

    $scope.back = function () {
        window.location.replace("sass_newfeed_5.html");
    };


}]);