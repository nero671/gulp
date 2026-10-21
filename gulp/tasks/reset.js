import { rm } from 'node:fs/promises';
import { filePaths } from '../config/paths.js';

const reset = () => rm(filePaths.clean, { recursive: true, force: true });

export { reset };
