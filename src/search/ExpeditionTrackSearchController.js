'use strict';


var ExpeditionTrackSearchController = function ($scope, $location, $controller, $filter, ExpeditionTrack, npdcAppConfig,  NpdcSearchService, NpolarTranslate) {
  'ngInject';

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = ExpeditionTrack;

 npdcAppConfig.search.local.results.detail = (entry) => {
     let updatedText = NpolarTranslate.translate('updated');
    // let r = (entry.platform).charAt(0).toUpperCase() +  (entry.platform).slice(1) + ", "+ updatedText +":";
     return updatedText + ` ${(entry.updated.split('T')[0])}`;
 };

  npdcAppConfig.cardTitle = "Expedition Track Archive";
  npdcAppConfig.search.local.results.subtitle = "platform";
  npdcAppConfig.search.local.results.title = "code";

  let query = function() {
    let defaults = {
      limit: "50",
      sort: "-updated,code",
      fields: 'code,expedition,platform,object,updated,measured',
      facets: 'code'};

    let invariants = $scope.security.isAuthenticated() ? {} : {} ;
    return Object.assign({}, defaults, invariants);
  };

  $scope.search(query());

  $scope.$on('$locationChangeSuccess', (event, data) => {
    $scope.search(query());
  });

};

module.exports = ExpeditionTrackSearchController;
