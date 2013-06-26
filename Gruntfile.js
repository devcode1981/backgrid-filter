/*
  backgrid-filter
  http://github.com/wyuenho/backgrid-text-cell

  Copyright (c) 2013 Jimmy Yuen Ho Wong and contributors
  Licensed under the MIT license.
*/

// jshint globalstrict:true, node:true

"use strict";

module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    clean: {
      options: {
        force: true
      },
      api: [
        "api/**/*"
      ],
      "default": [
        "*.min.*",
        "test/coverage/**/*"
      ]
    },
    concat: {
      backgrid: {
        options: {
          banner: '/*!\n  <%= pkg.name %>\n' +
            '  <%= pkg.repository.url %>\n\n' +
            '  Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            '  Licensed under the MIT license.\n' +
            '*/\n\n'
        },
        src: [
          "backgrid-filter.js"
        ],
        dest: "backgrid-filter.js"
      }
    },
    jasmine: {
      test: {
        version: "1.3.1",
        src: [
          "backgrid-filter.js"
        ],
        options: {
          specs: [
            "test/filter.js"
          ],
          template: require("grunt-template-jasmine-istanbul"),
          templateOptions: {
            coverage: "test/coverage/coverage.json",
            report: {
              type: "html",
              options: {
                dir: "test/coverage"
              }
            }
          },
          vendor: [
            "test/vendor/js/jquery.js",
            "test/vendor/js/bootstrap.js",
            "test/vendor/js/underscore.js",
            "test/vendor/js/backbone.js",
            "test/vendor/js/backgrid.js",
            'test/vendor/js/lunr.js',
            'test/vendor/js/backbone-pageable.js'
          ]
        }
      }
    },
    jsduck: {
      main: {
        src: ["backgrid-filter.js"],
        dest: "api",
        options: {
          "external": ["Backbone.Model,Backbone.Collection,Backbone.View"],
          "title": "backgrid-filter",
          "no-source": true,
          "categories": "categories.json",
          "warnings": "-no_doc",
          "pretty-json": true
        }
      }
    },
    recess: {
      csslint: {
        options: {
          compile: true
        },
        files: {
          "backgrid-filter.css": ["backgrid-filter.css"]
        }
      },
      "default": {
        options: {
          compress: true
        },
        files: {
          "backgrid-filter.min.css": ["backgrid-filter.css"]
        }
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: true,
        preserveComments: "some"
      },
      "default": {
        files: {
          "backgrid-filter.min.js": ["backgrid-filter.js"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-recess");
  grunt.loadNpmTasks("grunt-jsduck");
  grunt.loadNpmTasks("grunt-contrib-jasmine");

  grunt.registerTask("dist", ["uglify", "recess"]);
  grunt.registerTask("default", ["clean", "jsduck", "dist", "jasmine"]);
};