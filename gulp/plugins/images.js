import path from 'node:path';
import { Transform } from 'node:stream';
import sharp from 'sharp';

/** Настройки качества. webp ≈ как у прежнего gulp-webp, jpeg — mozjpeg как у imagemin */
const defaults = {
  webp: { quality: 80, effort: 5 },
  jpeg: { quality: 80, mozjpeg: true },
  png: { compressionLevel: 9, adaptiveFiltering: true, effort: 10 },
};

const optimizers = {
  '.jpg': (input, options) => sharp(input).rotate().jpeg(options.jpeg).toBuffer(),
  '.jpeg': (input, options) => sharp(input).rotate().jpeg(options.jpeg).toBuffer(),
  '.png': (input, options) => sharp(input).png(options.png).toBuffer(),
};

/**
 * Для каждой jpg/png картинки:
 * - создаёт рядом .webp копию;
 * - сжимает оригинал (если результат получился больше исходника — оставляет исходник).
 * Остальные форматы (gif, svg, webp, avif, ico) проходят без изменений.
 */
export const optimizeImages = (userOptions = {}) => {
  const options = {
    webp: { ...defaults.webp, ...userOptions.webp },
    jpeg: { ...defaults.jpeg, ...userOptions.jpeg },
    png: { ...defaults.png, ...userOptions.png },
  };

  let total = 0;
  let saved = 0;

  return new Transform({
    objectMode: true,
    async transform(file, _encoding, callback) {
      const optimize = optimizers[path.extname(file.path).toLowerCase()];

      if (file.isNull() || !optimize) return callback(null, file);

      try {
        const input = file.contents;
        const [webpBuffer, optimizedBuffer] = await Promise.all([
          sharp(input).rotate().webp(options.webp).toBuffer(),
          optimize(input, options),
        ]);

        const webpFile = file.clone({ contents: false });
        webpFile.extname = '.webp';
        webpFile.contents = webpBuffer;
        this.push(webpFile);

        if (optimizedBuffer.length < input.length) {
          saved += input.length - optimizedBuffer.length;
          file.contents = optimizedBuffer;
        }

        total += 1;
        callback(null, file);
      } catch (error) {
        error.message = `${file.relative}: ${error.message}`;
        callback(error);
      }
    },
    flush(callback) {
      if (total) {
        console.log(
          `[images] Обработано картинок: ${total}, сэкономлено ${(saved / 1024).toFixed(1)} KB`
        );
      }

      callback();
    },
  });
};
