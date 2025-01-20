export const customSelect  = () => {
    const select = document.querySelector('.custom-select');
    const selectItems = select?.querySelector('.select-items');
    const selectSelected = select?.querySelector('.select-selected span');

    select?.addEventListener('click', function () {
        select.classList.toggle('show');
    });

    selectItems?.querySelectorAll('div').forEach((option) => {
        option.addEventListener('click', function () {
            selectItems.querySelectorAll('div').forEach((el) => {
                el.classList.remove('active');
            });

            option.classList.add('active');

            selectSelected.textContent = option.textContent;

            selectItems.classList.remove('show');
        });
    });
}
