var gulp=require('gulp');
var less=require('gulp-less');
var minify=require('gulp-minify-css');
var rename=require('gulp-rename');
gulp.task('less',function(){
	gulp.src('public/css/*.less').pipe(less()).pipe(minify()).pipe(rename(function(path){
		path.basename+=".min";
	})).pipe(gulp.dest('public/css/'));
});
gulp.task('default',function(){
	gulp.watch('public/css/*.less',['less']);
});
