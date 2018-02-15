'use strict';

module.exports = function (app) {

    app.controller('main',require('./main'));
    app.controller('bloggers',require('./bloggers'));
    app.controller('posts',require('./posts'));

};

