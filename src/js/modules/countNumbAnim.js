export const countNumAnim = () => {

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function animateCounters(elements, totalDuration = 2000) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);

            elements.forEach(({ el, target }) => {
                const value = Math.floor(target * progress);
                el.textContent = value >= 10000 ? formatNumber(value) : value;

                if (progress === 1) {
                    el.textContent = formatNumber(target);
                }
            });

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    let hasExecuted = false;

    function checkAndRun() {
        if (hasExecuted) return;

        const aboutAdv = document.querySelector('.about-adv__wrapper');
        if (!aboutAdv) return;

        const rect = aboutAdv.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight && rect.bottom >= 0) {
            hasExecuted = true;

            const elements = [
                document.querySelector('#number1'),
                document.querySelector('#number2'),
                document.querySelector('#number3'),
                document.querySelector('#number4')
            ].filter(Boolean).map(el => ({
                el,
                target: parseFloat(el.getAttribute("data-target").replace(',', '.'))
            }));

            animateCounters(elements, 2000);
        }
    }

    window.addEventListener('scroll', checkAndRun);
    window.addEventListener('load', checkAndRun);
};
