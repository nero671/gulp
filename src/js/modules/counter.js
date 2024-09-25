export const counter = () => {
    const counterNode  = document.querySelectorAll('.counter');

    counterNode.forEach(counter => {
        const minusButton = counter.querySelector('.minus');
        const plusButton = counter.querySelector('.plus');
        const countInput = counter.querySelector('.count');
        const updateMinusButtonState = () => {
            if (parseInt(countInput.value) <= 1) {
                minusButton.setAttribute('disabled', true);
            } else {
                minusButton.removeAttribute('disabled');
            }
        };

        minusButton.addEventListener('click', () => {
            let currentValue = parseInt(countInput.value);
            if (currentValue > 1) {
                countInput.value = currentValue - 1;
                updateMinusButtonState();
            }
        });

        plusButton.addEventListener('click', () => {
            let currentValue = parseInt(countInput.value);
            countInput.value = currentValue + 1;
            updateMinusButtonState();
        });

        updateMinusButtonState();
    });
}
