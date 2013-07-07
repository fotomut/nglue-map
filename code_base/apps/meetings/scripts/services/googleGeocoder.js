'use strict';

angular.module('meetingsApp')
  .factory('googleGeocoder', ['$q', '$rootScope', function($q, $rootScope) {

    var geocoder = new google.maps.Geocoder();

    return {
      geocode: function(address) {
        var deferred = $q.defer();
        var request = {
          address: address
        };

        geocoder.geocode(request, function(results, status) {
          $rootScope.$apply(function() {
            console.log('geocode response', status, results);
            if (status === google.maps.GeocoderStatus.OK) {
              console.log('geocode1')
              deferred.resolve(results);
            } else {
              console.log('geocode2')
              deferred.reject(status);
            }
          });
        });

        return deferred.promise;
      }
    };
  }]);
