export const cart = [];

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

}

function updateCartQuantity(itemQty){

    cartQty += itemQty;
    let d = document.querySelector('.js-cart-quantity');
    d.innerText = cartQty;
}