export const countNumAnim = () => {
    function animateCounter(element, speedMultiplier = 1, useDecimals = false) {
        if (!element) return;

        const target = parseFloat(element.getAttribute("data-target").replace(',', '.'));
        let duration = parseInt(element.getAttribute("data-duration"));

        const adjustedDuration = duration * Math.log10(target * 2) / speedMultiplier;

        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            let progress = Math.min(elapsed / adjustedDuration, 1);
            let value = target * progress;

            if (useDecimals) {
                element.textContent = value.toFixed(2);
            } else {
                element.textContent = Math.floor(value);
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = useDecimals ? target.toFixed(2) : target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    let hasExecuted = false;

    const onScroll = () => {
        if (hasExecuted) return;
        const aboutAdv = document.querySelector('.about-adv__wrapper');
        const rect = aboutAdv?.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect?.top <= windowHeight && rect?.bottom >= 0) {
            hasExecuted = true;

            const numbers1 = document.querySelector('#number1');
            const numbers2 = document.querySelector('#number2');
            const numbers3 = document.querySelector('#number3');
            const numbers4 = document.querySelector('#number4');

            animateCounter(numbers1);
            animateCounter(numbers2);
            animateCounter(numbers3, 1, true);
            animateCounter(numbers4, 0.7);
        }
    }

    window.addEventListener('scroll', onScroll);
}
