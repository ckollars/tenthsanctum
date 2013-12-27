/*global module:false*/
module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    siteConfig: grunt.file.readJSON('site-config.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
      ' <%= pkg.license %> License */\n',
    grunticon: {
      icons: {
        options: {
          src: "svg/",
          dest: "scss/partials/utility/",
          datasvgcss: "_icons.data.svg.scss",
          datapngcss: "_icons.data.png.scss",
          urlpngcss: "_icons.fallback.scss"
        }
      }
    },
     // Includes allow us to have partials in HTML
    includes: {
      files: {
        src: ['*.html','*.php'],
        dest: '_site/',
        flatten: true,
        debug: true
      }
    },
    compass: {
      options: {
        // bundleExec: true,
        cssDir: '_site/css',
        sassDir: 'scss',
        imagesDir: 'images',
        javascriptsDir: 'js',
        fontsDir: 'fonts',
        assetCacheBuster: 'none',
        require: [
          'sass-globbing',
          'toolkit',
          'rgbapng'
        ]
      },
      dev: {
        options: {
          environment: 'development',
          outputStyle: 'expanded',
          relativeAssets: true,
          raw: 'line_numbers = :true\n'
        }
      },
      dist: {
        options: {
          environment: 'production',
          outputStyle: 'compact',
          force: true
        }
      }
    },
    watch: {
      html: {
        files: ['*.html', '*.php'],
        tasks: ['includes']
      },
      compass: {
        files: ['scss/{,**/,**/**}*.scss'],
        tasks: ['compass:dev']
      },
      js: {
        files: ['js/*.js','js/vendor/*.js'],
        tasks: ['concat','uglify']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'css/style.css',
          'js/*.js',
          '*.html',
          'images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    copy: {
      dev: {
        files: [
          {expand: true, cwd: '', src: ['scss/partials/utility/png/**'], dest: '_site/images/'},
          {expand: true, cwd: '', src: ['images/**/*'], dest: '_site/'},
          {expand: true, cwd: '', src: ['js/no-concat/modernizr.js'], dest: '_site/'},
        ]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/vendor/*.js','js/*.js'],
        dest: '_site/js/compiled.js'
      }
    },
    uglify: {
      build: {
        files: {
          '_site/js/compiled.min.js' : '_site/js/compiled.js'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('images', ['grunticon']);
  grunt.registerTask('assets', ['copy:dev','includes','compass:dev','concat','uglify']);
};
