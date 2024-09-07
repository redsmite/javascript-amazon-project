import {cart} from '../../data/cart.js';

export function renderCheckoutHeader(){
    let cartQuantity = 0;

    cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
    })

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}