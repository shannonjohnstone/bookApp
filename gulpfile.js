const gulp = require('gulp')
const eslint = require('gulp-eslint')
const nodemon = require('gulp-nodemon');

const jsFiles = ['*.js', 'src/**/**/*.js']

gulp.task('lint', () => {
  gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('inject', () => {
  const wiredep = require('wiredep').stream
  const inject = require('gulp-inject')
  const injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], { read: false })
  const injectOptions = {
    ignorePath: '/public'
  }

  const options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../../public'
  }
  return gulp.src('./src/views/*.html')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src/views'))
})

gulp.task('serve', ['lint', 'inject'], () => {
  const options = {
    script: 'index.js',
    delayTime: 1,
    env: {
      'PORT': 3000
    },
    watch: jsFiles
  }
  return nodemon(options)
    .on('restart', (ev) => console.log('Restarting...'))
})

gulp.task('default', ['lint'], () => {
  console.log('gulp default success');
})
