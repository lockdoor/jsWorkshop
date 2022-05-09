const balance = document.getElementById('balance')
const moneyPlus = document.getElementById('money-plus')
const moneyMinus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')
let id = 4
const dataTransaction =[
  {id:1, text: 'ค่าขนม', amount: -100},
  {id:2, text: 'เงินเดือน', amount: 10000},
  {id:3, text: 'ค่าห้อง', amount: -1500},
]
const transactions = dataTransaction

function formatNumber(num){
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function init(){
  transactions.forEach(addDataToList)
  calculateMoney()
}
function addDataToList(transaction){
  const symbol = transaction.amount < 0 ? '-' : '+'
  // console.log(symbol)
  const item = document.createElement('li')
  item.innerHTML = `${transaction.text}
  <span>${symbol}฿${formatNumber(Math.abs(transaction.amount))} 
    <button 
      class="delete-btn" 
      onClick="deleteTransaction(${transaction.id})">x</button>
  </span>`
  // console.log(item)
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus') 
  // item.className = transaction.amount < 0 ? 'minus' : 'plus'
  list.appendChild(item)
}

function calculateMoney(){
  const amounts = transactions.map(transaction => transaction.amount)
  const incomes = amounts.filter((amount)=>amount>0)
  const income = incomes.reduce((a,b)=>a+b, 0)
  const expenses = amounts.filter((amount)=>amount<0)
  const expense = expenses.reduce((a,b)=>a+b, 0)
  const total = amounts.reduce((a,b)=>a+b, 0)
  moneyPlus.innerHTML = `฿${formatNumber(income.toFixed(2))}`
  moneyMinus.innerHTML = `฿${formatNumber(Math.abs(expense).toFixed(2))}`
  balance.innerHTML = `฿${formatNumber(total.toFixed(2))}`
}

function deleteTransaction(id){
  const index = transactions.findIndex(transaction => transaction.id == id)
  transactions.splice(index, 1)
  list.innerHTML = ''
  init()
}

function addTransaction(e){
  e.preventDefault()
  if(text.value.trim() == '' || amount.value.trim() == ''){
    alert('กรุณาป้อนข้อมูลให้ครบ')
  }else if(parseInt(amount.value) == 0){
    alert('จำนวนเงินต้องไม่เท่ากับ 0')
  }else{
    const item = {
      id: id, text: text.value.trim(), amount: parseInt(amount.value.trim())
    }
    id = id+1
    transactions.unshift(item)
    list.innerHTML = ''
    text.value = ''
    amount.value = ''
    init()
  }
}
form.addEventListener('submit', addTransaction)


init()