//= require jquery
//= require jquery_ujs
//= require_tree .

angular.module('AngularDeviseExample', ['ngRoute', 'sessionService'])
  .config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

        var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
            function success(response) {
                return response
            };

            function error(response) {
                if (response.status == 401) {
                    $rootScope.$broadcast('event:unauthorized');
                    $location.path('/users/login');
                    return response;
                };
                return $q.reject(response);
            };

            return function(promise) {
                return promise.then(success, error);
            };
        }];
        $httpProvider.responseInterceptors.push(interceptor);
  }])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {templateUrl:'/tmpl/home/index.html'})
      // .when('/record', {templateUrl:'/record/index.html', controller:RecordCtrl})
      .when('/users/login', {templateUrl:'/tmpl/users/login.html', controller:UsersCtrl})
      .when('/users/register', {templateUrl:'/tmpl/users/register.html', controller:UsersCtrl}); 
  }]);
