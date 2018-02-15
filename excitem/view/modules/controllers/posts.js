/**
 * Created by Elena Mirzoyan on 2/17/17.
 */
var Posts = function ($scope, userRequests) {
    $scope.showPreloader = false;
    $scope.getPosts = function () {
        $scope.showPreloader = true;
        userRequests.post('getPosts', {}, function (data) {
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
Posts.$inject =  ['$scope', 'userRequests'];
module.exports = Posts;