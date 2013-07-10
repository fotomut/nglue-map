'use strict';

angular.module('filterModule')
  .factory('filterModuleInterface', ['$rootScope', function($rootScope) {

    var serviceAPI = {};

    var defaultCoordinates = new google.maps.LatLng(40.763562, -73.97140100000001);  // NYC
    var locations = {
      geolocation: {
        position: {
          coords: {
            accuracy: 150,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: defaultCoordinates.lat(),
            longitude: defaultCoordinates.lng(),
            speed: null
          },
          timestamp: null
        },
        latLng: defaultCoordinates // new google.maps.LatLng
      },
      manual: {
        input: null,
        geocodedResults: null
      }
    };
    var useGeolocation = 'geolocation';
    var useManual = 'manual';
    var whichLocation = useGeolocation;

    var areGeolocationPositionsEqual = function(a, b) {
      if (a === null && b === null) {
        return true;
      } else if (a === null || b === null) {
        return false;
      } else if (a.coords === null && b.coords === null) {
        return true;
      } else if (a.coords === null || b.coords === null) {
        return false;
      } else {
        return a.coords.latitude === b.coords.latitude
          && a.coords.longitude === b.coords.longitude
          && a.coords.accuracy === b.coords.accuracy;
      }
    };

    serviceAPI = angular.extend(serviceAPI, {
      searchButtonClicked: function() {
        console.log('filterModule interface: filterModuleInterface.searchButtonClicked()');
        // stub: broadcast that search button was clicked
      },
      processLocationFilter: function(newLocationFilter) {
        if (!newLocationFilter.useGeolocation) {
          // geocode customAddress
          var oldInput = locations.manual.input;
          locations.manual.input = newLocationFilter.customAddress;
        } else {
          // use geolocation
        }
      },

      getCurrentLocationLatLng: function() {
        if (whichLocation === useManual) {
          if (locations.manual !== null && locations.manual.geocodedResults !== null && locations.manual.geocodedResults.length > 0) {
            return locations.manual.geocodedResults[0].geometry.location;
          } else {
            return null;
          }
        } else { // useGeolocation
          return locations.geolocation.latLng;
        }
      },

      filterChanged: function() {
        // stub: broadcast event
      },
      locationFilterChanged: function() {
        // stub: broadcast event
      }
    });
    return serviceAPI;
  }]);