// API Dependencies

module.exports = function (file, app) {
    switch (file) {
        case "routes":
            return require('./routes.js')(app);
            break;
    }
};