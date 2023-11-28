import gulp from 'gulp';
import webpack from 'webpack-stream';
import { webpackConfig } from '../../webpack.config.js';

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import {isDev} from "../../gulpfile.js";

const js = () => {
  return gulp
    .src(filePaths.src.js, { sourcemaps: app.isDev })
    .pipe(gulp.dest(filePaths.build.css))
    .pipe(plugins.handleError('JS'))
    .pipe(webpack({ config: webpackConfig(app.isDev) }))
    .pipe(gulp.dest(filePaths.build.js), { sourcemaps: app.isDev })
    .pipe(plugins.browserSync.stream());
};

export { js };
