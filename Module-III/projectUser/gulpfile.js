
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
// gulpMocha = require('gulp-mocha'),
// env = require('gulp-env'),
// supertest = require('supertest');

var jsFiles = ['*.js', '/routes/*.js', '/controllers/*.js'];

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        watch: jsFiles,
        ignore:['./node_modules/**']
    })
        .on('restart', function(){
            console.log('Restarting....');
        })
});
//
// gulp.task('test', function(){
//     env({vars: {ENV: 'Tests'}});
//     gulp.src('tests/*.js', {read:false})
//         .pipe(gulpMocha({report: 'nyan'}));
// });