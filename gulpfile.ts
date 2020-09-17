import del from 'del';
import gulp, { dest, series, src } from 'gulp';
import eslint from 'gulp-eslint';
import tsc from 'gulp-typescript';

const tsProject = tsc.createProject('tsconfig.json', { noImplicitAny: true });

export function clean() {
  return del(['./dist/**']);
};

export function lint() {
  return src('src/**/*.ts')
    .pipe(eslint())
    .pipe(eslint.format());
}

export function compile() {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(dest('dist'));
}

export function watch() {
  return gulp.watch('src/**/*.ts', compile);
}

export const build = series(clean, lint, compile);
