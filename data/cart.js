
export let cartQty = Number(localStorage.getItem('cartQty')) || 0;

export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart = [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    },
    {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 3
    }
    ];
    saveToStorage();
    updateCartQuantity(6);
}

export function addToCart(productId){
    let matchingItem;
    cart.forEach((item)=>{
        if(item.productId === productId){
            matchingItem = item;
        }
    });

    const itemQtySelector = document.querySelector(`.js-product-quantity-container-${productId}`);
    const itemQty= Number(itemQtySelector.querySelector('select').value);

    if(matchingItem){
        matchingItem.quantity += itemQty;
    }
    else{
        cart.push({
            productId,
            quantity : itemQty
        });
    }
    updateCartQuantity(itemQty);
    saveToStorage();
}

function updateCartQuantity(itemQty){
    cartQty += Number (itemQty);
    localStorage.setItem('cartQty', cartQty);
}

export function updateCartQuantityHtml(selectorClass){
    let d = document.querySelector(selectorClass);
    d.innerText = cartQty;
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{
        if(cartItem.productId != productId){
            newCart.push(cartItem);
        }
        else{
            cartQty -= cartItem.quantity;
            localStorage.setItem('cartQty', cartQty);
        }
    });

    cart = newCart;
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}