/**
 * Created by mmalkav on 23.05.2016.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            options: {
                browserifyOptions: {
                    debug: true
                }
            },
            desktop: {
                src: 'view/modules/app.js',
                dest: 'view/production/app.js'
            }
        },
        uglify: {
            options: {
                sourceMap: function (path) {
                    return path.replace(/js\/build\/(.*).min.js/, "$1.map.js");
                },
                sourceMappingURL: function (path) {
                    return path.replace(/js\/build\/(.*).min.js/, "../../$1.map.js");
                }
            },
            desktop: {
                files: {
                    'view/production/app.min.js': ['view/production/app.js']
                }
            }

        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');



    grunt.registerTask('default', [
        'browserify'
    ]);

    grunt.registerTask('production', [
        'browserify',
        'uglify'
    ]);
};