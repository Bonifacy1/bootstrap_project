const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')

gulp.task('compile-sass', () =>{
    return gulp.src([`node_modules/bootstrap/scss/bootstrap.scss`,
                     `src/sass/*.scss`
                    ])
    .pipe(sass())
    .pipe(gulp.dest(`src/css`))
    .pipe(browserSync.stream())
})

gulp.task('move-js', () =>{
    return gulp.src([`node_modules/bootstrap/dist/js/bootstrap.min.js`,
                     `node_modules/tether/dist/js/tether.min.js`,
                     `node_modules/jquery/dist/jquery.min.js`
                    ])
    .pipe(gulp.dest('./src/js'))
    .pipe(browserSync.stream())
})

gulp.task('launch-server', ['compile-sass'], () => {
    browserSync.init({
        server: './src'
    })
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss',
                `src/sass/*.scss`], ['compile-sass'])

    gulp.watch('src/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['move-js', 'launch-server'])