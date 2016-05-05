/**
 * Created by dimitar.musev on 4/26/2016.
 */
'use strict';

app.controller('videosCtrl', ['$scope', '$sce', function($scope, $sce) {
    $scope.userVideos = [
        {
            link: $sce.trustAsResourceUrl('https://www.youtube.com/embed/b2AcxL88DoI')
        },
        {
            link: $sce.trustAsResourceUrl('https://www.youtube.com/embed/fB63ztKnGvo')
        },
        {
            link: $sce.trustAsResourceUrl('https://www.youtube.com/embed/nCkpzqqog4k')
        }
    ];
}]);