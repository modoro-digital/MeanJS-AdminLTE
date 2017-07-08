(function () {
  'use strict';

  describe('Mrdevnets Route Tests', function () {
    // Initialize global variables
    var $scope,
      MrdevnetsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _MrdevnetsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      MrdevnetsService = _MrdevnetsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('mrdevnets');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/mrdevnets');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          MrdevnetsController,
          mockMrdevnet;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('mrdevnets.view');
          $templateCache.put('modules/mrdevnets/client/views/view-mrdevnet.client.view.html', '');

          // create mock Mrdevnet
          mockMrdevnet = new MrdevnetsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Mrdevnet Name'
          });

          // Initialize Controller
          MrdevnetsController = $controller('MrdevnetsController as vm', {
            $scope: $scope,
            mrdevnetResolve: mockMrdevnet
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:mrdevnetId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.mrdevnetResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            mrdevnetId: 1
          })).toEqual('/mrdevnets/1');
        }));

        it('should attach an Mrdevnet to the controller scope', function () {
          expect($scope.vm.mrdevnet._id).toBe(mockMrdevnet._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/mrdevnets/client/views/view-mrdevnet.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          MrdevnetsController,
          mockMrdevnet;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('mrdevnets.create');
          $templateCache.put('modules/mrdevnets/client/views/form-mrdevnet.client.view.html', '');

          // create mock Mrdevnet
          mockMrdevnet = new MrdevnetsService();

          // Initialize Controller
          MrdevnetsController = $controller('MrdevnetsController as vm', {
            $scope: $scope,
            mrdevnetResolve: mockMrdevnet
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.mrdevnetResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/mrdevnets/create');
        }));

        it('should attach an Mrdevnet to the controller scope', function () {
          expect($scope.vm.mrdevnet._id).toBe(mockMrdevnet._id);
          expect($scope.vm.mrdevnet._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/mrdevnets/client/views/form-mrdevnet.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          MrdevnetsController,
          mockMrdevnet;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('mrdevnets.edit');
          $templateCache.put('modules/mrdevnets/client/views/form-mrdevnet.client.view.html', '');

          // create mock Mrdevnet
          mockMrdevnet = new MrdevnetsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Mrdevnet Name'
          });

          // Initialize Controller
          MrdevnetsController = $controller('MrdevnetsController as vm', {
            $scope: $scope,
            mrdevnetResolve: mockMrdevnet
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:mrdevnetId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.mrdevnetResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            mrdevnetId: 1
          })).toEqual('/mrdevnets/1/edit');
        }));

        it('should attach an Mrdevnet to the controller scope', function () {
          expect($scope.vm.mrdevnet._id).toBe(mockMrdevnet._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/mrdevnets/client/views/form-mrdevnet.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
