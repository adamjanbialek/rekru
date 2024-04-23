$(document).ready(function() {
    const sliders = document.querySelectorAll('.slider');

    function runSliders() {
        sliders.forEach(slider => {
            const sliderContainerWidth = parseInt(window.getComputedStyle(slider.querySelector('.slider-container')).width);
            const sliderItemWidth = parseInt(window.getComputedStyle(slider.querySelector('.slider-item')).width);
            const sliderItemsFit = sliderContainerWidth / sliderItemWidth;
            const slides = slider.querySelectorAll('.slider-item');
            const itemsOutOfView = (slides.length - sliderItemsFit) + 1;
            const dotsContainer = slider.querySelector('.switcher');
            let dots = slider.querySelectorAll('.switcher-element');

            if(dots.length === 0) {
                slides.forEach((s, i) => {
                    s.style.transform = `translateX(${i * 100}%)`;
                    if(i < itemsOutOfView) {
                        dotsContainer.insertAdjacentHTML('beforeend',
                            `<div class="switcher-element ${i === 0 ? 'switcher-element--active' : ''}" data-dot="${i}"></div>`)
                    }
                });
                dots = slider.querySelectorAll('.switcher-element');
            } else {
                if(itemsOutOfView !== dots.length && itemsOutOfView > 0) {
                    while(dotsContainer.firstChild) {
                        dotsContainer.removeChild(dotsContainer.firstChild);
                    }
                }
                slides.forEach((s, i) => {
                    s.style.transform = `translateX(${i * 100}%)`;
                });
            }

            let curDot = 0;
            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    curDot = i;
                    slides.forEach((slide, j) => {
                        slide.style.transform = `translateX(${(-curDot + j) * 100}%)`
                    });
                    dots.forEach(dot => dot.classList.remove('switcher-element--active'));
                    dot.classList.add('switcher-element--active');
                })
            });
        });
    }

    runSliders();

    window.addEventListener("resize", runSliders);

    // navbar code below:

    const navBarContent = document.querySelector('.navbar__content');
    let scrollStart = 0;
    let startChange = $('.navbar--change-bg');
    let offset = startChange.offset();

    changeNavbar();

    if (startChange.length){
        $(document).scroll(function() {
            changeNavbar();
        });
    }

    function changeNavbar(){
        scrollStart = $(document).scrollTop();

        if(scrollStart < offset.top) {
            $(".navbar").addClass('navbar--transparent');

        } else {
            $('.navbar').removeClass('navbar--transparent');
        }
    }

    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;

        scrollY > lastScrollTop ? navBarContent.classList.remove('visible')  : navBarContent.classList.add('visible');

        lastScrollTop = scrollY <= 0 ? 0 : scrollY;
    }, false);

    // accordion code below:

    $(function() {
        $(".accordion__item .accordion__title").on("click", function (e) {
            e.preventDefault();

            const $this = $(this);
            const $parent = $this.parent();
            const $content = $(".accordion__content");

            if (!$parent.hasClass("activated-item")) {
                $content.slideUp(250);
                $(".accordion__title").parent().removeClass("activated-item");
            }

            $this.next().slideToggle(250).end().parent().toggleClass("activated-item");
        })
    });
});