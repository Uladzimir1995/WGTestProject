const gulp = require('gulp');
// const sass = require('gulp-sass');
const image = require('gulp-image');
// const autoprefixer = require('gulp-autoprefixer');

gulp.task('image', function () {
    gulp.src('./WarGamingProject/images/*')
        .pipe(image())
        .pipe(gulp.dest('./WarGamingProject/images/build'))
});

// gulp.task('sass', function () {
//     return gulp.src('./WarGamingProject/css/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer({
//           browsers: ['last 2 versions'],
//           cascade: false
//         }))
//         .pipe(gulp.dest('./WarGamingProject/css/'));
// });


// gulp.task('fonts', function () {
//     return gulp.src('./WarGamingProject/fonts/*')
//         .pipe(gulp.dest('./WarGamingProject/fonts/build'));
// });

gulp.task('watch', ['image'], function () {
//    gulp.watch('./WarGamingProject/css/*.scss, ['sass']);
    gulp.watch('./WarGamingProject/images/*', ['image']);
//    gulp.watch('./WarGamingProject/fonts/*, ['fonts']);
});

gulp.task('default', ['watch','image']);
