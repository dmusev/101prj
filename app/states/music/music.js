/**
 * Created by dimitar.musev on 4/19/2016.
 */
'use strict';

app.controller('musicCtrl', ['$scope', function($scope) {
    $scope.songs = [
        {
            id: 'one',
            title: 'Nothing Else Matters',
            artist: 'Metalica',
            path: 'components/themeComponents/mp3/Metallica - Nothing Else Matters.mp3'
        },
        {
            id: 'two',
            title: 'Wind Of Change',
            artist: 'Scorpions',
            path: 'components/themeComponents/mp3/Scorpions - Wind of Change.mp3'
        }
    ];
}]);
