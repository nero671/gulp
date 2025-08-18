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
