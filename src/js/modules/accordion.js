export const useAccordion = (accordionWrapper) => {
    const accordion = accordionWrapper;

    const open = (button, dropdown, arrow) => {
        dropdown.style.height = "".concat(dropdown.scrollHeight + "px");
        button.classList.add('active');
        dropdown.classList.add('active');
        arrow.classList.add('active');
    };

    const close = (button, dropdown, arrow) => {
        button.classList.remove('active');
        dropdown.classList.remove('active');
        dropdown.style.height = '';
        arrow.classList.remove('active');
    };

    if (accordion) {
        accordion.addEventListener('click', function (e) {
            const target = e.target;

            if (target.closest('[class*="__title"]')) {
                const parent = target.closest('[class$="__item"]');
                const button = target.closest('[class*="__title"]');
                const dropdown = parent.querySelector('[class*="__content"]');
                const arrow = parent.querySelector('[class*="__title"] svg');

                dropdown.classList.contains('active') ? close(button, dropdown, arrow) : open(button, dropdown, arrow);
            }
        });
    }
};
