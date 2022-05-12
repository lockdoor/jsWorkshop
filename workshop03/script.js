// const switchToggle = document.querySelector('input[type="checkbox"]')
const toggleIcon = document.getElementById('toggle-icon')
const switchToggle = document.getElementById('switch-mode')
const topMenu = document.getElementById('top-menu')
const nav = document.getElementById('nav')
const hiddenMenu = document.getElementById('hidden-menu')
// const menu = document.getElementById('menu')
let toggleMenu = false

hiddenMenu.addEventListener('click', hiddenMenuClick)
switchToggle.addEventListener('change', switchMode)
window.addEventListener('resize', onResize)
// menu.a.addEventListener('click', hiddenMenuClick)

function onResize(){
  const width = window.innerWidth
  // console.log(width)
  const menu = document.getElementById('menu')
  // console.log(menu)
  if(width > 800 && menu != null){
    toggleMenu = false
    topMenu.removeChild(document.getElementById('menu'))
  }
}
function hiddenMenuClick(){
  // console.log('hidden menu click')  
  toggleMenu = !toggleMenu
  if(toggleMenu){
    //show menu
    const menu = nav.cloneNode(true)
    menu.id = 'menu'
    topMenu.appendChild(menu)
    menu.querySelectorAll('a').forEach(element => {
      element.addEventListener('click', ()=>{
        toggleMenu = false
        topMenu.removeChild(document.getElementById('menu'))
      })
    });
    // console.log(nav)
    console.log(menu)
  }else{
    topMenu.removeChild(document.getElementById('menu'))
  }
}
function switchMode(e){
  // console.log(e.target.checked)
  if(e.target.checked){
    document.documentElement.setAttribute('data-theme', 'dark')
    darkMode()
  }else{
    document.documentElement.setAttribute('data-theme', 'light')
    lightMode()
  }
}
function darkMode(){
  // console.log('dark mode')
  toggleIcon.children[0].textContent= 'โหมดกลางคืน'
  toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon')
  // nav.style.backgroundColor = 'rgb(0 0 0 / 50%)'
}
function lightMode(){
  // console.log('light mode')
  toggleIcon.children[0].textContent = 'โหมดกลางวัน'
  toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun')
  // nav.style.backgroundColor = 'rgb(255 255 255 / 50%)'
}
