import gulp from 'gulp';
import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

/** encoding: false — иначе Gulp 5 испортит бинарные файлы (pdf, картинки, видео) */
const copy = () => {
  return gulp
    .src(filePaths.src.static, { encoding: false, dot: true })
    .pipe(plugins.newer(filePaths.build.static))
    .pipe(gulp.dest(filePaths.build.static));
};

export { copy };
