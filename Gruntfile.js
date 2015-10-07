'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        clean: ["./.tmp"],

        copy: {
            serve: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'frontend/css',
                    dest: '.tmp/css',
                    src: ['*.css']
                }, {
                    expand: true,
                    cwd:'frontend/js',
                    dest: '.tmp/js',
                    src: ['*.js']
                }]
            }
        },

        less: {
            serve: {
                expand: true,
                cwd: './frontend/less',
                src: '*.less',
                ext: '.css',
                dest: '.tmp/css'
            }
        },

        watch: {
            scripts: {
                files: ['./frontend/js/*.js'],
                tasks: ['copy:serve']
            },
            css: {
                files: ['./frontend/css/*.css'],
                tasks: ['copy:serve']
            },
            less: {
                files: ['./frontend/less/*.less'],
                tasks: ['less:serve']
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
        'copy:serve',
        'express:serve',
        'watch'
    ]);
};