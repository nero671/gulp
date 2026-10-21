import gulp from 'gulp';

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { optimizeImages } from '../plugins/images.js';

/**
 * dev   — картинки просто копируются (быстро).
 * build — jpg/png сжимаются и дополнительно конвертируются в .webp (через sharp).
 * encoding: false обязателен в Gulp 5, иначе бинарные файлы будут испорчены.
 */
const images = () => {
  return gulp
    .src([filePaths.src.images, filePaths.src.svg], { encoding: false })
    .pipe(plugins.handleError('IMAGES'))
    .pipe(plugins.newer(filePaths.build.images))
    .pipe(plugins.if(app.isBuild, optimizeImages()))
    .pipe(gulp.dest(filePaths.build.images))
    .pipe(plugins.browserSync.stream());
};

export { images };
