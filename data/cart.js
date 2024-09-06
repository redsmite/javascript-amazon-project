export let cart = JSON.parse(localStorage.getItem('cart'));


if(!cart){
    [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
        },{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
        }
    ];
}

function saveToStorage(cart){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;
        
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    const selectorQuantity = Number(document.querySelector(`.js-selector-${productId}`).value);

    if(matchingItem){
        matchingItem.quantity += selectorQuantity;
    }else{
        cart.push({
            productId,
            quantity: selectorQuantity
        })
    }

    saveToStorage(cart);
}

export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage(cart);
}

export function calculateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
    })

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

export function updateQuantity(productid, newQuantity){
    cart.forEach((cartItem)=>{
        if(cartItem.productId === productid){
            cartItem.quantity = newQuantity;

            calculateCartQuantity();
        }
    })
}