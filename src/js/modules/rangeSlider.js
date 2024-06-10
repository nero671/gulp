import noUiSlider from 'nouislider';

const rangeSlider = () => {
    const wraps = document.querySelectorAll('.range-slider');

    if (!wraps.length) return;

    wraps.forEach((wrap) => {
        const element = wrap.querySelector('.range-slider__element');
        const inputs = wrap.querySelectorAll('.range-slider__input');

        noUiSlider.create(element, {
            start: [Number(wrap.dataset.rangeStart), Number(wrap.dataset.rangeEnd)],
            connect: true,
            range: {
                min: [Number(wrap.dataset.rangeMin)],
                max: [Number(wrap.dataset.rangeMax)],
            },
            format: {
                from: (value) => Math.round(value),
                to: (value) => Math.round(value),
            },
        });

        element.noUiSlider.on('update', (values, handle) => {
            inputs[handle].value = values[handle];
        });

        inputs.forEach((input, handle) => {
            input.addEventListener('change', function () {
                element.noUiSlider.setHandle(handle, this.value);
            });

            input.addEventListener('keydown', (e) => {
                const values = element.noUiSlider.get();
                const value = Number(values[handle]);

                const steps = element.noUiSlider.steps();

                const step = steps[handle];

                let position;

                switch (e.which) {
                    case 13:
                        element.noUiSlider.setHandle(handle, this.value);
                        break;
                    case 38:
                        // eslint-disable-next-line prefer-destructuring
                        position = step[1];

                        if (position === false) {
                            position = 1;
                        }

                        if (position !== null) {
                            element.noUiSlider.setHandle(handle, value + position);
                        }

                        break;

                    case 40:
                        // eslint-disable-next-line prefer-destructuring
                        position = step[0];

                        if (position === false) {
                            position = 1;
                        }

                        if (position !== null) {
                            element.noUiSlider.setHandle(handle, value - position);
                        }

                        break;
                    default:
                        break;
                }
            });
        });
    });
};

export default rangeSlider;
