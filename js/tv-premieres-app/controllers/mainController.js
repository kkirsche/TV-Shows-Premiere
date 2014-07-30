app.controller("mainController", function($scope, $http){

    $scope.apiKey = "426e1c5fcd62e42599b3c1494052ea1e";
    $scope.init = function() {
        //Trakt API requires requires a start date
        var today = new Date();

        //Create the date string and ensure leading zeros if they are required
        var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);

        $http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 30 + '/?callback=JSON_CALLBACK').success(function(data) {
            console.log(data);
        }).error(function(error) {
            console.log(error);
        });

    };

});

