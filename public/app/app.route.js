angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider){
	$locationProvider.hashPrefix('');
	$routeProvider
	.when('/', {
		templateUrl: 'view/pages/home.html'
	})
	.when('/login',{
		templateUrl: 'view/pages/login.html'
	})
	.when('/signup',{
		templateUrl: 'view/pages/signup.html'
	})

	$locationProvider.html5Mode(true);
});