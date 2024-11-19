import {cart} from '../../data/cart-class.js';

export function renderCheckoutHeader(){
    let cartQuantity = 0;

    cart.cartItems.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
    })

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}