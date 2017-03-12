const gulp = require('gulp');
const $ = require('gulp-load-plugins')({lazy: true});

// Tasks

// Client

function cleanClient () {
  return gulp.src('./dist/client/', {read: false})
    .pipe($.clean());
}

function stylus () {
  console.log('Compiling stylus into plain ol\' CSS...');
  return gulp.src('./src/client/styl/main.styl')
    .pipe($.print())
    .pipe($.plumber())
    .pipe($.stylus())
    .pipe($.autoprefixer({browsers: ['> 5%']}))
    .pipe(gulp.dest('./dist/client/stylesheets'));
}

function clientTs() {
  return gulp.src('./src/client/ts/*.ts')
    .pipe($.typescript({
      noImplicitAny: true
    }))
    .pipe(
      gulp.dest('./dist/client/scripts')
    )
}

function tsSw () {
  return gulp.src('./src/client/sw.ts')
    .pipe($.plumber())
    .pipe($.typescript({}))
    .pipe(
      gulp.dest('./dist/client/')
  )
}

function moveClient() {
  return gulp.src(['./src/client/**/*', '!./src/client/ts', '!./src/client/styl', '!./src/client/styl/**', '!./src/client/**/*.ts'])
    .pipe(
      gulp.dest('./dist/client')
    )
}

function inject() {
  return gulp.src('./src/server/_includes/_scripts.html')
    .pipe($.inject(
      gulp.src('./dist/client/scripts/*.js'),

      {ignorePath: '/dist/client'}
    ))
    .pipe(
      gulp.dest('./src/server/_includes/')
    )
}

// Server

function cleanServer () {
  return gulp.src('./dist/server/')
    .pipe($.clean());
}

function moveServer() {
  return gulp.src([    
    '!./src/server/*.ts',
    './src/server/**'
  ]).pipe(
    gulp.dest('./dist/server')
  )
}

function serverTs() {
  return gulp.src('./src/server/**.ts')
    .pipe($.print())
    .pipe($.typescript({}))
    .pipe(
      gulp.dest('./dist/server/')
    )
}

// Helpers

// ...

// Task definitions

gulp.task('clean-client', cleanClient);

gulp.task('client-ts', ['clean-client'], clientTs);
gulp.task('ts-sw', ['clean-client'], tsSw);

gulp.task('client-scripts', ['ts-sw', 'client-ts']);

gulp.task('stylus', ['clean-client'], stylus);

gulp.task('move-client', ['clean-client'], moveClient);

gulp.task('inject', ['clean-client', 'client-scripts'], inject);

gulp.task('client', ['client-scripts', 'move-client', 'stylus', 'inject']);

// Server

gulp.task('clean-server', cleanServer);
gulp.task('move-server', ['clean-server'], moveServer);
gulp.task('server-ts', ['clean-server', 'move-server'], serverTs);

gulp.task('server', ['move-server', 'server-ts'])



gulp.task('watch', ['server', 'client'], function() {
  gulp.watch([
    './gulpfile.js',
    './tsconfig.json',
    './src/client/**/*.ts', 
    './src/client/styl/*.styl',
    './src/client/manifest.json'
  ], ['client']);
  
  gulp.watch('./src/server/**/*', ['server']);
  console.log('Waiting for changes...');
});

gulp.task('default', ['client', 'server']);
