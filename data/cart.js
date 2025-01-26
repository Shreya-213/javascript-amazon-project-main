export const cart = [
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

let cartQty = 0;

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
    console.log(cart);
}

function updateCartQuantity(itemQty){

    cartQty += itemQty;
    let d = document.querySelector('.js-cart-quantity');
    d.innerText = cartQty;
}