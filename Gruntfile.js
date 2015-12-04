/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // This will minify all JS files
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['js/*.js' ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        src: 'dist/js/jquery.js',
        dest: 'dist/js/main.min.js'
      },
        dist2: {
        src: 'dist/js/main.js',
        dest: 'dist/js/main.min.js'
      },
        dist3: {
        src: 'dist/js/bootstrap.js',
        dest: 'dist/js/main.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: false,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        //these objects are safe to igonnore during the linting process
        globals: {
          "angular" : false,
          "console" : true,
          "cordova" : true,
          "window" : true,
          "StatusBar" : true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src_js: {
        src: ['js/*.js']
      },
    },
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src_js: {
        files: '<%= jshint.src_js.src %>',
        tasks: ['jshint:gruntfile', 'concat', 'uglify']
      },
    },
    //bower
    bower: {
      install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
      }
    },
    //this will copy out only the min files to the www folder
    copy: {
      1: {
        src: 'bower_components/font-awesome/fonts',
        dest: 'dist/fonts',
      },
      2: {
        src: 'bower_components/bootstrap/dist/css/bootstrap.css',
        dest: 'dist/css/bootstrap.css',
      },
      3: {
        src: 'bower_components/bootstrap/dist/js/bootstrap.js',
        dest: 'dist/js/bootstrap.js',
      },
        4: {
            src:'bower_components/font-awesome/css/font-awesome.css',
            dest:'dist/css/font-awesome.css'
        },
        5: {
            src:'bower_components/jquery/dist/jquery.js',
            dest:'dist/js/jquery.js'
        },
        6: {
            src:'css/main.css',
            dest:'dist/css/main.css'
        },
        7: {
            src:'js/main.js',
            dest:'dist/js/jquery.js'
        },
        8: {
            src:'index.html',
            dest:'dist/index.html',
        }
    },
    cordovacli: {
      options: {
        cli: 'cordova'  // cca or cordova
      },
      cordova: {
        options: {
          command: ['platform','build'],
          platforms: ['android'],
          path: 'plugins'
        }
      },
    },
      cssmin: {
  target: {
    files: {
      'dist/css/main.min.css': ['dist/css/bootstrap.css', 'dist/css/font-awesome.css', 'dist/css/main.css']
    }
  }
},
    clean: {
  css: ["dist/css/*.css", "!dist/css/*.min.css"],
  js: ["dist/js/*.js", "!dist/js/*.min.js"]        
}  
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-cordovacli');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');    
  // Default task.
  grunt.registerTask('default', [ 'bower', 'copy','jshint', 'concat', 'uglify']);

};
