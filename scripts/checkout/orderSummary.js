import {cart, removeFromCart, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import {getProduct} from "../../data/products.js"
import {formatCurrency} from "../utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from "./paymentSummary.js";
import {renderCheckoutHeader} from "./checkoutHeader.js";
import {isWeekend} from '../Exercise/lesson15exercise.js';

export function renderOrderSummary(){
    let cartSummaryHTML = '';

    cart.forEach((cartItem)=>{
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const dateString = calculateDeliveryDate(deliveryOption).format(
            'dddd, MMMM D'
        );

        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingProduct.id}">
                    ${matchingProduct.name}
                </div>
                <div class="product-price js-product-price-${matchingProduct.id}">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
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
                    <span class="delete-quantity-link link-primary 
                        js-delete-link 
                        js-delete-link-${matchingProduct.id}" 
                        data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
            
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                
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
            renderOrderSummary();
            renderCheckoutHeader();
            renderPaymentSummary();
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

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
            const {productId} = element.dataset;
            const {deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

    renderCheckoutHeader();
}

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
    renderPaymentSummary();
    
    document.querySelector(`.quantity-label-${saveId}`).innerHTML = inputQuantity;
}


function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption)=>{
        const deliveryDate = calculateDeliveryDate(deliveryOption);

        const priceString = deliveryOption.priceCents
        === 0
            ? 'Free'
            : `$${formatCurrency(deliveryOption.priceCents)} -`

        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        )

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId
            ? 'checked'
            : '';

        html += `
        <div class="delivery-option js-delivery-option" 
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            ${isChecked}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
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

function calculateDeliveryDate(deliveryOption){
    const today = dayjs();
    const {deliveryDays} = deliveryOption;
    let daysAdd = 0;
    
    const isTodayWeekend = isWeekend(today);
    isTodayWeekend === true ? daysAdd -- : '';

    let bufferDate = today;
    let iteration = 0;

    while (iteration <= deliveryDays){
        if(isWeekend(bufferDate) === true) {
            daysAdd++;
        }else{
            iteration++;
        }
        bufferDate = bufferDate.add(1,'days');

    }
    
    const deliveryDate = today.add(deliveryDays + daysAdd,'days');

    return deliveryDate;
}