'use strict';

var router = function($routeProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/:id', {
   templateUrl: 'show/show-expedition-track.html',
   controller: 'ExpeditionTrackShowController'
 }).when('/', {
   templateUrl: 'search/search.html',
   controller: 'ExpeditionTrackSearchController',
   reloadOnSearch: false
 });
};

module.exports = router;
