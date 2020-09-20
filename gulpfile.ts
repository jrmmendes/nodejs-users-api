import del from 'del';
import gulp, { dest, series, src } from 'gulp';
import eslint from 'gulp-eslint'; 
import alias from 'gulp-ts-alias';
import typescript from 'gulp-typescript';
import nodemon from 'gulp-nodemon';

const project = typescript.createProject('tsconfig.json', { noImplicitAny: true });

export function clean() {
  return del(['./dist/**']);
};

export function lint() {
  return src('src/**/*.ts')
    .pipe(eslint())
    .pipe(eslint.format());
}

export function compile() {
  const compiled = src('./src/**/*.ts')
    .pipe(alias({ configuration: project.config }))
    .pipe(project());

    return compiled.js
      .pipe(dest('dist'));
}

export function watch() {
  return gulp.watch('src/**/*.ts', compile);
}

export function startNodemon() {
  return nodemon({
    script: 'dist/main.js',
    ext: 'ts',
    watch: ['./src/'],
    tasks: ['compile'],
  });
}

export const build = series(clean, lint, compile);
