import webpack from 'webpack';
import log from 'fancy-log';

import { webpackConfig } from '../../webpack.config.js';
import { plugins } from '../config/plugins.js';

/**
 * Сборка JS через webpack (Node API).
 * dev   — ошибка показывается уведомлением, watch продолжает работать;
 * build — ошибка останавливает сборку.
 */
const js = () =>
  new Promise((resolve, reject) => {
    webpack(webpackConfig(app.isDev), (err, stats) => {
      const error = err || (stats.hasErrors() && new Error(stats.toString('errors-only')));

      if (error) {
        /** Без stack trace — в консоли остаётся только понятное сообщение webpack */
        error.showStack = false;
        plugins.notifyError('JS', error);

        return app.isBuild ? reject(error) : resolve();
      }

      log(stats.toString({ preset: 'summary', assets: true, warnings: true, colors: true }));
      plugins.reloadBrowser();
      resolve();
    });
  });

export { js };
