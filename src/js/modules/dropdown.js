export const dropdown = () => {
    document.body.addEventListener('click', (e) => {
        const dropdown = e.target.closest('.js-dropdown');
        const allDropdowns = document.querySelectorAll('.js-dropdown.active');
        const isOption = e.target.closest('.js-dropdown__option');

        if (dropdown) {
            if (!isOption) {
                dropdown.classList.toggle('active');
            }

            allDropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });
        } else {
            allDropdowns.forEach(d => d.classList.remove('active'));
        }
    });
};


const select = document.querySelector('.custom-select__selected');
const shops = document.querySelectorAll('.order-page__delivery-shop');
const shopsList = document.querySelector('.shops-list');

function updateActiveShops() {
    const selectedText = select.textContent;

    shops.forEach(shop => {
        const shopCity = shop.getAttribute('data-city');

        if (selectedText === 'Все') {
            shop.classList.add('active');
        } else {
            shop.classList.toggle('active', shopCity === selectedText);
        }
    });
}

window.addEventListener('DOMContentLoaded', updateActiveShops);

shopsList?.addEventListener('click', updateActiveShops);
