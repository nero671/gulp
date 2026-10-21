import path from 'path';

const projectDirName = path.basename(path.resolve());
const buildFolder = `./dist`;
const srcFolder = `./src`;

/** Расширения растровых картинок (в обоих регистрах, т.к. glob чувствителен к регистру) */
const imageExt = '{jpg,jpeg,png,gif,webp,avif,ico,JPG,JPEG,PNG,GIF,WEBP,AVIF,ICO}';

const filePaths = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    static: `${buildFolder}/static/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/images/**/*.${imageExt}`,
    svg: `${srcFolder}/images/**/*.svg`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,
    htmlPartials: `${srcFolder}/html`,
    fonts: `${srcFolder}/fonts`,
    static: `${srcFolder}/static/**/*.*`,
    svgIcons: `${srcFolder}/icons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/images/**/*.{${imageExt.slice(1, -1)},svg,SVG}`,
    svgIcons: `${srcFolder}/icons/*.svg`,
    static: `${srcFolder}/static/**/*.*`,
    rootFiles: `${srcFolder}/{favicon.ico,.htaccess}`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  projectDirName,
  ftp: ``, // Путь к нужной папке на удаленном сервере. Gulp добавит имя папки проекта автоматически
};

export { filePaths };
