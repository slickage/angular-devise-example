function HomeCtrl($scope, Session) {
  $scope.user = Session.requestCurrentUser();
  $scope.logout = function() {
    Session.logout('/');
  };
}
