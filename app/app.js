'use strict';

var app = angular.module('myApp', [
    'auth0','angular-storage', 'angular-jwt', 'ngRoute', 'jkuri.gallery'
]).

//Auth0 configuration
config( function myAppConfig ( $routeProvider, authProvider, $httpProvider, $locationProvider,
                                   jwtInterceptorProvider) {

  $routeProvider.otherwise({redirectTo: '/home'});

  $routeProvider.when('/home', {
    templateUrl: 'states/home/home.html',
    controller: 'homeCtrl'
  });
  $routeProvider.when('/JBox', {
    templateUrl: 'states/JBox/JBox.html',
    controller: 'mediaCtrl'
  });
  $routeProvider.when('/videos', {
    templateUrl: 'states/videos/videos.html',
    controller: 'videosCtrl'
  });
  $routeProvider.when('/events', {
    templateUrl: 'states/events/events.html',
    controller: 'eventCtrl',
  });
  $routeProvider.when('/photos', {
    templateUrl: 'states/photos/photos.html',
    controller: 'photosCtrl',
  });
  $routeProvider.when( '/login', {
    controller: 'LoginCtrl',
    template: '',
    pageTitle: 'Login'
  });
  $routeProvider.when( '/logout', {
    controller: 'LoginCtrl',
    template: '',
    pageTitle: 'Logout'
  });

  authProvider.init({
    domain: 'dmusev.eu.auth0.com',
    clientID: 'HsEJT1uaPYST6xE6K1AWjyMHc3IB6Tk5',
    loginUrl: '/home'
  });

  //Called when login is successful
  authProvider.on('loginSuccess', function($location, profilePromise, idToken, store, auth, $rootScope, dataService) {
    console.log("Login Success");
    profilePromise.then(function(profile) {
      console.log(profile['email']);
      dataService.setLoggedUserEmail(profile['email']);
      store.set('profile', profile);
      store.set('token', idToken);
    });
    //console.log(auth.isAuthenticated)
    $rootScope.authenticated = true;
    $location.path('/JBox');
  });

  //Called when login fails
  authProvider.on('loginFailure', function() {
    console.log("Error logging in");
    $rootScope.authenticated = false;
    $location.path('/login');
  });

  //Angular HTTP Interceptor function
  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');
  }
  //Push interceptor function to $httpProvider's interceptors
  $httpProvider.interceptors.push('jwtInterceptor');

}).

//Youtube Configurations
config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://https://www.youtube.com/**']);
}).
run(function(auth) {
  // This hooks all auth events to check everything as soon as the app starts
  auth.hookEvents();
}).
run(function () {
  var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}).
