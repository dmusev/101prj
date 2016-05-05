'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});

  $routeProvider.when('/home', {
    templateUrl: 'states/home/home.html',
    controller: 'homeCtrl'
  });
  $routeProvider.when('/music', {
    templateUrl: 'states/music/music.html',
    controller: 'musicCtrl'
  });
  $routeProvider.when('/videos', {
    templateUrl: 'states/videos/videos.html',
    controller: 'videosCtrl'
  });
  $routeProvider.when('/events', {
    templateUrl: 'states/events/events.html',
    controller: 'eventCtrl'
  });
}]).
config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://https://www.youtube.com/**']);
}).
directive('navBar', function($location) {
  return {
    restrict: 'AE',
    templateUrl: 'html/navbar/navHtml.html',
    link: function (scope) {
      console.log("test nav bar");
      scope.pass = "";
      scope.userEmail = "";
      scope.validateForm = function () {
        if(scope.pass === "123" && scope.userEmail === "abv@abv.bg"){
          console.log(scope.pass + " " + scope.userEmail);
          console.log("success!");
          $location.path("/music");
          $("#loginId").addClass("hideButton");
          $("#logoutId").removeClass("hideButton");
        }
      }
      scope.logout = function(){
        $("#logoutId").addClass("hideButton");
        $("#loginId").removeClass("hideButton");
      }
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