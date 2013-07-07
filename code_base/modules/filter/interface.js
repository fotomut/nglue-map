'use strict';

angular.module('filterModule')
  .factory('filterModuleInterface', ['$rootScope', function($rootScope) {

    var serviceAPI = {
    };

    serviceAPI = angular.extend(serviceAPI, {
      searchButtonClicked: function() {
        console.log('local interface: filterModuleInterface.searchButtonClicked()');
      }
    });

    return serviceAPI;
  }]);