const configBtn = document.getElementById('config')
const headerEl = document.getElementById('header')
const selectLevelEl = document.getElementById('select-level')
const wordEl = document.getElementById('word')
const typingEl = document.getElementById('typing')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const gameOverEl = document.getElementById('gameover-container')
const renewBtn = document.getElementById('renew')
const totalScoreEl = document.getElementById('total-score')

let time = 0
let initTime = 0
scoreEl.innerHTML = 0

//set level
let hideHeader = false

function setTimeByLevel(level){
  initTime = level == 'easy' ? 15 : level == 'medium' ? 10 : 5
  time = initTime
  timeEl.innerHTML = initTime
}
setTimeByLevel(selectLevelEl.value)
selectLevelEl.addEventListener('change', (e) => setTimeByLevel(e.target.value))

configBtn.addEventListener('click', ()=>{
  hideHeader = !hideHeader
  if(hideHeader){
    header.classList.add('hide')
  }else{
    header.classList.remove('hide')
  }
})

//random word
const words = ['หมู', 'หมา', 'กา', 'ไก่']
const randomWord = () => {
  wordEl.innerHTML = words[Math.floor(Math.random()*words.length)]
}
randomWord()

//check typing

function decreseTime(){
  const myInterval = setInterval(()=>{
    console.log(time)
    time--
    timeEl.innerHTML = time
    if(time === 0){
      clearInterval(myInterval)
      gameOver()
    }
  },1000)
}

typingEl.addEventListener('focus', ()=>console.log('focus', decreseTime()))
typingEl.addEventListener('input', e => {  
  if(e.target.value == wordEl.innerHTML){
    randomWord()
    // setTimeByLevel(selectLevelEl.value)
    time += initTime/2
    timeEl.innerHTML = time
    e.target.value = ''
    scoreEl.innerHTML = parseInt(scoreEl.innerHTML) + 10
  }
})

function gameOver(){
  gameOverEl.style.display = 'flex'
  totalScoreEl.innerHTML = scoreEl.innerHTML
}

renewBtn.addEventListener('click', renew)

function renew(){
  gameOverEl.style.display = 'none'
  setTimeByLevel(selectLevelEl.value)
  scoreEl.innerHTML = 0
  typingEl.value = ''
}

