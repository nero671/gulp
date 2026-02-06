export const customSelect = () => {
    const initSelect = (wrapper) => {
        const nativeSelect = wrapper.querySelector('select');
        const customSelect = wrapper.querySelector('.custom-select');

        if (!nativeSelect || !customSelect) return;

        const selected = document.createElement('div');
        selected.className = 'custom-select__selected';
        selected.textContent = nativeSelect.options[nativeSelect.selectedIndex]?.textContent || 'Выбрать';

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'custom-select__options';

        [...nativeSelect.options].forEach(option => {
            if (!option.value) return;

            const customOption = document.createElement('div');
            customOption.className = 'custom-select__option';
            customOption.textContent = option.textContent;

            customOption.addEventListener('click', (e) => {
                e.stopPropagation();

                selected.textContent = option.textContent;
                nativeSelect.value = option.value;
                nativeSelect.dispatchEvent(new Event('change'));

                customSelect.classList.remove('open');
            });

            optionsContainer.appendChild(customOption);
        });

        customSelect.innerHTML = '';
        customSelect.appendChild(selected);
        customSelect.appendChild(optionsContainer);
    };

    document.querySelectorAll('.custom-select-wrapper').forEach(initSelect);

    document.addEventListener('click', (e) => {
        const customSelect = e.target.closest('.custom-select');

        if (customSelect) {
            const isCurrentlyOpen = customSelect.classList.contains('open');

            document.querySelectorAll('.custom-select.open').forEach(openSelect => {
                openSelect.classList.remove('open');
            });

            if (!isCurrentlyOpen) {
                customSelect.classList.add('open');
            }

            return;
        }

        if (!e.target.closest('.custom-select-wrapper')) {
            document.querySelectorAll('.custom-select.open').forEach(openSelect => {
                openSelect.classList.remove('open');
            });
        }
    });
};
