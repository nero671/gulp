export const dropdown = () => {
    const goodCatalogFilters = document.querySelector('.good-catalog-filters');
    document.body.addEventListener('click', (e) => {
        if(e.target.closest('.js-dropdown')) {
            e.target.classList.toggle('active');
        }
    });

    goodCatalogFilters?.addEventListener('click', (e) => {
        if (e.target.matches('.filter-dropdown')) {
            const dropdowns = goodCatalogFilters.querySelectorAll('.filter-dropdown');
            const targetDropdown = e.target;

            const isActive = targetDropdown.classList.contains('active');

            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove('active');
            });

            if (!isActive) {
                targetDropdown.classList.add('active');
            }
        }
    });



}

