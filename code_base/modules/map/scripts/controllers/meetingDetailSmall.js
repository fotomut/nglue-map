'use strict';

angular.module('mapModule')
  .controller('MeetingDetailSmallCtrl', ['$scope', function ($scope) {
    if (angular.isDefined($scope.currentMeeting)) {
      $scope.meeting = $scope.currentMeeting;
    }
  }]);