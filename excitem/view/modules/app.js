window.jQuery = window.$ = require('../libs/jquery/dist/jquery.min');
window.moment = require('moment');
window._ = require('../libs/underscore-min');

require('../libs/angular/angular.min');
require('../libs/angular-ui-router/release/angular-ui-router.min');
require('../libs/angular-cookies.min');

var app = angular.module("excitem", ['ui.router','ngCookies']); //,'ngMessages', 'ngUUID'

require('./controllers/index')(app);
require('./services')(app);
require('./filters')(app);
app.config(require('./routes'));

app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist(['self', 'http://localhost/**']);
}]);


app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$httpProvider.interceptors.push(['$q', '$location', '$cookies', '$rootScope', function($q, $location, $cookies, $rootScope) {
		return {
			'request': function (config) {
				config.headers = config.headers || {};
				// For later auth
				// var token = $cookies.get('token');
				// if (token) {
				// 	config.headers.Authorization = token;
				// }
				// if($rootScope.userInfo) {
				// 	config.headers.name = $rootScope.userInfo.login_name;
				// 	config.headers.role = $rootScope.userInfo.role;
				// }
				return config;
			},
			'responseError': function(response) {
				if(response.status === 401 || response.status === 403) {
					$location.path('/');
				}
				return $q.reject(response);
			}
		};
	}]);
}]);


app.run(['$rootScope', '$cookies', '$q', '$location', '$cookieStore', 'userRequests', '$state', function ($rootScope, $cookies, $q, $location, $cookieStore, userRequests, $state) {

}]);









