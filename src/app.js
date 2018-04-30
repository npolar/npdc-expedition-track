'use strict';
var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');

var npdcExpeditionTrackApp = angular.module('npdcExpeditionTrackApp', ['npdcCommon']);

npdcExpeditionTrackApp.controller('ExpeditionTrackShowController', require('./show/ExpeditionTrackShowController'));
npdcExpeditionTrackApp.controller('ExpeditionTrackSearchController', require('./search/ExpeditionTrackSearchController'));
npdcExpeditionTrackApp.directive('leafletMap', require('./show/leafletMap'));


// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/', 'resource': 'NpolarApi'},
  {'path': '/user', 'resource': 'User'},
  {'path': '/expedition-track/', 'resource': 'ExpeditionTrack'}
];

resources.forEach(service => {
  // Expressive DI syntax is needed here
  npdcExpeditionTrackApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
  return NpolarApiResource.resource(service);
  }]);
});

// Routing
npdcExpeditionTrackApp.config(require('./router'));

npdcExpeditionTrackApp.config(($httpProvider, npolarApiConfig) => {
  var autoconfig = new AutoConfig("production");

  angular.extend(npolarApiConfig, autoconfig, { resources });
  console.debug("npolarApiConfig", npolarApiConfig);

  $httpProvider.interceptors.push('npolarApiInterceptor');
});

npdcExpeditionTrackApp.run(($http, npdcAppConfig, NpolarTranslate, NpolarLang) => {
  NpolarTranslate.loadBundles('npdc-expedition-track');
  npdcAppConfig.toolbarTitle = 'Expedition track database';
});
