// document.addEventListener('click', event =>{
//     const burgerIcon = event.target.closest('.burger-icon')
//     const burgerNavLink = event.target.closest('.nav__link')

//     if (!burgerIcon && !burgerNavLink || document.documentElement > 900) return 

//     if (!document.body.classList.contains('body--opened-menu')){
//         document.body.classList.add('body--opened-menu')
//     } else {
//         document.body.classList.remove('body--opened-menu')
//     }
// }) для бургера тож самое что и ниже, но через стрелочную ф

(function () {

    //Бургер 

    document.addEventListener('click', burgerInit)

    function burgerInit(e) {

        const burgerIcon = e.target.closest('.burger-icon')
        const burgerNavLink = e.target.closest('.nav__link')

        if (!burgerIcon && !burgerNavLink || document.documentElement.clientWidth > 900) return

        if (!document.body.classList.contains('body--opened-menu')) {
            document.body.classList.add('body--opened-menu')
        } else {
            document.body.classList.remove('body--opened-menu')
        }
    }

    //Модалка

    const modal = document.querySelector('.modal')
    const modalButton = document.querySelector('.about__img-button')

    modalButton.addEventListener('click', openModal)
    modal.addEventListener('click', closeModal)

    function openModal(e) {
        e.preventDefault() //ф отменяет стандартное поведение
        document.body.classList.toggle('body--opened-modal')
    }

    function closeModal(e) {
        e.preventDefault()

        const target = e.target //элем на который мы кликнули внутри модалки

        if (target.closest('.modal__cancel') || target.classList.contains('modal')) {
            document.body.classList.remove('body--opened-modal')
        }
    }

    //Табы

    const tabControls = document.querySelector('.tab-controls')

    tabControls.addEventListener('click', toggleTab)

    function toggleTab(e) {

        const tabControl = e.target.closest('.tab-controls__link')

        if (!tabControl) return
        e.preventDefault()
        if (tabControl.classList.contains('tab-controls__link--active')) return

        const tabContentID = tabControl.getAttribute('href')
        const tabContent = document.querySelector(tabContentID)
        const activeControl = document.querySelector('.tab-controls__link--active')
        const activeContent = document.querySelector('.tab-content--show')

        if (activeControl) { //можно удалять и без if, но добавили это на случай если захотят чтобы по умолчанию вкладки были скрыты и чтоб изначально никаких модфикаторов не было
            activeControl.classList.remove('tab-controls__link--active')
        }
        if (activeContent) {
            activeContent.classList.remove('tab-content--show')
        }

        tabControl.classList.add('tab-controls__link--active')
        tabContent.classList.add('tab-content--show')

    }

    //Аккордеон

    const accordionList = document.querySelectorAll('.accordion-list')

    accordionList.forEach(el => {

        //след стр на случай если мы захотим чтобы 1 аккордион изначально был открыт (но понятно что надо через переменные все писать, а то длинно и неудобно)
        //document.querySelector('.accordion-list__item--opened .accordion-list__content').style.maxHeight = document.querySelector('.accordion-list__item--opened .accordion-list__content').scrollHeight + 'px'

        el.addEventListener('click', (e) => {

            const accordionList = e.currentTarget //получаем тот элем на который накинули обработчик событий
            const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened')
            const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content')

            const accordionControl = e.target.closest('.accordion-list__control')
            if (!accordionControl) return
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

    // Слайдер-галерея

    const swiper = new Swiper('.gallery__slider', {

        spaceBetween: 15,
        slidesPerView: 1.5,

        pagination: {
            el: '.gallery__pagination',
            type: 'fraction',
        },

        navigation: {
            nextEl: '.gallery__next',
            prevEl: '.gallery__prev',
        },

        breakpoints: {
            601: {
                slidesPerView: 3,
            },
            801: {
                spaceBetween: 32,
            },
            1101: {
                slidesPerView: 4,
            }
        }

    });

})()