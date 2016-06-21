/**
 * Created by D Musev on 6/20/2016.
 */
'use strict';

app.controller( 'LoginCtrl', function ( $scope, auth, store, $location, dataService) {

    $scope.auth = auth;

    if(!auth.isAuthenticated){
        $scope.auth.signin();
    }

    $scope.logout = function() {
        dataService.setLoggedUserEmail("");
        auth.signout();
        store.remove('profile');
        store.remove('token');
        $location.path('/login');
        $rootScope.authenticated = false;
    };

});