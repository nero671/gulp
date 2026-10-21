import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

/**
 * Собирает все иконки из src/icons/*.svg в спрайт dist/images/icons/icons.svg
 * Использование: <svg><use href="images/icons/icons.svg#имя-файла"></use></svg>
 */
const createSvgSprite = () => {
  return gulp
    .src(filePaths.src.svgIcons, { allowEmpty: true })
    .pipe(plugins.handleError('SVG'))
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: `../icons/icons.svg`,
            /** Создавать страницу с перечнем иконок */
            example: true,
          },
        },
      })
    )
    .pipe(gulp.dest(filePaths.build.images));
};

export { createSvgSprite };
