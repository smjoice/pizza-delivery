let cart = [];
let totalAmount = 0;

function addToCart(pizzaName, pizzaPrice) {
    // Check if the item is already in the cart
    let existingItem = cart.find(item => item.name === pizzaName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: pizzaName, price: pizzaPrice, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalSpan = document.getElementById("total-amount");

    // Clear the cart display
    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>No items in cart.</p>";
        totalSpan.innerText = "0";
        return;
    }

    // Display cart items
    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsDiv.appendChild(itemElement);
    });

    // Calculate total
    totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totalSpan.innerText = totalAmount.toFixed(2);
}

function removeFromCart(pizzaName) {
    cart = cart.filter(item => item.name !== pizzaName);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add some pizzas!");
        return;
    }
    alert(`Thank you for your order! Your total is $${totalAmount.toFixed(2)}.`);
    // Clear the cart after checkout
    cart = [];
    updateCart();
}
