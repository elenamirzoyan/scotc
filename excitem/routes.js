var knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		debug: process.env.DB_DEBUG == 'true',
		database: 'excitem',
		typeCast: function (field, next) {
			if (field.type == "BIT" && field.length == 1) {
				var bit = field.string();

				var b = (bit === null) ? null : bit.charCodeAt(0);
				return !!b;
			}
			return next();
		},
		pool: {
			min: 0,
			max: 5
		}
	}
});

module.exports = function (app) {
	var Posts = require('./models/posts')(app,knex);
	Posts.regRoutes();

	var Bloggers = require('./models/bloggers')(app,knex);
	Bloggers.regRoutes();

	app.get('/files/*', function (req, res) {
		res.sendFile(req.params[0], {root: __dirname + "/view"});
	});

	app.use(function(req, res){
		if('production' == process.env.PROFILE) // prod
			res.render('./index', {title: 'Excitem Blogger'});
		else
			res.render('./index-dev', {title: 'Excitem Blogger Staging'});
	});
	return app;
};