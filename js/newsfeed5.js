var watchesApp = angular.module('newsFeedApp', ['ngCookies']);

watchesApp.controller('newsfeed5Ctrl', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    $scope.articles = [];

    $scope.findArtsUrl = "findArticleSelect.php";

    function getSubSelect(url) {
        var subSelect = $cookieStore.get('subSelect');
        $http({
            method: 'GET',
            url: url + "?_id=" + subSelect['keyCat']['$oid'] + "&position=" + subSelect['keySub']
        }).success(function (data) {
            $scope.articles = data;
        }).error(function (data, status, headers, config) {
        });
    }

    getSubSelect($scope.findArtsUrl);

    $scope.seeArticle = function (_id) {
        $cookieStore.put('seeArticle', _id);
        window.location.replace("sass_newfeed_6.html");
    }

    $scope.back = function () {
        window.location.replace("sass_newfeed_4.html");
    };

}]);