'use strict';


var ExpeditionTrackShowController = function($controller, $routeParams,
  $scope, $q, ExpeditionTrack, npdcAppConfig) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = ExpeditionTrack;



  let show = function() {

    $scope.show().$promise.then((seabirdColony) => {
      if ((seabirdColony.geometry)&&(seabirdColony.geometry.geometries)) {
         $scope.polygon = seabirdColony.geometry;
      }  //else undefined


    });

  };

  show();

};


module.exports = ExpeditionTrackShowController;
