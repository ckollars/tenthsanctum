// Directory reference:
//   css: css
//   compass: _scss
//   javascript: js
//   images: images
//   fonts: fonts

module.exports = function(grunt) {

  // Show elapsed time after tasks run.
  require('time-grunt')(grunt);

  // Load all Grunt tasks.
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    kollab: {
      app: 'app',
      dev: '_dev',
      dist: '_dist'
    },
    clean: {
      grunticon: {
        src: ['<%= kollab.app %>/svgs/grunticon', '<% kollab.app %>/svgs/icons']
      },
      server: [
        '_dev'
      ],
      dist: [
        '_dist'
      ]
    },
    watch: {
      compass: {
        files: ['<%= kollab.app %>/_scss/**/*.scss'],
        tasks: ['compass:server'],
        options: {
          livereload: true,
        }
      },
      js: {
        files: ['<%= kollab.app %>/js/*.js','<%= kollab.app %>/js/vendor/*.js'],
        tasks: ['concat:server', 'copy:scripts'],
        options: {
          livereload: true,
        }
      },
      assets: {
        files: [
          '<%= kollab.app %>/images/**/*',
          '<%= kollab.app %>/*.html',
        ],
        tasks: ['copy:server'],
        options: {
          livereload: true,
        }
      }
    },

    grunticon: {
      icons: {
        options: {
          src: '<%= kollab.app %>/images/svg/',
          dest: '<%= kollab.app %>/images/svg/grunticon',
          pngfolder: '<%= kollab.app %>',
          datasvgcss: '_icons.data.svg.scss',
          datapngcss: '_icons.data.png.scss',
          urlpngcss: '_icons.fallback.scss'
        }
      }
    },
    compass: {
      options: {
        sassDir: '<%= kollab.app %>/_scss',
        imagesDir: '<%= kollab.app %>/images',
        generatedImagesDir: '<%= kollab.app %>/images',
        javascriptsDir: '<%= kollab.app %>/js',
        fontsDir: '<%= kollab.app %>/fonts',
        assetCacheBuster: 'none',
        require: [
          'sass-globbing',
          'toolkit',
          'rgbapng'
        ]
      },
      server: {
        options: {
          cssDir: '<%= kollab.dev %>/css',
          environment: 'development',
          outputStyle: 'expanded',
          relativeAssets: true,
          raw: 'line_numbers = :true\n'
        }
      },
      dist: {
        options: {
          cssDir: '<%= kollab.dist %>/css',
          environment: 'production',
          outputStyle: 'compressed',
          force: true
        }
      }
    },


    copy: {
      scripts: {
        files: [
          { expand: true, flatten: true, src: '<%= kollab.app %>/js/no-concat/modernizr.js', dest: '<%= kollab.dev %>/js'},
        ]
      },
      server: {
        files: [
          { expand: true, cwd: '<%= kollab.app %>/images', src: '**', dest: '<%= kollab.dev %>/images/' },
          { expand: true, flatten: true, cwd: '<%= kollab.app %>', src: 'index.html', dest: '<%= kollab.dev %>', filter: 'isFile' },
          { expand: true, flatten: true, src: '<%= kollab.app %>/js/no-concat/modernizr.js', dest: '<%= kollab.dev %>/js'}
        ]
      },
      dist: {
        files: [
          {expand: true, src: ['../images/**'], dest: '_dist/images'},
          {expand: true, src: ['js/no-concat/modernizr.js'], dest: '_dist/'},
        ]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      server: {
        src: ['<%= kollab.app %>/js/vendor/*.js','<%= kollab.app %>/js/*.js'],
        dest: '<%= kollab.dev %>/js/compiled.js'
      },
      dist: {
        src: ['js/vendor/*.js','js/*.js'],
        dest: '_dist/js/compiled.js'
      }
    },
    uglify: {
      server: {
        files: {
          '<%= kollab.dev %>/js/compiled.min.js': '<%= kollab.dev %>/js/compiled.js'
        }
      },
      dist: {
        files: {
          '_dist/js/compiled.min.js': '_dist/js/compiled.js'
        }
      }
    },
    concurrent: {
      server: [
        'compass:server',
        'jekyll:server'
      ],
      dist: [
        'compass:dist',
        'copy:dist'
      ]
    }
  });

  // Create svg stylesheets and fallback from svgs
  grunt.registerTask(
   'images',
   ['grunticon', 'copy:grunticon', 'clean:grunticon']
  );

  // Development build on all assets
  grunt.registerTask(
    'serve',
    'Serves a development site',
    ['clean:server','compass:server', 'concat:server', 'copy:server', 'uglify:server', 'watch' ]
  );

  // Distribution build on all assets. These then will need to be
  // manually moved to correct directories from "_dist" directory
  grunt.registerTask(
    'dist',
    'Compiles all of the assets and copies the files to the distribution directory.',
    ['clean:dist', 'jekyll:dist', 'compass:dist', 'concat:dist', 'uglify:dist', 'copy:dist']
  );
};
