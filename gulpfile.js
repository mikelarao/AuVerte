gulp = require("gulp");
browserSync = require("browser-sync").create();
sass = require("gulp-sass");
autoprefixer = require("gulp-autoprefixer");
uglify = require("gulp-uglify");
sourcemaps = require("gulp-sourcemaps");

// Compile Sass & Inject Into Browser
gulp.task("sass", function() {
  return gulp
    .src(["src/scss/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("src/assets/css"))
    .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(["src/scss/*/*.scss"], ["sass"]);
  gulp.watch(["src/scss/*.scss"], ["sass"]);
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

// Default Task
gulp.task("default", ["serve"]);
