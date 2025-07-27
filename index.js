import { menuArray } from './data.js'

const menuHtml = document.getElementById('menu')
const itemsOrder = document.getElementById('items-order')
const completeOrder = document.getElementById('complete-order')
const totalSpan = document.querySelector('h3 span')
const order = document.getElementById('order')
const payForm = document.getElementById('pay-form')
const payBtn = document.getElementById('pay-btn')
const thanks = document.getElementById('thanks')
const customerName = document.getElementById('customer-name')
const removeItem = document.getElementsByClassName('remove-item')




payBtn.addEventListener('click', () => {
    if (payForm[0].checkValidity() && payForm[1].checkValidity() && payForm[2].checkValidity()) {
        payForm.classList.add('hidden')
        payForm.classList.remove('pay-form-visible')
        thanks.classList.remove('hidden')
        order.classList.add('hidden')
        thanks.innerHTML = `
        <h2>Thanks, ${customerName.value}! Your order is on its way!
    `
    }
})

completeOrder.addEventListener('click', () => {
    payForm.classList.remove('hidden')
    payForm.classList.add('pay-form-visible')
})

const renderFood = menuArray.map((food) => {
    let menu = ''
    return menu += `
    <div class = 'items'>
    <div>
        <span class = 'food-emoji'>${food.emoji}</span>
        <div>
        <h2>${food.name}</h2>
        <p>${food.ingredients.join(', ')}</p>
        <h3>$ ${food.price}</h3>
        </div></div>
        <button class="add-btn btn-menu" data-id="${food.id}">+</button>

        </div>
    `

})
menuHtml.innerHTML = renderFood.join(' ')


let total = 0
menuHtml.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
        order.classList.remove('hidden')
        renderOrder(e.target.dataset.id)
        total += getIdFood(e.target.dataset.id).price
        totalSpan.textContent = `$ ${total.toFixed(2)}`
    }
    // Debugging statement removed for production

})



function getIdFood(foodId) {

    const findId = menuArray.filter(function (item) {
        return item.id === Number(foodId)
    })

    return findId[0]


}



function renderOrder(foodId) {
    const food = getIdFood(foodId)
    itemsOrder.innerHTML += `
        <div class='order-item'>
            <h2>${food.name}</h2>
            <p class='remove-item'>remove</p>
            <h3 class="price">$ ${food.price}</h3>
        </div>
    `
}

// Remove this line, as event delegation will be used below


itemsOrder.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const item = e.target.parentElement
        const priceText = item.querySelector('h3').textContent.replace('$', '').trim()
        const price = parseFloat(priceText)
        if (!isNaN(price)) {
            total -= price
            totalSpan.textContent = `$ ${total.toFixed(2)}`
        }
        item.remove()
        if (itemsOrder.children.length === 0) {
            order.classList.add('hidden')
        }
    }
})


