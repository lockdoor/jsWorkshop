const contents = document.querySelectorAll('.content')
document.addEventListener('scroll', showText)
// const fristImgEl = contents[0].getElementsByTagName('img')
// fristImgEl[0].classList.add('show-reveal')
function showText(){
  contents.forEach(content => {
    const imgEl = content.querySelector('img')
    const textEl = content.querySelector('.text')
    const scrollPos = window.pageYOffset
    // const textPos = imgEl.offsetTop + imgEl.offsetHeight /50
     const imgPos = imgEl.offsetTop - 100
    const textPos = imgEl.offsetTop -10
    // console.log(scrollPos)
    if(scrollPos > imgPos){
      imgEl.classList.add('show-reveal')
    }else{
      imgEl.classList.remove('show-reveal')
    }
    if(scrollPos > textPos){
      textEl.classList.add('show-reveal')
    }else{
      textEl.classList.remove('show-reveal')
    }
  })

}
// showText()