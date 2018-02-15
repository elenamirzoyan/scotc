'use strict';
var Config = function ($stateProvider, $urlRouterProvider,$locationProvider, $timeout, userRequests, $state) {
    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: '/files/modules/html/index.html',
            controller: 'main'
        })
        .state('home.bloggers', {
            url: 'bloggers',
            views: {
                'inner': {
                    templateUrl: '/files/modules/html/bloggers.html',
                    controller: 'bloggers'
                }
            }
        })
        .state('home.posts', {
            url: 'posts',
            views: {
                'inner': {
                    templateUrl: '/files/modules/html/posts.html',
                    controller: 'posts'
                },

            }

        });
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
};
Config.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];
module.exports = Config;


