module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				banner: '/*! iScroll v<%= pkg.version %> ~ (c) 2008-<%= grunt.template.today("yyyy") %> Matteo Spinelli ~ http://cubiq.org/license */\n'
			},

			iscroll: {
				dest: 'build/iscroll.js',
				src: [
						'src/open.js',
						'src/utils.js',
						'src/core.js',
						'src/default/*.js',
						'src/move/*.js',
						'src/close.js'
					]
			},
			lite: {
				dest: 'build/iscroll-lite.js',
				src: [
						'src/open.js',
						'src/utils.js',
						'src/core.js',
						'src/lite/*.js',
						'src/move/*.js',
						'src/default/_initEvents.js',
						'src/default/getComputedPosition.js',
						'src/close.js'
					]
			},
			zoom: {
				dest: 'build/iscroll-zoom.js',
				src: [
						'src/open.js',
						'src/utils.js',
						'src/core.js',
						'src/default/*.js',
						'src/move/_animate.js',
						'src/move/_move.js',
						'src/zoom/*.js',
						'src/close.js'
					]
			},
			probe: {
				dest: 'build/iscroll-probe.js',
				src: [
						'src/open.js',
						'src/utils.js',
						'src/core.js',
						'src/default/*.js',
						'src/move/handleEvent.js',
						'src/move/_translate.js',
						'src/probe/*.js',
						'src/close.js'
					]
			},
			iphone: {
				dest: 'build/iscroll-iphone.js',
				src: [
						'src/open.js',
						'src/utils.js',
						'src/core.js',
						'src/move/handleEvent.js',
						'src/default/indicator.js',
						'src/default/transitionProp.js',
						'src/default/_init.js',
						'src/iphone/*.js',
						'src/close.js'
					]
			}
		},

		jshint: {
			dist: ['build/*.js']
		},

		uglify: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'build',
						src: '*.js',
						dest: 'dist/',
						ext: '.min.js'
					}
				]
			}
		},

		watch: {
			files: [ 'src/**/*.js' ],
			tasks: 'concat'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('iscroll', ['concat:iscroll']);
	grunt.registerTask('lite', ['concat:lite']);
	grunt.registerTask('zoom', ['concat:zoom']);
	grunt.registerTask('probe', ['concat:probe']);
	grunt.registerTask('iphone', ['concat:iphone']);
	grunt.registerTask('dist', ['concat', 'jshint', 'uglify']);
};