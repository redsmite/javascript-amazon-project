import {addToCart, cart, loadFromStorage, removeFromCart} from '../../data/cart.js';
const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

describe('test suite addToCart', ()=>{
  let inputElement;

  beforeEach(()=> {
    spyOn(localStorage, 'setItem');
    inputElement = document.createElement('input');
    inputElement.className = `js-selector-${productId1}`;
    inputElement.value = '1';

    document.body.appendChild(inputElement);
  });

  afterEach(function() {
    if (inputElement && inputElement.parentNode) {
      inputElement.parentNode.removeChild(inputElement);
    }
  });

  it('adds an existing product to the cart', ()=>{
    const expectedValue = JSON.stringify([{'productId': 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',"quantity":2,"deliveryOptionId":1}]);

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId : productId1,
        quantity: 1,
        deliveryOptionId : 1
      }]);
    });
    loadFromStorage();

    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', expectedValue);
  });

  it('adds a new product to the cart', ()=>{
    const expectedValue = JSON.stringify([{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1,"deliveryOptionId":1}]);

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', expectedValue); 
  });
});

describe('test suite: remove from cart',()=>{
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
            productId: productId1,
            quantity: 2,
            deliveryOptionId: '1'
        },{
            productId: productId2,
            quantity: 1,
            deliveryOptionId: '2'
        }
      ]);
    });
    loadFromStorage();
  })

  it('productId is removed from the cart', ()=>{
    const updatedCart = removeFromCart(productId1);

    expect(updatedCart).not.toContain(jasmine.objectContaining({ productId: productId1}));
  })

  it('remove productId that is not in the cart- function should do nothing', ()=>{
    const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
    const updatedCart = removeFromCart(productId3);

    expect(updatedCart).not.toContain(jasmine.objectContaining({ productId: productId3}));
  })
  // it('localStorage.setItem was called once with the correct value', ()=>{
  //   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  // })
})