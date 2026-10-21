import path from 'path';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const srcFolder = 'src';
const buildFolder = 'dist';

const paths = {
  root: path.dirname(__filename),
  src: path.resolve(srcFolder),
  build: path.resolve(buildFolder),
};

export const webpackConfig = (isMode) => ({
  entry: `${paths.src}/js/app.js`,

  mode: isMode ? 'development' : 'production',

  /** Карта исходников только в режиме разработки */
  devtool: isMode ? 'source-map' : false,

  cache: {
    type: 'filesystem', // По умолчанию 'memory'
    cacheDirectory: `${paths.root}/.temporary_cache`,
    buildDependencies: {
      config: [__filename, `${paths.root}/package.json`],
    },
  },

  output: {
    path: `${paths.build}/js`,
    filename: 'app.min.js',
    /** 'auto' — динамические import() работают и в подпапке (gh-pages, ftp/имя-проекта) */
    publicPath: 'auto',
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,

        use: {
          loader: 'babel-loader',
          options: {
            /**
             * Браузеры берутся из "browserslist" в package.json.
             * Полифилы core-js подключаются автоматически и только те, что реально нужны коду.
             */
            presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: '3.51' }]],
          },
        },

        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        /** Убираем комментарии и не создаём app.min.js.LICENSE.txt */
        extractComments: false,
        terserOptions: { format: { comments: false } },
      }),
    ],
  },

  performance: { hints: false },
});
