module.exports = function(grunt) {
 
    // Project configuration.
    grunt.initConfig({
 
      //Read the package.json (optional)
      pkg: grunt.file.readJSON('package.json'),

      // Metadata.
      meta: {
        buildPath: 'assets/',
        srcPath: 'src/',
      },


      // Task configuration.
      sass: {
        dev: {
          options: {
            style: 'expanded',
            sourcemap: true
          },
          files: {                         
            '<%= meta.buildPath %>application.css': '<%= meta.srcPath %>stylesheets/application.css.scss',
            '<%= meta.buildPath %>ie.css': '<%= meta.srcPath %>stylesheets/ie.css.scss'
          }
        },
        build: {
          options: {
            style: 'compressed'
          },
          files: {                         
            '<%= meta.buildPath %>application.css': '<%= meta.srcPath %>stylesheets/application.css.scss',
            '<%= meta.buildPath %>ie.css': '<%= meta.srcPath %>stylesheets/ie.css.scss'
          }
        }
      },

     uglify: {
        options: {
          mangle: false
        },
        my_target: {
          files: {
            '<%= meta.buildPath %>modernizr.js': '<%= meta.srcPath %>javascripts/modernizr.js',
            '<%= meta.buildPath %>isotope.pkgd.min.js': '<%= meta.srcPath %>javascripts/isotope.pkgd.min.js',
            '<%= meta.buildPath %>application.js': '<%= meta.srcPath %>javascripts/application.js',
            '<%= meta.buildPath %>imagesloaded.pkgd.min.js': '<%= meta.srcPath %>javascripts/imagesloaded.pkgd.min.js',
            '<%= meta.buildPath %>jquery.min.js': '<%= meta.srcPath %>javascripts/jquery.min.js'
          }
        }
      },

      copy: {
        images: {
          files: [
            {expand: true, flatten: true, src: ['<%= meta.srcPath %>images/**'], dest: '<%= meta.buildPath %>', filter: 'isFile'}
          ]
        },

        fonts: {
          files: [
            {expand: true, flatten: true, src: ['<%= meta.srcPath %>fonts/**'], dest: '<%= meta.buildPath %>', filter: 'isFile'}
          ]
        }
      },

      cssmin: {
        minify: {
          options: {
          },
          files: {
            '<%= meta.buildPath %>application.css': '<%= meta.buildPath %>application.css',
            '<%= meta.buildPath %>ie.css': '<%= meta.buildPath %>ie.css'
          }
        }
      },

      imagemin: {
        dynamic: {
          files: [{
            expand: true,
            cwd: '<%= meta.srcPath %>images',
            src: ['**/*.{png,jpg,gif}'],
            dest: '<%= meta.buildPath %>'
          }]
        }
      },
     
      watch: {
        sass: {
            files: ['<%= meta.srcPath %>stylesheets/**/*.scss'],
            tasks: ['sass:dev']
        },
        javascripts: {
          files: ['<%= meta.srcPath %>javascripts/**/*.js'],
          tasks: ['uglify']
        },
        images: {
          files: ['<%= meta.srcPath %>images/**/*.jpg','<%= meta.srcPath %>/images/**/*.png','<%= meta.srcPath %>/images/**/*.gif'],
          tasks: ['copy:images']
        },
        fonts: {
          files: ['<%= meta.srcPath %>fonts/**/*.*'],
          tasks: ['copy:fonts']
        },
      }
 
    });
 
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
 
    // Default task.
    grunt.registerTask('default', ['sass:dev', 'uglify']);

    // Build Task
    grunt.registerTask('build', ['sass:build', 'copy:fonts', 'uglify', 'cssmin', 'imagemin']);

};
