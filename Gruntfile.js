'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        clean: ["./dist/css"],

        less: {
            serve: {
                expand: true,
                cwd: './less',
                src: '*.less',
                ext: '.css',
                dest: './dist/css'
            }
        },

        express: {
            serve: {
                options: {
                    script: './backend/main.js'
                }
            }
        },

        concurrent: {
            serve: [
                'less:serve',
            ]
        },
    });

    grunt.registerTask('default', [
        'clean',
        'concurrent:serve',
        'express:serve',
        'keepalive'
    ]);
};