var watchesApp = angular.module('deniApp', ['ngCookies']);

watchesApp.controller('newFeed4', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    $scope.presUrl = "find.php?_id=";

    $scope.show = [];

    function getPres(url) {
        var keyCat = $cookieStore.get('keyCat');
        var keySub = $cookieStore.get('keySub');
        $http({
            method: 'GET',
            url: url + keyCat
        }).success(function (data) {
            $scope.show = data['sub_category'][keySub];

        }).error(function (data, status, headers, config) {
        });
    }

    getPres($scope.presUrl);

    function getRandomColor() {
        var length = 6;
        var chars = '0123456789ABCDEF';
        var hex = '#';
        while (length--) hex += chars[(Math.random() * 16) | 0];
        return hex;
    }

    $scope.randomColorIcon = function () {
        return {'background-color': getRandomColor};
    };

    $scope.back_to_newfeed3 = function () {
        window.location.replace("newfeed_3.html");
    };

    $scope.savePreArticles = function (keyPre) {
        $cookieStore.put('keyPre', keyPre);
        window.location.replace("newfeed_5.html");
    };
}]);