import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import sassGlob from 'gulp-sass-glob';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer'; // Вендорные префиксы (-webkit-, -moz-) по browserslist из package.json
import sortMediaQueries from 'postcss-sort-media-queries'; // Группировка медиа запросов
import cssnano from 'cssnano'; // Сжатие CSS файла

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';
import { webpCss } from '../plugins/webp.js'; // Вывод WEBP изображений через image-set()

const sass = gulpSass(dartSass);

const scss = () => {
  const postcssPlugins = app.isBuild
    ? [sortMediaQueries({ sort: 'desktop-first' }), webpCss(), autoprefixer()]
    : [autoprefixer()];

  return (
    gulp
      .src(filePaths.src.scss, { sourcemaps: app.isDev })
      .pipe(plugins.handleError('SCSS'))
      .pipe(sassGlob())
      .pipe(
        sass({
          style: 'expanded',
          /** Позволяет импортировать стили из пакетов: @import 'swiper/swiper' */
          loadPaths: ['node_modules'],
          /** @import пока оставлен ради glob-импортов (@import '../html/**\/*.scss') */
          silenceDeprecations: ['import'],
          quietDeps: true,
        })
      )
      .pipe(plugins.replace(/@img\//g, '../images/'))
      .pipe(postcss(postcssPlugins))
      /** Не сжатый дубль файла стилей (style.css) */
      .pipe(gulp.dest(filePaths.build.css))
      .pipe(plugins.if(app.isBuild, postcss([cssnano({ preset: 'default' })])))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest(filePaths.build.css, { sourcemaps: app.isDev ? '.' : false }))
      .pipe(plugins.browserSync.stream({ match: '**/*.css' }))
  );
};

export { scss };
