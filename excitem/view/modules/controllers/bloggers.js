/**
 * Created by Elena Mirzoyan on 2/17/17.
 */
var Bloggers = function ($scope, userRequests) {
    $scope.showPreloader = false;
    $scope.getBloggers = function () {
        $scope.showPreloader = true;
        userRequests.post('getBloggers', {}, function (data) {
            if (data.error == true) {
                Materialize.toast(data.message, 3000);
                $scope.showPreloader = false;
            }
            else {
                $scope.Bloggers = data.data;
                $scope.showPreloader = false;
            }
        })
    };
}
Bloggers.$inject =  ['$scope', 'userRequests'];
module.exports = Bloggers;