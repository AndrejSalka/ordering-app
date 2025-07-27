# Andrej's Diner - Restaurant Ordering App

A simple, interactive restaurant ordering system built with vanilla JavaScript, HTML, and CSS. Customers can browse the menu, add items to their cart, and complete their order with a payment form.

## Features

- **Interactive Menu**: Browse available food items with emojis, ingredients, and prices
- **Dynamic Cart**: Add/remove items with real-time total calculation
- **Order Management**: View your order summary before checkout
- **Payment Form**: Enter customer details and card information
- **Order Confirmation**: Thank you message after successful order

## Project Structure

```
├── index.html          # Main HTML structure
├── index.css           # Styling and layout
├── index.js            # Main JavaScript functionality
├── data.js             # Menu data array
└── README.md           # This file
```

## Getting Started

### Prerequisites

- A modern web browser
- Local web server (recommended for module imports)

### Installation

1. Clone or download the project files
2. Serve the files using a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
3. Open `http://localhost:8000` in your browser

## Usage

1. **Browse Menu**: View available items with their ingredients and prices
2. **Add Items**: Click the "+" button to add items to your order
3. **Manage Cart**: Click "remove" next to any item to remove it from your order
4. **Complete Order**: Click "Complete order" to proceed to payment
5. **Payment**: Fill in your name and card details, then click "Pay"
6. **Confirmation**: Receive a thank you message with your name

## Code Issues Found & Fixes

### Critical Issues

1. **Typo in Menu Data** (`data.js`)
   - "mushrom" should be "mushroom"
   - Beer ingredients should be an array, not a string

2. **Form Validation Bug** (`index.js`)
   - `payForm[0].checkValidity()` is incorrect
   - Should validate individual input elements

3. **Missing Closing Tag** (`thanks.innerHTML`)
   - Missing closing `</h2>` tag

### Suggested Improvements

#### 1. Fix Menu Data
```javascript
// In data.js - fix typo and data structure
{
    name: "Pizza",
    ingredients: ["pepperoni", "mushroom", "mozzarella"], // Fixed typo
    id: 0,
    price: 14,
    emoji: "🍕"
},
{
    name: "Beer",
    ingredients: ["grain", "hops", "yeast", "water"], // Fixed array structure
    price: 12,
    emoji: "🍺",
    id: 2
}
```

#### 2. Fix Form Validation
```javascript
// In index.js - proper form validation
payBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('customer-name')
    const cardInputs = payForm.querySelectorAll('input[type="text"]:not(#customer-name)')
    
    if (nameInput.checkValidity() && 
        Array.from(cardInputs).every(input => input.checkValidity())) {
        // Process payment
    }
})
```

#### 3. Code Simplification Suggestions

**Simplify Menu Rendering:**
```javascript
// More concise menu rendering
function renderMenu() {
    return menuArray.map(food => `
        <div class="items">
            <div>
                <span class="food-emoji">${food.emoji}</span>
                <div>
                    <h2>${food.name}</h2>
                    <p>${food.ingredients.join(', ')}</p>
                    <h3>$${food.price}</h3>
                </div>
            </div>
            <button class="add-btn btn-menu" data-id="${food.id}">+</button>
        </div>
    `).join('')
}
```

**Improve Total Calculation:**
```javascript
// More reliable total calculation
let orderItems = []

function updateTotal() {
    total = orderItems.reduce((sum, item) => sum + item.price, 0)
    totalSpan.textContent = `$${total.toFixed(2)}`
}
```

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with Flexbox layout and custom properties
- **Vanilla JavaScript**: ES6 modules, DOM manipulation, event handling
- **Google Fonts**: Smythe, Montserrat, and Roboto font families

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

*Note: Requires support for ES6 modules*

## Future Enhancements

- [ ] Add quantity controls for items
- [ ] Implement local storage for cart persistence
- [ ] Add item categories and filtering
- [ ] Include tax calculation
- [ ] Add animations and transitions
- [ ] Implement proper form validation feedback
- [ ] Add accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Mobile-responsive design improvements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or suggestions, please open an issue in the repository.

---

**Enjoy ordering from Andrej's Diner! 🍕🍔🍺**
