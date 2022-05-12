const docReady = (fn) => {
  if(document.readyState === 'complete' || document.readyState === 'interactive'){
    setTimeout(fn, 1)
  }else{
    document.addEventListener('DOMContentLoaded', fn)
  }
}

docReady(()=>{
  const currency_one = document.getElementById('currency-one')
  const currency_two = document.getElementById('currency-two')
  const amount_one = document.getElementById('amount-one')
  const amount_two = document.getElementById('amount-two')
  const rateText = document.getElementById('rate')
  const swapBtn = document.getElementById('btn')  
  
  const calculateMoney = () => {
    const one = currency_one.value
    const two = currency_two.value
    let url =`https://v6.exchangerate-api.com/v6/80528f9cc4825ab5cf18262f/latest/${one}`
    fetch(url)
      .then(res=>res.json())
      .then(data=>{
        const rate = (amount_one.value * data.conversion_rates[two]).toFixed(4)
        rateText.innerHTML = `${amount_one.value} ${one} = ${rate} ${two}`
        amount_two.value =  rate
      })
      .catch(() => alert('Oop! problem with API'))
  }

  calculateMoney()
  const swap = () => {
    const sw = currency_one.value
    currency_one.value = currency_two.value
    currency_two.value = sw
    calculateMoney()
  }
  
  currency_one.addEventListener('change', calculateMoney)
  currency_two.addEventListener('change', calculateMoney)
  amount_one.addEventListener('change', calculateMoney)
  swapBtn.addEventListener('click', swap)    
})



