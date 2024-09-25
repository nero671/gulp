export const countNumAnim = () => {
    document.addEventListener("DOMContentLoaded", function() {
        function animateCounter(element) {
            let target = parseInt(element.getAttribute("data-target"));
            let duration = parseInt(element.getAttribute("data-duration"));
            let count = 0;
            let stepTime = Math.abs(Math.floor(duration / target));

            function updateCounter() {
                element.textContent = count;
                if (count < target) {
                    count++;
                    setTimeout(updateCounter, stepTime);
                }
            }

            updateCounter();
        }

        let hasExecuted = false;
        const onScroll = () => {
            if (hasExecuted) return;
            const aboutAdv = document.querySelector('.about-adv__wrapper');
            const rect = aboutAdv?.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            const numbers1 = document.querySelector('#number1');
            const numbers2 = document.querySelector('#number2');
            const numbers3 = document.querySelector('#number3');
            const numbers4 = document.querySelector('#number4');


            if (rect?.top <= windowHeight && rect?.bottom >= 0) {
                hasExecuted = true;
                animateCounter(numbers1);
                animateCounter(numbers2);
                animateCounter(numbers3);
                animateCounter(numbers4);
            }
        }



        window.addEventListener('scroll', onScroll);

    });

}
