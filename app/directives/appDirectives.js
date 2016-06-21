/**
 * Created by D Musev on 6/20/2016.
 */

'use strict';

app.
directive('navBar', function($location) {
    return {
        restrict: 'AE',
        templateUrl: 'html/navbar/navHtml.html',
        controller:  function () {
        }
    };
}).
directive('recentVideos',['$sce', function($sce) {
    return {
        restrict: 'AE',
        templateUrl: 'html/recentVideos/recentVideos.html',
        link: function (scope) {
            scope.recentVideos = [
                {
                    link: $sce.trustAsResourceUrl('https://www.youtube.com/embed/v2AC41dglnM')
                },
                {
                    link: $sce.trustAsResourceUrl('https://www.youtube.com/embed/pAgnJDJN4VA')
                },
                {
                    link: $sce.trustAsResourceUrl('https://www.youtube.com/embed/gEPmA3USJdI')
                },
                {
                    link: $sce.trustAsResourceUrl('https://www.youtube.com/embed/bbEoRnaOIbs')
                },
                {
                    link: $sce.trustAsResourceUrl('https://www.youtube.com/embed/93ASUImTedo')
                },
                {
                    link: $sce.trustAsResourceUrl('https://www.youtube.com/embed/t4H_Zoh7G5A')
                }
            ]
            console.log("test rec vid");
        }
    };
}]);