const initCustomSelects = () => {
    const wrappers = document.querySelectorAll('.custom-select-wrapper');

    wrappers.forEach(wrapper => {
        const nativeSelect = wrapper.querySelector('select');
        const customSelect = wrapper.querySelector('.custom-select');

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

            customOption.addEventListener('click', () => {
                selected.textContent = option.textContent;
                nativeSelect.value = option.value;
                nativeSelect.dispatchEvent(new Event('change'));
                customSelect.classList.remove('open');
            });

            optionsContainer.appendChild(customOption);
        });

        customSelect.appendChild(selected);
        customSelect.appendChild(optionsContainer);

        selected.addEventListener('click', () => {
            document.querySelectorAll('.custom-select.open').forEach(openSelect => {
                if (openSelect !== customSelect) openSelect.classList.remove('open');
            });
            customSelect.classList.toggle('open');
        });

        document.addEventListener('click', e => {
            if (!wrapper.contains(e.target)) {
                customSelect.classList.remove('open');
            }
        });
    });
}

