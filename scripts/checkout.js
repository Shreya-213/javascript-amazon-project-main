import * as cartModule from '../data/cart.js';
import {products} from '../data/products.js';
import { centsToDollars } from './utils/money.js';

let cartSummaryHtml = '';

cartModule.cart.forEach((cartItem)=>{
    const {productId} = cartItem;

    let matchingProduct;
    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });

    cartSummaryHtml += 
    `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${centsToDollars(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: 
                </span>
                <span class="quantity-label">${cartItem.quantity}</span>
                <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                Update
                </span>
                <input class="quantity-input" type="number" min="1" max="100" required>
                <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>`;
});

document.querySelector('.order-summary').innerHTML = cartSummaryHtml;

updateHeaderCartQtyHtml();

document.querySelectorAll('.product-quantity')
    .forEach((product)=>{
        const productQty = Number(product.querySelector('.quantity-label').innerText);
        product.querySelector('.quantity-input').value = productQty;
    });

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', ()=>{
            //update cart array
            const productId = link.dataset.productId;
            cartModule.removeFromCart(productId);

            //update cart size html
            updateHeaderCartQtyHtml();
            
            //update cart list html
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();

        });
    });

document.querySelectorAll('.update-quantity-link')
    .forEach((updateLink)=>{
        updateLink.addEventListener('click', ()=>{
            const productId = updateLink.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');

        });
    });

document.querySelectorAll('.save-quantity-link')
    .forEach((saveLink)=>{
        saveLink.addEventListener('click', ()=>{
            const productId = saveLink.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            const updateSectionParent = saveLink.parentElement;
            const newQty = Number (updateSectionParent.querySelector('.quantity-input').value);

            if(newQty <1){
                for(var i=0; i<cartModule.cart.length; i++){
                    if(cartModule.cart[i].productId === productId){
                        cartModule.cart.splice(i, 1);
                        cartModule.saveCartToStorage();
                    }
                }
                container.remove();

                return;
            }


            //update displayed product quantity
            updateSectionParent.querySelector('.quantity-label').innerText = newQty;

            for (const cartItem of cartModule.cart){
                if(cartItem.productId === productId){
                    //update cartQty, update quantity in cart, save cart to storage, & header cartQty html
                    cartModule.addtoCartQuantity(newQty-cartItem.quantity);
                    cartItem.quantity = newQty;
                    cartModule.saveCartToStorage();
                    updateHeaderCartQtyHtml();
                    break;
                }
            }
            container.classList.remove('is-editing-quantity');
        });
    });


function updateHeaderCartQtyHtml(){
    document.querySelector('.return-to-home-link').innerHTML = `${cartModule.cartQty} items`;
}

/* update onclick substitute

document.querySelectorAll('.update-quantity-link')
    .forEach((updateLink)=>{
        updateLink.addEventListener('click', ()=>{
            const productId = updateLink.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');
            
            updateLink.innerHTML = '';
            updateLink.insertAdjacentHTML('afterend',
            `<input class="quantity-input js-quantity-input-${productId}">
            <span class="save-quantity-link-${productId} link-primary">Save</span>`);

            const qtyInput = document.querySelector(`.js-quantity-input-${productId}`);
            const saveLink = document.querySelector(`.save-quantity-link-${productId}`);
            saveLink.addEventListener('click',()=>{
                updateLink.innerHTML = 'Update';
                console.log(updateLink.parentElement);
                qtyInput.remove();
                saveLink.remove();
            });

            console.log(updateLink.parentElement);
            console.log('productId: '+productId);
        });
    });

    */