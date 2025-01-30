/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый (не вызванный) код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
import {
    isWebp,
    headerFixed,
    togglePopupWindows,
    addTouchClass,
    addLoadedClass,
    Tabs,
    submitForm
} from './modules';

// import BurgerMenu from './modules/BurgerMenu';

// import Tabs from 'modules/Tabs';

// import { MousePRLX } from './libs/parallaxMouse'

// import AOS from 'aos'

import Swiper, { Navigation, Pagination } from 'swiper';
import validationForm from "./modules/validationForm.js";

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML
 ! (i) необходимо для корректного отображения webp из css
 */
isWebp();

/* Добавление класса touch для HTML если браузер мобильный */
// addTouchClass();

/* Добавление loaded для HTML после полной загрузки страницы */
// addLoadedClass();

/* Модуль для работы с меню (Бургер) */
// new BurgerMenu().init();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 */
// AOS.init();

/** Параллакс мышей */
// const mousePrlx = new MousePRLX({});

/** Фиксированный header */
// headerFixed();

/**
 *  Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * И на кнопку, которая вызывает окно так же повешай атрибут data-type="<название окна>"

 * На обертку(враппер) окна добавь класс _overlay-bg
 * На кнопку для закрытия окна добавь класс button-close
 */
// togglePopupWindows();

// const tabs = new Tabs('default-tabs', {});

const maskDropDownResizer = () => {
    [...document.querySelectorAll('input[type="tel"]')].map((item) => {
        const wrapper = item.closest('.iti--inline-dropdown');
        const droppdown = wrapper?.querySelector('[id*="dropdown-content"]');

        if(droppdown) {
            droppdown.style.width = `${wrapper.clientWidth}px`;
        }
    });
}
$(document).ready(function() {
    const inputTel = document.querySelectorAll("input[type='tel']");
    const buttonDisableStateHandler = (input) => {
        const form = input?.closest('form');
        const requiredInputs = [...form?.querySelectorAll('input[required]')];
        const submitButton = form.querySelector('button.btn');

        if(submitButton) {
            submitButton.disabled = requiredInputs.some((input) => !input.validity.valid);
        }
    }
    const onInputValidate = (input) => {
        input.pristine.self.validate(input);
        buttonDisableStateHandler(input);
    };


    inputTel.forEach((input) => {
        // Инициализация intlTelInput для каждого инпута
        const iti = window.intlTelInput(input, {
            initialCountry: "RU", // Страна по умолчанию
            i18n: {
                searchPlaceholder: "Поиск",
            },
            geoIpLookup: function (callback) {
                fetch("https://ipapi.co/json/")
                    .then((res) => res.json())
                    .then((data) => callback(data.country_code))
                    .catch(() => callback("RU"));
            },
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input/build/js/utils.js",
        });
        iti.promise.then(maskDropDownResizer);

        input.pristine.self.addValidator(input, () => {
            return input.validity.valid
        }, 'Номер должен соответствовать формату');

        // Функция для обновления placeholder и маски
        function updatePlaceholderAndMask() {
            const dialCode = iti.getSelectedCountryData().dialCode;
            const invelidValidationText = input.closest('.form-block__controls')?.querySelector('.form-control__message')?.textContent || 'Обязательное поле';
            const config = {
                clearMaskOnLostFocus: true,
                clearIncomplete: true,
                showMaskOnHover: true,
                onincomplete: function () {
                    input.setCustomValidity(invelidValidationText);
                    onInputValidate(input);
                },
                oncomplete: function () {
                    input.setCustomValidity('');
                    onInputValidate(input);
                },
                onKeyDown: function() {
                    setTimeout(() => {
                        const validity = input.inputmask.isComplete() ? '' : invelidValidationText;

                        input.setCustomValidity(validity);
                        onInputValidate(input);
                    }, 0);
                }
            };

            let maskPattern;
            if (dialCode === "1") { // США
                maskPattern = "+1 (999) 999-9999";
                config.placeholder = `+${dialCode} (___) ___-____`;
            } else if (dialCode === "7") { // Россия
                maskPattern = "+7 (999) 999-99-99";
                config.placeholder = `+${dialCode} (___) ___-__-__`;
            } else {
                maskPattern = `+${dialCode.replace(/9/g, `${'\\9'}`)} 999 999 9999`; // Общий шаблон
                config.placeholder = `+${dialCode} ___ ___ ____`;
            }

            Inputmask(maskPattern, config).mask(input);
        }

        updatePlaceholderAndMask();

        // Обновляем placeholder и маску при смене страны
        input.addEventListener("countrychange", () => {
            updatePlaceholderAndMask();
            input.blur(); // Убираем фокус, чтобы избежать проблем с отображением
        });
    });
});

window.addEventListener('resize', maskDropDownResizer);

$.datepicker.regional['ru'] = {
    closeText: 'Закрыть',
    prevText: 'Предыдущий',
    nextText: 'Следующий',
    currentText: 'Сегодня',
    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
    dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
    dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    weekHeader: 'Не',
    dateFormat: 'dd.mm.yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};
$.datepicker.setDefaults($.datepicker.regional['ru']);

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll(".pure-material-textfield-outlined > input, .pure-material-textfield-outlined > textarea").forEach(input => {
        function updateLabel() {
            if (input.value.trim() !== "") {
                input.classList.add("filled");
            } else {
                input.classList.remove("filled");
            }
        }

        input.addEventListener("input", updateLabel);
        input.addEventListener("blur", updateLabel);
        updateLabel();
    });





    validationForm();
})
