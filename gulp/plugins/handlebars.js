import fs from 'node:fs';
import path from 'node:path';
import { Transform } from 'node:stream';
import Handlebars from 'handlebars';

const PARTIAL_EXT = '.html';

/**
 * Регистрирует все .html файлы папки как partials.
 * Имя partial = путь относительно папки без расширения:
 * src/html/components/breadcrumbs/breadcrumbs.html → {{> components/breadcrumbs/breadcrumbs}}
 */
const registerPartials = (hbs, dir, root = dir) => {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      registerPartials(hbs, fullPath, root);
      continue;
    }

    if (path.extname(entry.name) !== PARTIAL_EXT) continue;

    const name = path
      .relative(root, fullPath)
      .slice(0, -PARTIAL_EXT.length)
      .split(path.sep)
      .join('/');

    hbs.registerPartial(name, fs.readFileSync(fullPath, 'utf8'));
  }
};

/**
 * Компиляция страниц через Handlebars.
 * Partials перечитываются при каждом запуске задачи, поэтому правки подхватываются в watch.
 */
export const compileHandlebars = ({ partialsDir, helpers = {}, data = {} }) => {
  const hbs = Handlebars.create();

  hbs.registerHelper(helpers);
  registerPartials(hbs, partialsDir);

  return new Transform({
    objectMode: true,
    transform(file, _encoding, callback) {
      if (file.isNull()) return callback(null, file);

      try {
        const template = hbs.compile(file.contents.toString());

        file.contents = Buffer.from(template(data));
        callback(null, file);
      } catch (error) {
        error.message = `${file.relative}: ${error.message}`;
        callback(error);
      }
    },
  });
};
