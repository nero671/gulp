# Start Template: Gulp + WebPack + Babel

## Требования

- **Node.js 22.12+** (в проекте есть `.nvmrc`: `nvm use`).

## Для работы используйте такие команды

- Для установки всех зависимостей: `$ npm install`;
- Для запуска сборщика Gulp нужно использовать: `$ npm run dev`;
- Для сборки проекта в режиме `"production"`: `$ npm run build`;
- Архив для заказчика: `$ npm run zip`;
- Выгрузка на хостинг по FTP: `$ npm run deployFTP`;
- Публикация на GitHub Pages: `$ npm run deploy`;
- Форматирование кода: `$ npm run prettier`.

## Поддерживаемые браузеры

Список браузеров задаётся **в одном месте** — в поле `"browserslist"` файла `package.json`.
По нему одновременно работают:

- **Autoprefixer** — добавляет вендорные префиксы (`-webkit-`, `-moz-`) в CSS;
- **Babel** — переводит современный JS в код, понятный этим браузерам;
- **core-js** — автоматически подключает только те полифилы, которые реально нужны вашему коду.

По умолчанию: все актуальные браузеры + Safari / iOS 14 и новее.
Посмотреть итоговый список: `$ npx browserslist`.

## Что делает Gulp?

- собирает страницы из частей через `@@include` (gulp-file-include) и Handlebars-шаблоны (`{{> components/...}}`);
- сжимает HTML и удаляет комментарии в режиме `production`;
- добавляет к `css`/`js` метку версии `?_v=...` в режиме `production`, чтобы браузер не показывал старый кэш;
- собирает SCSS файлы, добавляет вендорные префиксы (и в `dev`, и в `production`);
- в режиме `production` группирует медиа-запросы, сжимает CSS (cssnano) и делает копию без сжатия;
- в режиме разработки создаёт source maps для CSS и JS;
- конвертирует шрифты `.otf` в `.ttf`, и из `.ttf` в `woff/woff2` (без компиляции нативных модулей);
- создает файл для подключения шрифтов. Данный файл создается по такому пути: `src/scss/config/fonts.scss`, выглядит это так:

```scss
@font-face {
  font-family: "Inter";
  font-display: swap;
  src: url('../fonts/Inter-Bold.woff2') format('woff2'), url('../fonts/Inter-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
}
```

Начертание определяется по имени файла: `Inter-Bold`, `Inter-BoldItalic`, `Inter-SemiBold`, `Inter-Variable` и т.д.

### ВНИМАНИЕ!!!

> Если в папке `src/scss/config` - уже есть файл `fonts.scss` - тогда при добавлении новых шрифтов **НУЖНО УДАЛИТЬ** старый файл `fonts.scss`. Не переживай, при повторном запуске сборки - Gulp все новые шрифты сконвертирует и создаст новый файл `fonts.scss`.

### Картинки и WebP

В режиме `production` все `jpg`/`jpeg`/`png` из `src/images` автоматически:

- сжимаются (если сжатый файл получился больше исходника — остаётся исходник);
- конвертируются в `.webp` (через [sharp](https://sharp.pixelplumbing.com/), никаких бинарников, которые нужно докачивать при установке).

Подключение webp происходит само:

- **HTML** — `<img src="@img/photo.jpg">` превращается в `<picture>` с webp-источником. Работает с многострочными тегами, `srcset`, `sizes` и ленивой загрузкой через `data-src`. Внешние ссылки, `svg`, `gif` и уже готовые `<picture>` не трогаются. Отключить для конкретной картинки: атрибут `data-no-webp`;
- **CSS** — `background: url(@img/photo.jpg)` дополняется `image-set()` с webp. Старые браузеры просто используют исходный `jpg`/`png`.

> `<picture>` получает `display: contents`, поэтому раскладка картинок одинаковая в `dev` и `production`.

В режиме `dev` картинки просто копируются (так быстрее).

### Остальное

- копирует папку `/static` с содержимым в финальную сборку. То есть любые файлы можно поместить в эту папку и она будет добавлена в финальную сборку;
- собирает svg-спрайт из `src/icons/*.svg` в `images/icons/icons.svg` (автоматически при `dev`/`build`, либо отдельно: `$ npm run svgSprite`);
- перед каждым запуском сборщика чистит папку с финальным проектом, чтобы не собирать мусор;
- отдельной командой `$ npm run zip` можно заархивировать финальную папку для заказчика **с именем проекта**;
- так же для разработки `gulp` запускает сервер с автоматической перезагрузкой окна в браузере при изменении файлов в проекте;
- отдельной командой `$ npm run deployFTP` финальный проект выгружается на хостинг. Опции для отправки проекта на нужный хостинг указываются в файле: `gulp/config/ftp.js`.

### Ошибки

- в режиме `dev` ошибка (SCSS, JS, HTML) показывается системным уведомлением, а сервер и слежение за файлами продолжают работать;
- в режиме `build`/`zip`/`deployFTP` ошибка **останавливает сборку**, чтобы битый проект не ушёл заказчику или на хостинг.

## Что делает WebPack?

- именно `webpack` в данной сборке занимается обработкой файлов c JavaScript;
- поддерживается модульное подключение скриптов `import/export`;
- при импорте нет необходимости писать расширение файла `.js`, так же если осуществляется импорт из файла `index.js` необязательно это указывать:

```javascript
import * as flsFunctions from './modules' // './modules/index.js'
```

- `webpack` c помощью `babel` позволяет тебе писать код на любимом **ES6+**;
- в режиме `"production"` при финальной сборке файлы JS сжимаются, а лишние комментарии удаляются.

## Готовые компоненты

HTML — `src/html/components`, стили подключаются автоматически, JS — `src/js/modules` (раскомментировать в `app.js`).

| Компонент | Разметка | JS |
| --- | --- | --- |
| Аккордеон (плавное раскрытие на CSS Grid) | `components/accordion` | `initAccordions()` |
| Табы (с управлением с клавиатуры) | `components/tabs` | `initTabs()` |
| Модальное окно (закрытие по фону / Escape) | `components/popup` | `togglePopupWindows()` |
| Кастомный select (синхронизирован с нативным) | `components/customSelect` | `customSelect()` |
| Выпадающий список | `components/dropdown` | `dropdown()` |
| Баннер cookies (запоминает выбор) | `components/cookies-banner` | `cookiesInit()` |
| Счётчик `+ / -` | `components/counter` | `counter()` |
| Загрузка файла | `components/file` | `customFile()` |
| Хлебные крошки | `components/breadcrumbs` | — |
| Пагинация | `components/pagination` | — |
| Слайдер диапазона | `components/range` | `rangeSlider()` (нужен `nouislider`) |
| Анимация чисел | `<span data-count-target="12 500">0</span>` | `countNumAnim()` |

Полезные миксины и функции SCSS (`src/scss/config/mixins.scss`):

```scss
.title {
  font-size: fluid(28, 48);           // резиновый размер через clamp(): 28px → 48px
  padding: rem(24);                   // 1.5rem

  @include media(767) { ... }         // @media (max-width: 767.98px)
  @include mediaMin(768) { ... }      // @media (min-width: 768px)
  @include hover { color: red; }      // hover только для мыши, без «залипания» на телефонах
}
```
