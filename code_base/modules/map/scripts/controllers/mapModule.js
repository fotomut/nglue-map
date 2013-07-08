'use strict';
/* global moduleInterface */

angular.module('mapModule')
  .controller('MapModuleController', ['$scope', '$http', '$rootScope', 'mapModuleInterface', function($scope, $http, $rootScope, mapModuleInterface) {


//    $rootScope.useMobileHeaderFooter = browserDetection.isMobile();



    $scope.meetings = [];
    var loadMarkerData = function() {
      // load latest filtered meetings from cache
      var meetingsList = mapModuleInterface.getMarkerData('MapModuleController.loadMarkerData');
      // clear markers
      angular.forEach($scope.meetings, function(meeting) {
        meeting.marker.setMap(null);
      });
      console.log('mapModule.loadMarkerData', meetingsList.length);

      angular.forEach(meetingsList, function(meeting) {
        var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(meeting.location.center.latitude, meeting.location.center.longitude),
          icon: {
            url: 'assets/images/' + meeting.fellowship.abbrevName + 'pin' + (meeting.schedule.isSoon?'-soon':'') + '.png'
          },
          shadow: {
            url: 'assets/images/' + meeting.fellowship.abbrevName + 'pin-shadow.png'
          }
        });
        angular.extend(meeting, { marker: marker });
      });
//      setMapCenter();

      $scope.meetings = meetingsList;

    };

    $scope.openMarkerInfo = function(meeting) {
      $scope.currentMeeting = meeting;
      $scope.myInfoWindow.open($scope.map, meeting.marker, meeting);
    };






    $scope.mapOptions = mapModuleInterface.getDefaultMapOptions();

    var setCurrentLocationMarker = function(latLng) {
      if (angular.isDefined($scope.currentLocationMarker)) {
        // delete old location
        $scope.currentLocationMarker.setMap(null);
        $scope.currentLocationMarker = null;
      }
      $scope.currentLocationMarker = new google.maps.Marker({
        map: $scope.map,
        position: latLng,
        icon: 'http://www.google.com/mapfiles/marker.png',
        shadow: 'http://www.google.com/mapfiles/shadow50.png'
      });
    };

    var waitingForMapBounds = false;

    var setMapCenter = function() {
      if (angular.isDefined(mapModuleInterface.getCurrentLocationLatLng())) {
        waitingForMapBounds = true;
        $scope.map.setCenter(mapModuleInterface.getCurrentLocationLatLng());
        setCurrentLocationMarker(mapModuleInterface.getCurrentLocationLatLng());
      }
    };

    $scope.updateMapBounds = function() {
//      console.log('update map bounds');
      mapModuleInterface.setMapBounds($scope.map.getBounds());
      if (waitingForMapBounds) {
        loadMarkerData();
        waitingForMapBounds = false;
      }
    };


    $scope.$watch('map', function() {
      if (angular.isDefined($scope.map)) {
        console.log('map ready');
        mapModuleInterface.addListenerToLoadMarkerData(loadMarkerData);
        mapModuleInterface.addListenerToChangeCurrentLocation(setMapCenter);

        $http.get('assets/styles/mapStyle.json')
          .success(function(data, status) {
            $scope.map.setOptions({styles: data});
          })
          .error(function(data,status) {
            // TODO: error handling
            console.error('http mapStyle FAILURE', data, status);
          });
      }
    });




  }]);
