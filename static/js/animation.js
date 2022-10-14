// animation menu navigation
const menuNav = document.getElementById('menuNav')
window.addEventListener('scroll',()=>{
    if(window.scrollY > 50){
        menuNav.style.backgroundColor = '#141414'
    }else{
        menuNav.style.backgroundColor = 'transparent'
    }
})