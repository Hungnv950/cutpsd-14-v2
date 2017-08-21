var watchesApp = angular.module('deniApp', ['ngCookies']);

watchesApp.controller('newFeed6', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    $scope.article = null;

    $scope.presUrl = "find.php?_id=";

    function getPres(url) {
        var keyCat = $cookieStore.get('keyCat');
        var keySub = $cookieStore.get('keySub');
        var keyPre = $cookieStore.get('keyPre');
        var keyArt = $cookieStore.get('keyArt');
        $http({
            method: 'GET',
            url: url + keyCat
        }).success(function (data) {
            $scope.article = data['sub_category'][keySub]['pre_articles'][keyPre]['articles'][keyArt];
        }).error(function (data, status, headers, config) {
        });
    }

    getPres($scope.presUrl);

}]);