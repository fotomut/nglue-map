'use strict';

angular.module('meetingsApp')
  .factory('pagedListModuleInterface', ['eventService', 'meetingCache', function(eventService, meetingCache) {

    var serviceAPI = {};

    serviceAPI = angular.extend(serviceAPI, {
      addListenerToItems: function(loadingFunction) {
        eventService.registerRootEventHandler(eventService.dataCacheRefreshedEvent, loadingFunction);
      },
      getItems: function(callingFunction) {
        return meetingCache.getMeetingsFromCache(callingFunction+' --> (app)pagedListModuleInterface');
      },

      getPartialUrl: function() {
        return '../../assets/views/meetingDetailSmall.html';
      },
      getPartialController: function(scope) {
        return ['$scope', function($scope) {
          if (angular.isDefined($scope.currentMeeting)) {
            $scope.meeting = $scope.currentMeeting;
          }
        }];
      }
    });
    return serviceAPI;
  }]);


