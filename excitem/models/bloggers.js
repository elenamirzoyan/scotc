/**
 * Created by Elena Mirzoyan on 2/17/17.
 */

module.exports = function(app,knex){
    return {
        regRoutes: function () {
            var _this = this;
            app.post('/bloggers/', function (req, res) {
                _this.getBloggers(req,function(results){
                    res.send(results).end();
                });
            });
        },

        getBloggers: function(req,callback){
            // simply fetch list of bloggers from db
        }
    }
}