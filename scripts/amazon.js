import { products } from "../data/products.js";
import * as cartModule from "../data/cart.js";

console.log("Hello");

let productsHtml = '';

products.forEach((product)=>{
    productsHtml += `<div class="product-container">
    <div class="product-image-container">
        <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
        ${product.name}
    </div>

    <div class="product-rating-container">
        <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars*10}.png">
        <div class="product-rating-count link-primary">
        ${product.rating.count}
        </div>
    </div>

    <div class="product-price">
        $${(product.priceCents/100).toFixed(2)}
    </div>

    <div class="product-quantity-container js-product-quantity-container-${product.id}">
        <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
    </button>
</div>
`; 
});


document.querySelector('.js-products-grid').innerHTML = productsHtml;

document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{
    button.setAttribute('data-timeout-id', '');
    button.addEventListener('click', ()=>{
        const {productId} = button.dataset;
        cartModule.addToCart(productId);

        const timeoutId = button.getAttribute('data-timeout-id');
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const addedButton = document.querySelector(`.js-added-to-cart-${productId}`);
        addedButton.classList.add(`added-to-cart-visible`);
        addedButton.classList.remove(`added-to-cart`);

        button.setAttribute('data-timeout-id', setTimeout(()=>{
            addedButton.classList.add(`added-to-cart`);
            addedButton.classList.remove(`added-to-cart-visible`);
        },2000));  
    }); 
});

