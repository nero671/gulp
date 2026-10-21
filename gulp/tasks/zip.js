import gulp from 'gulp';
import { rmSync } from 'node:fs';
import zipPlugin from 'gulp-zip';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const zip = () => {
  const archiveName = `${filePaths.projectDirName}.zip`;

  rmSync(`./${archiveName}`, { force: true });

  return gulp
    .src(`${filePaths.buildFolder}/**/*`, { encoding: false, dot: true, nodir: true })
    .pipe(plugins.handleError('ZIP'))
    .pipe(zipPlugin(archiveName))
    .pipe(gulp.dest('./'));
};

export { zip };
