export const dropdown = () => {
    document.body.addEventListener('click', (e) => {
        const dropdown = e.target.closest('.js-dropdown');
        const allDropdowns = document.querySelectorAll('.js-dropdown.active');

        if (dropdown) {
            if (dropdown.classList.contains('active')) {
            } else {
                allDropdowns.forEach(d => d.classList.remove('active'));
                dropdown.classList.add('active');
            }
        } else {
            allDropdowns.forEach(d => d.classList.remove('active'));
        }
    });
};
