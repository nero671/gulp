import gulp from 'gulp';
import vinylFTP from 'vinyl-ftp';
import log from 'fancy-log';

import { configFTP } from '../config/ftp.js';
import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const ftp = () => {
  const ftpConnect = vinylFTP.create({ ...configFTP, log });

  return gulp
    .src(`${filePaths.buildFolder}/**/*.*`, { encoding: false, dot: true })
    .pipe(plugins.handleError('FTP'))
    .pipe(ftpConnect.dest(`/${filePaths.ftp}/${filePaths.projectDirName}`));
};

export { ftp };
