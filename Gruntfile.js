module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //aws: grunt.file.readJSON('C:/wamp/www/grunt-aws.json'),

    s3: {
      //options: {
      //  key: '<%= aws.key %>',
      //  secret: '<%= aws.secret %>',
      //  access: 'public-read',
      //  headers: {
      //    // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
      //    "Cache-Control": "max-age=630720000, public",
      //    "Expires": new Date(Date.now() + 63072000000).toUTCString()
      //  }
      //},
      dev: {
        options: {
          bucket: 'maplestory-mobile',
          verify: true
        },
        sync: [
          {
            src: '*.html',
            dest: '/',
            options: { gzip: true }
          },
          {
            src: 'assets/images/*.{png,jpg,gif}',
            dest: 'assets/images/',
            options: { gzip: true }
          },
          {
            src: 'assets/css/*.min.css',
            dest: 'assets/css/',
            options: { gzip: true }
          },
          {
            src: 'assets/js/*.min.js',
            dest: 'assets/js/',
            options: { gzip: true }
          }
        ]
      }
    },

    sass: {      
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'assets/css/app.min.css': 'assets/scss/app.scss'
        }        
      }
    },

    uglify: {
      vendor: {
        src: 'assets/js/vendor/*.js',
        dest : 'assets/js/vendor.min.js'
      },
      main: {
        src: 'assets/js/main.js',
        dest : 'assets/js/main.min.js'
      },
      signup: {
        src: 'assets/js/sign-up.js',
        dest : 'assets/js/sign-up.min.js'
      }
    },

    imagemin: {   

      main: {                         
        options: {
          optimizationLevel: 7
        },
        files: [{
          expand: true,                  
          cwd: 'assets/img/',                   
          src: ['**/*.{png,jpg,gif}'],
          dest: 'assets/images/'                  
        }]
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'assets/scss/**/*.scss',
        tasks: ['sass']
      },

      uglify: {
        files: 'assets/js/main.js',
        tasks: 'uglify:main'
      },
	  
	  uglifySignup: {
        files: 'assets/js/sign-up.js',
        tasks: 'uglify:signup'
      }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-s3');

  grunt.registerTask('build', ['sass','uglify','imagemin']);
  grunt.registerTask('default', ['watch']);

};