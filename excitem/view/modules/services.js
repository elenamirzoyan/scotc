'use strict';

module.exports = function (app) {

    app.factory('userRequests', ['$rootScope','$http', '$cookieStore', '$filter', '$state',
        function($rootScope, $http, $cookieStore, $filter, $state) {
            var _user;
            return {
                post: function (path, obj, callback) {
                    $http({
                        method: 'POST',
                        timeout: 30000,
                        url: path,
                        data: obj
                    }).success(callback).error(callback);
                },
                get: function (path, callback) {
                    $http({
                        method: 'GET',
                        url: path
                    }).then(callback,callback);
                }
            };
        }
    ]);
};

