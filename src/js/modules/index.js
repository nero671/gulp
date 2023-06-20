import toggleBodyLock from './../helpers/toggleBodyLock';
import { html, firstScreen, header } from './../helpers/elementsNodeList';

// Проверка браузера на поддержку .webp изображений ======================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image();

    webP.onload = webP.onerror = () => callback(webP.height === 2);
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  };

  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp';
    html.classList.add(className);

    console.log(support ? 'webp поддерживается' : 'webp не поддерживается');
  });
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
};

/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch');
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded');
    }, 0);
  });
}

// Получение хеша в адресе сайта
const getHash = () => location.hash?.replace('#', '');

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : location.href.split('#')[0];
  history.pushState('', '', hash);
}

// Функция для фиксированной шапки при скролле ===========================================================
function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('sticky', !entry.isIntersecting);
  });

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen);
  }
}

// Универсальная функция для открытия и закрытия попапов ==================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      );

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open');
        });
      }

      popup.classList.add('_is-open');
      toggleBodyLock(true);
    }

    if (
      target.classList.contains('_overlay-bg') ||
      target.closest('.button-close')
    ) {
      const popup = target.closest('._overlay-bg');

      popup.classList.remove('_is-open');
      toggleBodyLock(false);
    }
  });
};

const Tabs = (linkWrapper, link, content) => {
  const toggleTab = (index) => {
    for(let i = 0; i < content.length; i++) {
      if (index === i) {
        link[i].classList.add('active');
        content[i].classList.add('active');
      } else {
        link[i].classList.remove('active');
        content[i].classList.remove('active');
      }
    }
  }

  if (linkWrapper) {
    linkWrapper.addEventListener('click', (e) => {
      let target = e.target;
      const linkClass = '.' + link[0].classList[0];

      if (target.matches(linkClass)) {
        console.log('test')
        link.forEach((item, i) => {
          if (item === target) {
            toggleTab(i);
          }
        })
      }
    })
  }
}

//Валидация

const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}


const submitForm = (formName) => {
  const form = formName;
  const email = form.querySelector('input[name="email"]');


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = email.value.trim();
    const message = form.querySelector('.input__mail span');

    const changeInput = () => {
      email.addEventListener('input', () => {
        email.style.cssText = 'border: initial';
        message.style.opacity = '0';
      })
    }

    const clearInput = () => {
      setTimeout(() => {
        email.style.cssText = 'border: initial';
        message.style.opacity = '0';
        email.value = '';
      }, 3000)
    }


    if (validateEmail(emailValue)) {
      form.submit();
      email.style.cssText = 'border: 1px solid green';
      message.style.cssText = 'opacity:1;color:green;';
      message.textContent = 'Success'
      clearInput();
    } else {
      email.style.cssText = 'border: 1px solid red';
      message.style.cssText = 'opacity:1;color:red;';
      message.textContent = 'Incorrect Email'
      changeInput();

    }
  })

}

export {
  isWebp,
  isMobile,
  addTouchClass,
  headerFixed,
  togglePopupWindows,
  addLoadedClass,
  getHash,
  setHash,
  Tabs,
  submitForm
};
