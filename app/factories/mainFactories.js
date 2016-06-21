app.service('dataService', function ($http, $q) {
    var loggedUserEmail = '';
    var baseEventsUrl = 'http://localhost:3000/events';

    function getLoggedUserEmail(){
        return loggedUserEmail;
    }
    function setLoggedUserEmail(mail) {
        loggedUserEmail = mail;
    }
    function getAllEvents() {
        var request = $http({
            method: "get",
            url: "baseEventsUrl + '/all'"
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function getAllEvents() {
        var request = $http({
            method: "get",
            url: "baseEventsUrl + '/last'"
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function createEvent( eventObj ) {
        var request = $http({
            method: "post",
            url: baseEventsUrl,
            data: eventObj
        });
        return( request.then( handleSuccess, handleError ) );
    }
    return({
        createEvent: createEvent,
        setLoggedUserEmail: setLoggedUserEmail,
        getLoggedUserEmail: getLoggedUserEmail
    });
    function handleError( response ) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
        ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {
        return( response.data );
    }
});

/**
 * Created by D Musev on 6/21/2016.
 */
