// const cookiesAcceptName = 'COOKIES_ACCEPTED';
// const cookiesDeclainName = 'COOKIES_DECLAINED';
const cookiesClassMod = 'is-active';

const getCookie = (name) => {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = (name, value, options = {}) => {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

const deleteCookie = (name) => {
  setCookie(name, '', {
    'max-age': -1,
  });
};

const getCookieBanner = () => document.querySelector('[data-cookies-banner]');

const showCookiesBanner = () => {
  const cookisBanner = getCookieBanner();

  if (cookisBanner) {
    cookisBanner.classList.add(cookiesClassMod);
  }
};

const hideCookiesBanner = () => {
  const cookisBanner = getCookieBanner();

  if (cookisBanner) {
    cookisBanner.classList.remove(cookiesClassMod);
  }
};

// const acceptCookiesHandler = () =>
//   [...document.querySelectorAll('.js-cookies-accept')].map((button) => {
//     button.addEventListener('click', () => {
//       deleteCookie(cookiesDeclainName);
//       setCookie(cookiesAcceptName, true);
//       hideCookiesBanner();
// 
//       setTimeout(() => {
//         getCookieBanner()?.remove;
//       }, 300);
//     });
//   });

// const declainCookiesHandler = () =>
//   [...document.querySelectorAll('.js-cookies-declain')].map((button) => {
//     button.addEventListener('click', () => {
//       deleteCookie(cookiesAcceptName);
//       setCookie(cookiesDeclainName, true);
//       hideCookiesBanner();
// 
//       setTimeout(() => {
//         getCookieBanner()?.remove;
//       }, 300);
//     });
//   });

const showCookiesHandler = () =>
  [...document.querySelectorAll('.js-cookies-banner-show')].map((button) => {
    button.addEventListener('click', showCookiesBanner);
  });

const hideCookiesHandler = () =>
  [...document.querySelectorAll('.js-cookies-banner-hide')].map((button) => {
    button.addEventListener('click', hideCookiesBanner);
  });

export const cookiesInit = () => {
  showCookiesBanner();
  showCookiesHandler();
  hideCookiesHandler();
  // acceptCookiesHandler();
  // declainCookiesHandler();
};
