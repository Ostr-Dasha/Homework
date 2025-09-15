(function () {

    // ===================== Бургер ====================================

    document.addEventListener('click', burgerInit)

    function burgerInit(e) {

        const burgerIcon = e.target.closest('.burger-icon')
        const headerButtons = e.target.closest('.header__top-buttons')
        const width = document.documentElement.clientWidth

        if (!burgerIcon && !headerButtons || (width > 950)) return

        if (!document.body.classList.contains('body--opened-menu')) {
            document.body.classList.add('body--opened-menu')
        }
        else {
            document.body.classList.remove('body--opened-menu')
        }

    }

    // ==================== Слайдер Залов =========================================


    const swiperMin = new Swiper('.halls__slider-min', {

        loop: true,
        spaceBetween: 0,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,

        breakpoints: {
            951: {
                slidesPerView: 3,
            },
            1451: {
                slidesPerView: 4,
            },
        }

    });

    const swiperMax = new Swiper('.halls__slider-max', {

        pagination: {
            el: '.halls__pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return `<span class="${currentClass} custom-current"></span><span class="pagination-separator">из</span><span class="${totalClass}"></span>`;
            }

        },

        navigation: {
            nextEl: '.halls__next',
            prevEl: '.halls__prev',
        },
        thumbs: {
            swiper: swiperMin,
        },
    });

    const slidesData = {
        "1": [
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-1/hall-1.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-1/hall-2.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-1/hall-3.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-1/hall-4.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-1/hall-5.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-1/hall-6.jpg" alt="">
            </div>`,
        ],
        "2": [
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-2/hall-1.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-2/hall-2.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-2/hall-3.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-2/hall-4.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-2/hall-5.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-2/hall-6.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-2/hall-7.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-2/hall-8.jpg" alt="">
            </div>`,
        ],
        "3": [
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-3/hall-1.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-3/hall-2.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-3/hall-3.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-3/hall-4.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-3/hall-5.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-3/hall-6.jpg" alt="">
            </div>`,
        ],
        "5": [
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-5/hall-1.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-5/hall-2.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-5/hall-3.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-5/hall-4.jpg" alt="">
            </div>`,
            `<div class="halls__slide swiper-slide">
                <img src="img/halls/hall-5/hall-5.jpg" alt="">
            </div>`,
        ],
    }

    function updateSlides(hallId) {
        const slides = slidesData[hallId] || [];

        // Обновляем мини-слайдер
        swiperMin.removeAllSlides();
        swiperMin.appendSlide(slides);
        swiperMin.update();

        // Обновляем большой слайдер
        swiperMax.removeAllSlides();
        swiperMax.appendSlide(slides);
        swiperMax.update();

        // Переключаемся на первый слайд
        swiperMin.slideTo(0);
        swiperMax.slideTo(0);

    }

    // ========== Табы по залам + контент + галерея ====================================

    const hallsTabs = document.querySelector('.halls__tab-list')
    hallsTabs.addEventListener('click', toggleTab)

    function toggleTab(e) {

        const tab = e.target.closest('.halls__tab-link')

        if (!tab) return

        e.preventDefault() //отмена дефолтного поведения (в данном случае ссылки)

        if (tab.classList.contains('halls__tab-link--active')) return

        const tabID = tab.getAttribute('href')
        const activeTab = document.querySelector('.halls__tab-link--active')
        const activeContent = document.querySelector('.tab-content--show')

        activeContent.classList.remove('tab-content--show')
        activeTab.classList.remove('halls__tab-link--active')

        document.querySelector(tabID).classList.add('tab-content--show')
        tab.classList.add('halls__tab-link--active')


        const hallId = tab.dataset.hall
        updateSlides(hallId)

    }

    // Инициализация слайдов при загрузке страницы для первого активного таба
    document.addEventListener('DOMContentLoaded', () => {
        const activeTab = document.querySelector('.halls__tab-link--active');
        if (activeTab) {
            updateSlides(activeTab.dataset.hall);
        }
    });



    // ================================== Слайдер Бот ====================================
{
    const swiperBot = new Swiper('.bot__slider-container', {

        // loopAdditionalSlides: 1,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 1,
        // initialSlide: 0,
        centeredSlides: true,
        centeredSlidesBounds: true,
        // loopedSlides: 9,

        pagination: {
            el: '.bot__pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return `<span class="${currentClass} custom-current"></span><span class="pagination-separator">из</span><span class="${totalClass}"></span>`;
            }
        },

        navigation: {
            nextEl: '.bot__next',
            prevEl: '.bot__prev',
        },
//доадаптировать с 600px
        breakpoints: {
            501: {
                slidesPerView: 1.5,
            },
            601: {
                slidesPerView: 2,
            },
            811: {
                slidesPerView: 2.5,
            },
            951: {
                slidesPerView: 3,
            },
            1051: {
                slidesPerView: 3.5,
                spaceBetween: 5,
            },
            1251: {
                slidesPerView: 4,
                spaceBetween: 5,
            },
            1451: {
                slidesPerView: 4.5,
                spaceBetween: 10,
            },
            1601: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
        }
    });

}

    // ================================== Аккордеон ====================================

    const accordionList = document.querySelectorAll('.accordion-list')

    accordionList.forEach(el => {

        el.addEventListener('click', (e) => {

            const accordionList = e.currentTarget //получаем тот элем на который накинули обработчик событий
            const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened')
            const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content')

            const accordionControl = e.target.closest('.accordion-list__control')
            const accordionControlIcon = e.target.closest('.accordion-list__control-icon')
            e.preventDefault()
            if (!accordionControlIcon) return
            const accordionItem = accordionControl.parentElement
            const accordionContent = accordionControl.nextElementSibling

            if (accordionOpenedItem && accordionOpenedItem != accordionItem) {
                accordionOpenedItem.classList.remove('accordion-list__item--opened')
                accordionOpenedContent.style.maxHeight = null
            }
            accordionItem.classList.toggle('accordion-list__item--opened')

            if (accordionItem.classList.contains('accordion-list__item--opened')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'
            } else {
                accordionContent.style.maxHeight = null
            }

        })
    })

}
)() //самовызывающаяся функция, для ограничения области видимости элементов




