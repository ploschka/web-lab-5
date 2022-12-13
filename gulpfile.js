'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();

gulp.task('scss', function(){
  return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('pug', function(){
  return gulp.src('app/pug/templates/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series(gulp.parallel('pug','scss')));

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.*', gulp.series('scss'));
  gulp.watch('app/pug/**/*.*', gulp.series('pug'));
});

gulp.task('serve', function(){
  browsersync.init({
    server: 'dist'
  });

  browsersync.watch('dist/**/*.*').on('change', browsersync.reload);
});


gulp.task('tree', function(){
  return gulp.src('*.*',{read: false})
    .pipe(gulp.dest('./app'))
    .pipe(gulp.dest('./app/scss'))
    .pipe(gulp.dest('./app/pug'))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(gulp.dest('./dist/fonts'))
    .pipe(gulp.dest('./dist/img'))
    .pipe(gulp.dest('./src'))
})

gulp.task('dev', gulp.series('tree', 'build', gulp.parallel('watch', 'serve')));
