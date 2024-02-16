const sidebar = document.querySelector('.mobile-menu')

function showSidebar(){
    sidebar.style.right = '0'
}

function hideSidebar(){
    sidebar.style.right = '-100%'
}

window.addEventListener("scroll", function () {
    let sticky_navbar = document.querySelector(".sticky-navbar")

    sticky_navbar.classList.toggle('sticky', window.scrollY > 0)
})


const main_cta = document.querySelector('.main-cta')

main_cta.addEventListener("mouseover", function (){
    document.querySelector(".main-cta button").style.background = 'white'
    document.querySelector(".main-cta button img").src = '/assets/img/dark-arrow-left.svg'
})

main_cta.addEventListener("mouseout", function (){
    document.querySelector(".main-cta button").style.background = '#141414'
    document.querySelector(".main-cta button img").src = '/assets/img/arrow-left.svg'
})


const footer_cta = document.querySelector('.footer-cta')

footer_cta.addEventListener("mouseover", function (){
    document.querySelector(".footer-cta button").style.background = 'white'
    document.querySelector(".footer-cta button img").src = '/assets/img/dark-arrow-left.svg'
})

footer_cta.addEventListener("mouseout", function (){
    document.querySelector(".footer-cta button").style.background = '#141414'
    document.querySelector(".footer-cta button img").src = '/assets/img/arrow-left.svg'
})




