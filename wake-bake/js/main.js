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

})()