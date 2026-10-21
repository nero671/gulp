import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import htmlMin from 'gulp-html-minifier-terser';

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { compileHandlebars } from '../plugins/handlebars.js';
import { webpHtml } from '../plugins/webp.js';

/** Метка версии вида 20251024220319 — сбрасывает кэш браузера для css/js после каждого билда */
const getVersion = () => new Date().toISOString().replace(/\D/g, '').slice(0, 14);

/** Добавляет ?_v=<версия> к локальным .css/.js в атрибутах href/src */
const LOCAL_ASSET_RE = /(\s(?:href|src)=["'])(?![a-z]+:|\/\/)([^"'?#]+\.(?:css|js))(["'])/gi;

const html = () => {
  const version = getVersion();

  return gulp
    .src(filePaths.src.html)
    .pipe(plugins.handleError('HTML'))
    .pipe(
      compileHandlebars({
        partialsDir: filePaths.src.htmlPartials,
        helpers: {
          parseJson: (str) => {
            try {
              return JSON.parse(str);
            } catch (e) {
              console.error('Ошибка JSON:', e);
              return [];
            }
          },
        },
      })
    )
    .pipe(fileInclude())
    .pipe(plugins.replace(/@img\//g, 'images/'))
    .pipe(plugins.if(app.isBuild, webpHtml()))
    .pipe(
      htmlMin({
        useShortDoctype: true,
        sortClassName: true,
        collapseWhitespace: app.isBuild,
        removeComments: app.isBuild,
      })
    )
    .pipe(plugins.if(app.isBuild, plugins.replace(LOCAL_ASSET_RE, `$1$2?_v=${version}$3`)))
    .pipe(gulp.dest(filePaths.build.html))
    .pipe(plugins.browserSync.stream());
};

export { html };
