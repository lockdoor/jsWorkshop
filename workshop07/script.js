const num1El = document.getElementById('num1')
const num2El = document.getElementById('num2')
num1El.textContent = '0'
num2El.textContent = '0'
const operatorEl = document.getElementById('operator')
const btnEls = document.querySelectorAll("button")
btnEls.forEach(btn => {
  if(btn.classList.contains('number')){
    btn.addEventListener('click', ()=>numberClick(btn.value))    
  }
  else if(btn.classList.contains('operator')){
    btn.addEventListener('click', ()=>operatorClick(btn.value))    
  }
  else if(btn.classList.contains('decimal')){
    btn.addEventListener('click', ()=>decimalClick())    
  }
  else if(btn.classList.contains('clear')){
    btn.addEventListener('click', ()=>clearClick())    
  }
})
function numberClick(value){
  if(num2El.textContent.length > 10){
    return
  }else{
    num2El.textContent === "0" 
    ? num2El.textContent = value 
    : num2El.textContent += value
  }
  
}
function operatorClick(operator){
  if(operatorEl.textContent === ''){
    num1El.textContent = num2El.textContent
    operatorEl.textContent = operator
    num2El.textContent = '0' 
  }else{    
    const operand = ()=>{
      const parse = (text) => text.includes('.') ? parseFloat(text) : parseInt(text)
      const num1 = parse(num1El.textContent)
      const num2 = parse(num2El.textContent)
      switch(operator){
        case '+': 
          return num1 + num2
        case '-':
          return num1 - num2          
        case '*':
          return num1 * num2
        case '/':
          return num1 / num2
        case '=':
          return
      }
    } 
    num1El.textContent = operand()
    operatorEl.textContent = operator
    num2El.textContent = '0'
  }
    
}
function decimalClick(){
  if(!num2El.textContent.includes('.')){
    
    num2El.textContent += '.'
  }  
}
function clearClick(){
  num1El.textContent = '0'
  num2El.textContent = '0'
  operatorEl.textContent = ''
}
