app.controller("mainController", function($scope, $http){

    $scope.apiKey = "426e1c5fcd62e42599b3c1494052ea1e";
    $scope.results = [];
    $scope.init = function() {
        //Trakt API requires requires a start date
        var today = new Date();

        //Create the date string and ensure leading zeros if they are required
        var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);

        $http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 30 + '/?callback=JSON_CALLBACK').success(function(data) {
            //As we are getting our data from an external source, we need to format the data so we can use it to our desired effect
            //For each day, get all the episodes
            angular.forEach(data, function(value, index){
                //The API stores the full date separately from each episode. Save it so we can use it later
                var date = value.date;
                //For each episodes, add it to the results array
                angular.forEach(value.episodes, function(tvshow, index){
                    //Create a date string from the timestamp so we can filter on it based on user text input
                    tvshow.date = date; //Attach the full date to each episode
                    $scope.results.push(tvshow);
                });
            });
        }).error(function(error) {
            console.log(error);
        });

    };

});

