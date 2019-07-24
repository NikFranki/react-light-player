const gulp = require('gulp');
const bump = require('gulp-bump');

// major: 1.0.0
// minor: 0.1.0
// patch: 0.0.2
// prerelease: 0.0.1-2

gulp.task('bump', function(done){
  gulp.src('./package.json')
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
  done();
});

//  创建一个gulp的任务
gulp.task( "default", gulp.series('bump') );