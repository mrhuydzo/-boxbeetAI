var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;
var sass = require('gulp-sass');
//var twig = require('gulp-twig');
var bs = require('browser-sync').create();




// Compile Twig templates to HTML
/*
gulp.task('templates', function() {
    return gulp.src('twig/!*.twig') // run the Twig template parser on all .html files in the "twig" directory
        .pipe(twig())
        .pipe(gulp.dest('.')); // output the rendered HTML files to the "dist" directory
});
*/

gulp.task('serve', [], function () {
    browserSync({
        notify: false,
        port: 3002,
        server: {
            baseDir: '.'
        }
    });

    gulp.watch(['html/!*.html'], reload);
    gulp.watch(['js/!*.js'], reload);
    gulp.watch(['css/!*.css'], reload);
    //gulp.watch(['twig/!*.twig'], reload);
});

gulp.task('sass', function(){
    return gulp.src('sass/**/*.scss') // cấu hình gulp địa chỉ của tập tin nguồn sass
        .pipe(sass()) // chuyển tập tin nguồn sass thành tập tin css
        .pipe(gulp.dest('css')) // địa chỉ tập tin css sẽ được lưu lại
        .pipe(bs.reload({stream: true}));
});

gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch("html/*.html").on('change', bs.reload);
   // gulp.watch("twig/**/*.twig").on('change', bs.reload);
    // Other watchers
});


// Default Task
gulp.task('default', ['sass', 'watch','serve'], function () {
    console.log("Command:\n   serve - run live reload server");
});