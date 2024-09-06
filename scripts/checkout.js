import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js"
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = '';

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
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
                ${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">        
                    Update
                </span>
                <input type="number" min="1" max="999" class="quantity-input quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary js-save-link" data-save-id="${matchingProduct.id}">
                    Save
                </span>
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
        </div>
    `;
});



document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) =>{
    link.addEventListener('click',()=>{
        const { productId } = link.dataset;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        container.remove();
        calculateCartQuantity();
    })
})

document.querySelectorAll('.js-update-link').forEach((link) =>{
    link.addEventListener('click',()=>{
        const {productId} = link.dataset;
        
        const containerElement = document.querySelector(`.js-cart-item-container-${productId}`);

        if(containerElement.classList.contains('is-editing-quantity')){
            
            containerElement.classList.remove('is-editing-quantity');

        }else{

            containerElement.classList.add('is-editing-quantity');

        }
    })
})

document.querySelectorAll('.js-save-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const {saveId} = link.dataset;
        const inputQuantity = Number(document.querySelector(`.quantity-input-${saveId}`).value);
        
        if(inputQuantity <= 0 || inputQuantity >= 1000){
            return alert('Quantity should be between 1 - 999');
        }

        const containerElement = document.querySelector(`.js-cart-item-container-${saveId}`);

        if(containerElement.classList.contains('is-editing-quantity')){
            
            containerElement.classList.remove('is-editing-quantity');


        } else {

            containerElement.classList.add('is-editing-quantity');

        }

        updateQuantity(saveId, inputQuantity);
        
        document.querySelector(`.quantity-label-${saveId}`).innerHTML = inputQuantity;
    })
})

document.querySelectorAll('.quantity-input').forEach((input)=>{
    input.addEventListener('keydown',()=>{
        if(event.key === 'Enter'){
            console.log(input);
        }
    })
})

calculateCartQuantity();