config( function ($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}).service('VideosService', ['$window', '$rootScope', '$log', function ($window, $rootScope, $log) {

  var service = this;

  var youtube = {
    ready: false,
    player: null,
    playerId: null,
    videoId: null,
    videoTitle: null,
    playerHeight: '480',
    playerWidth: '640',
    state: 'stopped'
  };
  var results = [];
  var upcoming = [
    {id: 'kRJuY6ZDLPo', title: 'La Roux - In for the Kill (Twelves Remix)'},
    {id: '45YSGFctLws', title: 'Shout Out Louds - Illusions'},
    {id: 'ktoaj1IpTbw', title: 'CHVRCHES - Gun'},
    {id: '8Zh0tY2NfLs', title: 'N.E.R.D. ft. Nelly Furtado - Hot N\' Fun (Boys Noize Remix) HQ'},
    {id: 'zwJPcRtbzDk', title: 'Daft Punk - Human After All (SebastiAn Remix)'},
    {id: 'sEwM6ERq0gc', title: 'HAIM - Forever (Official Music Video)'},
    {id: 'fTK4XTvZWmk', title: 'Housse De Racket â˜â˜€â˜ Apocalypso'}
  ];
  var history = [
    {id: '45YSGFctLws', title: 'Shout Out Louds - Illusions'},
    {id: 'XKa7Ywiv734', title: '[OFFICIAL HD] Daft Punk - Give Life Back To Music (feat. Nile Rodgers)'}
  ];

  $window.onYouTubeIframeAPIReady = function () {
    $log.info('Youtube API is ready');
    youtube.ready = true;
    service.bindPlayer('placeholder');
    service.loadPlayer();
    $rootScope.$apply();
  };

  function onYoutubeReady (event) {
    $log.info('YouTube Player is ready');
    youtube.player.cueVideoById(history[0].id);
    youtube.videoId = history[0].id;
    youtube.videoTitle = history[0].title;
  }

  function onYoutubeStateChange (event) {
    if (event.data == YT.PlayerState.PLAYING) {
      youtube.state = 'playing';
    } else if (event.data == YT.PlayerState.PAUSED) {
      youtube.state = 'paused';
    } else if (event.data == YT.PlayerState.ENDED) {
      youtube.state = 'ended';
      service.launchPlayer(upcoming[0].id, upcoming[0].title);
      service.archiveVideo(upcoming[0].id, upcoming[0].title);
      service.deleteVideo(upcoming, upcoming[0].id);
    }
    $rootScope.$apply();
  }

  this.bindPlayer = function (elementId) {
    $log.info('Binding to ' + elementId);
    youtube.playerId = elementId;
  };

  this.createPlayer = function () {
    $log.info('Creating a new Youtube player for DOM id ' + youtube.playerId + ' and video ' + youtube.videoId);
    return new YT.Player(youtube.playerId, {
      height: youtube.playerHeight,
      width: youtube.playerWidth,
      playerVars: {
        rel: 0,
        showinfo: 0
      },
      events: {
        'onReady': onYoutubeReady,
        'onStateChange': onYoutubeStateChange
      }
    });
  };

  this.loadPlayer = function () {
    if (youtube.ready && youtube.playerId) {
      if (youtube.player) {
        youtube.player.destroy();
      }
      youtube.player = service.createPlayer();
    }
  };

  this.launchPlayer = function (id, title) {
    youtube.player.loadVideoById(id);
    youtube.videoId = id;
    youtube.videoTitle = title;
    return youtube;
  }

  this.listResults = function (data) {
    results.length = 0;
    for (var i = data.items.length - 1; i >= 0; i--) {
      results.push({
        id: data.items[i].id.videoId,
        title: data.items[i].snippet.title,
        description: data.items[i].snippet.description,
        thumbnail: data.items[i].snippet.thumbnails.default.url,
        author: data.items[i].snippet.channelTitle
      });
    }
    return results;
  }

  this.queueVideo = function (id, title) {
    upcoming.push({
      id: id,
      title: title
    });
    return upcoming;
  };

  this.archiveVideo = function (id, title) {
    history.unshift({
      id: id,
      title: title
    });
    return history;
  };

  this.deleteHistoryVideo = function (id) {
    for (var i = history.length - 1; i >= 0; i--) {
      if (history[i].id === id) {
        history.splice(i, 1);
        break;
      }
    }
  };


  this.deleteUpcomingVideo = function (id) {
    for (var i = upcoming.length - 1; i >= 0; i--) {
      if (upcoming[i].id === id) {
        upcoming.splice(i, 1);
        console.log(upcoming);
        break;
      }
    }
  };
  this.getYoutube = function () {
    return youtube;
  };

  this.getResults = function () {
    return results;
  };

  this.getUpcoming = function () {
    return upcoming;
  };

  this.getHistory = function () {
    return history;
  };

}]);

// .
//     //In case of page refresh
// run(function($rootScope, auth, store, jwtHelper, $location) {
//   $rootScope.$on('$locationChangeStart', function() {
//
//     var token = store.get('token');
//     if (token) {
//       if (!jwtHelper.isTokenExpired(token)) {
//         if (!auth.isAuthenticated) {
//           //Re-authenticate user if token is valid
//           auth.authenticate(store.get('profile'), token);
//           $rootScope.authenticated = false;
//         }
//       } else {
//         $rootScope.authenticated = false;
//         // Either show the login page or use the refresh token to get a new idToken
//         $location.path('/login');
//       }
//     }
//   });
// });