import del from 'del';

export function clean(callback: Function) {
  del(['./dist/**']);
  callback();
};
