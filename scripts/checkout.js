import {cart, removeFromCart, calculateCartQuantity, updateQuantity} from "../data/cart.js";
import {products} from "../data/products.js"
import {formatCurrency} from "./utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

hello();

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D',));

let cartSummaryHTML = '';

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) =>{
        if(option.id === deliveryOptionId){
            deliveryOption = option;
        }
    })

    const today = dayjs();
    const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
    );
    const dateString = deliveryDate.format(
        'dddd, MMMM D'
    )

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">        
                    Update
                </span>
                <input type="number" min="1" max="999" class="quantity-input quantity-input-${matchingProduct.id}" data-input-id="${matchingProduct.id}">
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
           
            ${deliveryOptionsHTML(matchingProduct.id, cartItem)}
            
            </div>
        </div>
        </div>
    `;
});

function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption)=>{
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );

        const priceString = deliveryOption.priceCents
        === 0
            ? 'Free'
            : `$${formatCurrency(deliveryOption.priceCents)} -`

        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        )

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
        <div class="delivery-option">
            <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct}">
            <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceString} Shipping
            </div>
            </div>
        </div>
        `
    })

    return html;
}



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

function saveQuantity(saveId){
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
}

document.querySelectorAll('.js-save-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const {saveId} = link.dataset;
        saveQuantity(saveId);
    })
})

document.querySelectorAll('.quantity-input').forEach((input)=>{
    input.addEventListener('keydown',()=>{
        if(event.key === 'Enter'){
            const {inputId} = input.dataset;
            saveQuantity(inputId);
        }
    })
})

calculateCartQuantity();