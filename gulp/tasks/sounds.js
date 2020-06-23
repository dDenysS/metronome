const gulp = require('gulp')

module.exports = function sounds() {
  return gulp.src('src/sounds/*')
    .pipe(gulp.dest('build/sounds'))
}


