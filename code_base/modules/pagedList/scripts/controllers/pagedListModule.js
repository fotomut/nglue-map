'use strict';

angular.module('pagedListModule')
  .controller('PagedListModuleController', ['$scope', 'pagedListModuleInterface', function ($scope, pagedListModuleInterface) {

    $scope.partialUrl = pagedListModuleInterface.getPartialUrl();
    $scope.partialController = pagedListModuleInterface.getPartialController();

    $scope.items = [];
    var loadItems = function() {
      $scope.items = pagedListModuleInterface.getItems('PagedListModuleController.loadItems');
    };
    pagedListModuleInterface.addListenerToItems(loadItems);


    $scope.currentPage = 0;
    $scope.pageSize = 6;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.items.length/$scope.pageSize);
    };

  }]);
