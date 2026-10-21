import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { styleText } from 'node:util';
import fontEditor from 'fonteditor-core';
import wawoff2 from 'wawoff2';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const { Font } = fontEditor;

const fontWeights = {
  thin: 100,
  hairline: 100,
  extralight: 200,
  ultralight: 200,
  light: 300,
  regular: 400,
  normal: 400,
  book: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  extrabold: 800,
  ultrabold: 800,
  heavy: 900,
  black: 900,
};

const srcFonts = filePaths.src.fonts;
const buildFonts = filePaths.build.fonts;

const success = (text) => console.log(styleText(['bold', 'white', 'bgGreenBright'], text));

const getFiles = (dir, extensions) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((file) => extensions.includes(path.extname(file).toLowerCase()))
    : [];

/** Ошибка конвертации одного шрифта: в dev — уведомление, в build — остановка сборки */
const handleFontError = (file, error) => {
  error.message = `${file}: ${error.message}`;
  plugins.notifyError('FONTS', error);

  if (app.isBuild) throw error;
};

/** .otf → .ttf (результат кладётся рядом, в src/fonts) */
const otfToTtf = async () => {
  for (const file of getFiles(srcFonts, ['.otf'])) {
    const ttfPath = path.join(srcFonts, `${path.parse(file).name}.ttf`);

    if (fs.existsSync(ttfPath)) continue;

    try {
      const font = Font.create(fs.readFileSync(path.join(srcFonts, file)), { type: 'otf' });

      fs.writeFileSync(ttfPath, font.write({ type: 'ttf', toBuffer: true }));
    } catch (error) {
      handleFontError(file, error);
    }
  }
};

/** .ttf → .woff + .woff2 в dist/fonts. Готовые .woff/.woff2 из src/fonts просто копируются */
const ttfToWoff = async () => {
  fs.mkdirSync(buildFonts, { recursive: true });

  await Promise.all(
    getFiles(srcFonts, ['.ttf']).map(async (file) => {
      const { name } = path.parse(file);

      try {
        const input = fs.readFileSync(path.join(srcFonts, file));
        const woff = Font.create(input, { type: 'ttf', hinting: true, kerning: true }).write({
          type: 'woff',
          hinting: true,
          kerning: true,
          toBuffer: true,
          deflate: (data) => [...zlib.deflateSync(Buffer.from(data))],
        });

        fs.writeFileSync(path.join(buildFonts, `${name}.woff`), woff);
        fs.writeFileSync(path.join(buildFonts, `${name}.woff2`), await wawoff2.compress(input));
      } catch (error) {
        handleFontError(file, error);
      }
    })
  );

  for (const file of getFiles(srcFonts, ['.woff', '.woff2'])) {
    fs.copyFileSync(path.join(srcFonts, file), path.join(buildFonts, file));
  }
};

/**
 * Разбор имени файла: Inter-BoldItalic → { family: 'Inter', weight: 700, style: 'italic' }
 * Для вариативных шрифтов (Inter-Variable, Inter[wght]) — диапазон 100 900
 */
const parseFontName = (fileName) => {
  const [family, ...rest] = fileName.split('-');
  const modifier = rest.join('').toLowerCase();
  const style = /italic|oblique/.test(modifier) ? 'italic' : 'normal';

  if (/variable|\[wght/.test(fileName.toLowerCase())) {
    return { family: family.replace(/\[.*$/, ''), weight: '100 900', style };
  }

  const weightName = modifier.replace(/italic|oblique/g, '') || 'regular';

  return { family, weight: fontWeights[weightName] ?? 400, style };
};

/** Создаёт src/scss/config/fonts.scss с @font-face для всех шрифтов из dist/fonts */
const fontStyle = async () => {
  const fontStylesFile = `${filePaths.srcFolder}/scss/config/fonts.scss`;
  const fontFiles = getFiles(buildFonts, ['.woff', '.woff2']);

  if (!fontFiles.length) return;

  if (fs.existsSync(fontStylesFile)) {
    success('Файл scss/config/fonts.scss уже существует.\nДля обновления файла нужно его удалить!');
    return;
  }

  const fontNames = [...new Set(fontFiles.map((file) => path.parse(file).name))];

  const css = fontNames
    .map((fileName) => {
      const { family, weight, style } = parseFontName(fileName);
      const sources = ['woff2', 'woff']
        .filter((ext) => fontFiles.includes(`${fileName}.${ext}`))
        .map((ext) => `url("../fonts/${fileName}.${ext}") format("${ext}")`)
        .join(', ');

      return `@font-face {\n\tfont-family: "${family}";\n\tfont-display: swap;\n\tsrc: ${sources};\n\tfont-weight: ${weight};\n\tfont-style: ${style};\n}\n`;
    })
    .join('');

  fs.writeFileSync(fontStylesFile, css);
  success('[Файл fonts.scss успешно записан]');
};

export { otfToTtf, ttfToWoff, fontStyle };
