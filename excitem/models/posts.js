/**
 * Created by Elena Mirzoyan on 2/17/17.
 */

module.exports = function(app,knex){
    return {
        regRoutes: function () {
            var _this = this;
            app.post('/posts/', function (req, res) {
                _this.getPosts(req,function(results){
                    res.send(results).end();
                });
            });
        },

        getPosts: function(req,callback){
            // simply fetch list of posts from db
        }
    }
}