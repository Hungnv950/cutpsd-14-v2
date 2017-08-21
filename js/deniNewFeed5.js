var watchesApp = angular.module('deniApp', ['ngCookies']);

watchesApp.controller('newFeed5', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    $scope.preArticles = null;

    $scope.presUrl = "find.php?_id=";

    function getPres(url) {
        var keyCat = $cookieStore.get('keyCat');
        var keySub = $cookieStore.get('keySub');
        var keyPre = $cookieStore.get('keyPre');
        $http({
            method: 'GET',
            url: url + keyCat
        }).success(function (data) {
            $scope.preArticles = data['sub_category'][keySub]['pre_articles'][keyPre];
        }).error(function (data, status, headers, config) {
        });
    }

    getPres($scope.presUrl);

    $scope.saveToNewFeed6 = function (keyArt) {
        $cookieStore.put('keyArt', keyArt);
        window.location.replace("newfeed_6.html");
    };

    $scope.back_to_newfeed_4 = function () {
        window.location.replace("newfeed_4.html");
    };


}]);