import del from 'del';
import eslint from 'gulp-eslint';
import { src } from 'gulp';

export function clean(callback: Function) {
  del(['./dist/**']);
  callback();
};

export function lint(callback: Function) {
  src('src/**/*.ts')
    .pipe(eslint())
    .pipe(eslint.format());

  callback();
}
