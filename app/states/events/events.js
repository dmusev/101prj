/**
 * Created by dimitar.musev on 4/26/2016.
 */
'use strict';

app.controller('eventCtrl',  function($scope, dataService) {

    $scope.test = [
        {
            "id": 1,
            "title": "My Glorious event",
            "description": "Presenting our project",
            "eventDate": "2016-08-07T12:15:00.000Z",
            "location": "FMI",
            "creationDate": "2016-06-16T14:06:40.000Z",
            "createdBy": 1,
            "posterUrl": "https://www.fmi.uni-sofia.bg/en/FMI.jpg"
        },
        {
            "id": 2,
            "title": "My second title",
            "description": "No description",
            "eventDate": "2016-08-07T12:15:00.000Z",
            "location": "Varna",
            "creationDate": "2016-06-16T13:57:30.000Z",
            "createdBy": 1,
            "posterUrl": "localhost/mypics"
        },
        {
            "id": 3,
            "title": "My title",
            "description": "This is for test pdsdsdurposes and it has to be a little bit longer.",
            "eventDate": "2016-06-16T14:06:00.000Z",
            "location": "Sofia, bul.Bulgaria",
            "creationDate": null,
            "createdBy": 1,
            "posterUrl": "https://i.ytimg.com/vi/C2O7lM0bU0g/maxresdefault.jpg"
        },
        {
            "id": 4,
            "title": "Our fifth Event",
            "description": "This is for test purposes and it has to be a little bit longer.",
            "eventDate": "2016-06-16T14:00:00.000Z",
            "location": "Sofia",
            "creationDate": "2016-06-17T11:14:04.000Z",
            "createdBy": 1,
            "posterUrl": "https://i.ytimg.com/vi/C2O7lM0bU0g/maxresdefault.jpg"
        }
    ];

    $scope.newEvent = {
        title:'',
        description: '',
        eventDate: '',
        location: '',
        createdBy: '',
        posterURL: ''
    };

    $scope.createEvent = function () {
        dataService.createEvent( $scope.newEvent )
            .then(
                function () {
                    console.log("ASDAS")
                },
                function( errorMessage ) {
                    console.warn( errorMessage );
                }
            )
        ;
        // Reset the form once values have been consumed.
        $scope.newEvent  = "";
    }


});