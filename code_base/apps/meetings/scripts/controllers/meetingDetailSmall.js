'use strict';

angular.module('meetingsApp')
  .controller('MeetingDetailSmallController', ['$scope', function ($scope) {
    if (angular.isDefined($scope.currentMeeting)) {
      $scope.meeting = $scope.currentMeeting;
    }
  }]);