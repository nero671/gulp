export const customSelect  = () => {
    const select = document.querySelector('.custom-select');
    const selectItems = select?.querySelector('.select-items');
    const selectSelected = select?.querySelector('.select-selected span');

    select?.addEventListener('click', function () {
        select.classList.toggle('show');
    });

    selectItems?.querySelectorAll('div').forEach((option) => {
        option.addEventListener('click', function () {
            selectSelected.textContent = option.textContent;
            selectItems.classList.remove('show');
        });
    });
}
