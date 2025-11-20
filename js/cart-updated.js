document.addEventListener('DOMContentLoaded', function() {
    const cartItems = [
        {
            name: "Beast Edition hoodie",
            price: 11999.99,
            deliveryCharge: 15.00,
            quantity: 1
        },
        {
            name: "Male Alpha Top",
            price: 12999.99,
            deliveryCharge: 15.00,
            quantity: 1
        },
        {
            name: "Kids Alpha Top",
            price: 14999.99,
            deliveryCharge: 15.00,
            quantity: 1
        },
    ];

    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const subTotalElement = document.getElementById('sub-total');
    const itemCountElement = document.getElementById('item-count');

    function addToCart(name, price, quantity) {
        const existingItem = cartItems.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({ name, price, deliveryCharge: 15.00, quantity });
        }
        renderCartItems();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto';
            itemElement.innerHTML = `
                <div class="img-box"><img src="https://pagedone.io/asset/uploads/1701162850.png" alt="${item.name}" class="xl:w-[140px] rounded-xl object-cover"></div>
                <div class="w-full max-w-sm pro-data">
                    <h5 class="font-semibold text-xl leading-8 text-black">${item.name}</h5>
                    <h6 class="font-medium text-lg leading-8 text-indigo-600">₦${item.price.toFixed(2)}</h6>
                </div>
                <h6 class="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">$${item.deliveryCharge.toFixed(2)} <span class="ml-3 text-sm text-gray-300 lg:hidden whitespace-nowrap">(Delivery Charge)</span></h6>
                <div class="flex items-center justify-center w-full mx-auto">
                    <button class="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50" onclick="updateQuantity(${index}, -1)">
                        <svg class="transition-all duration-500 stroke-gray-900 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                    </button>
                    <input type="text" class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full  placeholder:text-gray-900 py-[15px] text-center bg-transparent" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
                    <button class="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50" onclick="updateQuantity(${index}, 1)">
                        <svg class="transition-all duration-500 stroke-gray-900 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                    </button>
                    <button class="remove-item" onclick="removeItem(${index})">Remove</button>
                </div>
                <h6 class="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">₦${(item.price + item.deliveryCharge).toFixed(2)}</h6>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        updateTotalPrice();
        updateItemCount();
    }

    function updateQuantity(index, change) {
        if (typeof change === 'number') {
            cartItems[index].quantity += change;
            if (cartItems[index].quantity < 1) {
                removeItem(index);
                return;
            }
        } else {
            const newQuantity = parseInt(change);
            if (!isNaN(newQuantity) && newQuantity > 0) {
                cartItems[index].quantity = newQuantity;
            }
        }
        renderCartItems();
    }

    function removeItem(index) {
        cartItems.splice(index, 1);
        renderCartItems();
    }

    function updateTotalPrice() {
        const subTotal = cartItems.reduce((total, item) => total + (item.price + item.deliveryCharge) * item.quantity, 0);
        totalPriceElement.innerText = `$${subTotal.toFixed(2)}`;
        subTotalElement.innerText = `$${subTotal.toFixed(2)}`;
    }

    function updateItemCount() {
        const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        itemCountElement.innerText = itemCount;
    }

    // Attach functions to the global window object
    window.addToCart = addToCart; // Make addToCart available globally
    window.updateQuantity = updateQuantity;
    window.removeItem = removeItem;

    renderCartItems();
});
