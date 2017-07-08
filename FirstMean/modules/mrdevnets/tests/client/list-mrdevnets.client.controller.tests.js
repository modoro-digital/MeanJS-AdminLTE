(function () {
  'use strict';

  describe('Mrdevnets List Controller Tests', function () {
    // Initialize global variables
    var MrdevnetsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      MrdevnetsService,
      mockMrdevnet;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _MrdevnetsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      MrdevnetsService = _MrdevnetsService_;

      // create mock article
      mockMrdevnet = new MrdevnetsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Mrdevnet Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Mrdevnets List controller.
      MrdevnetsListController = $controller('MrdevnetsListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockMrdevnetList;

      beforeEach(function () {
        mockMrdevnetList = [mockMrdevnet, mockMrdevnet];
      });

      it('should send a GET request and return all Mrdevnets', inject(function (MrdevnetsService) {
        // Set POST response
        $httpBackend.expectGET('api/mrdevnets').respond(mockMrdevnetList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.mrdevnets.length).toEqual(2);
        expect($scope.vm.mrdevnets[0]).toEqual(mockMrdevnet);
        expect($scope.vm.mrdevnets[1]).toEqual(mockMrdevnet);

      }));
    });
  });
}());
