import replace from 'gulp-replace'; // Поиск и замена
import plumber from 'gulp-plumber'; // Обработка ошибок
import notify from 'gulp-notify'; // Сообщения (подсказки)
import browserSync from 'browser-sync'; // Локальный сервер
import newer from 'gulp-newer'; // Проверка обновления
import ifPlugin from 'gulp-if'; // Условное ветление

const concatPathAndFileName = (path, files) => {
  return files.map((file) => `${path}/${file}`);
};

/** Системное уведомление об ошибке (macOS / Windows / Linux) */
const notifyError = (taskName, error) => {
  notify
    .onError({
      title: taskName,
      message: 'Error: <%= error.message %>',
    })
    .call({}, error);
};

/**
 * В режиме разработки ошибка показывается уведомлением, а watch продолжает работать.
 * В режиме build ошибка останавливает сборку, чтобы битый проект не ушёл в dist/zip/ftp.
 */
const handleError = (taskName) => {
  return plumber({
    errorHandler(error) {
      notifyError(taskName, error);

      if (app.isBuild) {
        throw error;
      }

      this.emit('end');
    },
  });
};

/** Перезагрузка браузера, только если сервер запущен (в build его нет) */
const reloadBrowser = () => {
  if (browserSync.active) browserSync.reload();
};

export const plugins = {
  if: ifPlugin,
  replace,
  plumber,
  notify,
  browserSync,
  newer,
  concat: concatPathAndFileName,
  handleError,
  notifyError,
  reloadBrowser,
};
