'use strict';

angular.module('meetingsApp')
  .factory('eventService', ['$rootScope', function($rootScope) {
    var serviceAPI = {
      dataCacheRefreshedEvent: 'eventService__dataCacheRefreshed',
      currentLocationChangedEvent: 'eventService_currentLocationChanged',
      filterChangedEvent: 'eventService_filterChanged',
      locationFilterChangedEvent: 'eventService_locationFilterChanged',
      meetingSearchClickedEvent: 'eventService_meetingSearchClicked'
    };

    return angular.extend(serviceAPI, {
      broadcastRootEvent: function(eventname, args) {
        $rootScope.$broadcast(eventname, args);
      },
      broadcastEvent: function(scope, eventname, args) {
        scope.$broadcast(eventname, args);
      },
      registerEventHandler: function(scope, eventname, listener) {
        scope.$on(eventname, listener);
      },
      registerRootEventHandler: function(eventname, listener) {
        $rootScope.$on(eventname, listener);
      }
    });
  }]);

