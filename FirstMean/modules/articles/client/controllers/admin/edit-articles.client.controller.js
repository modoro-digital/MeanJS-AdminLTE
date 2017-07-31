(function () {
  'use strict';

  angular
    .module('articles.admin')
    .controller('EditArticlesAdminController', EditArticlesAdminController);

  EditArticlesAdminController.$inject = ['$scope','$sce', '$state', '$window', 'articleResolve', 'Authentication', 'Notification'];

  function EditArticlesAdminController($scope, $sce, $state, $window, article, Authentication, Notification) {
    var vm = this;

    vm.inline = false;
    vm.x = {};
    vm.html = "";
    vm.article = article;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.deliberatelyTrustDangerousSnippet = function() {
      return $sce.trustAsHtml(vm.article.content);
    }
    vm.options = {
      language: 'en',
      extraPlugins: 'colorbutton,colordialog,image2',
      filebrowserUploadUrl: '/api/users/upload',
      toolbarGroups: [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard', groups: [ 'undo', 'clipboard' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'colors', groups: [ 'colors' ] }
      ],
      removeButtons: 'Underline,Subscript,Superscript,Cut,Copy,Paste,PasteText,PasteFromWord,About,Outdent,Indent,Source'
    };
    vm.editor = function () {
      
      vm.inline = true;
      vm.x = $window.CKEDITOR.replace( 'editor2', {
        extraPlugins: vm.options.extraPlugins,
        filebrowserUploadUrl: vm.options.filebrowserUploadUrl,
        toolbarGroups: vm.options.toolbarGroups,
        removeButtons: vm.options.removeButtons,
        height: 310,
      });
      vm.html = vm.x.getData();
    }
    vm.close = function () {
      vm.x.setData(vm.html, {
        callback: function() {
            vm.x.destroy();
        }
      });
      vm.html = "";
      vm.inline = false;
    }
    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove(function() {
          $state.go('admin.articles.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article deleted successfully!' });
        });
      }
    }

    // Save Article
    function save() {

      // Create a new article, or update the current instance
      vm.article.content = vm.x.getData();
      vm.article.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        vm.x.destroy();
        $state.go('admin.articles.list'); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Article save error!' });
      }
    }
  }
}());
