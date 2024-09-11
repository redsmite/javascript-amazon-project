import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite addToCart', ()=>{
  const productid = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  let inputElement;

  beforeEach(function() {
    inputElement = document.createElement('input');
    inputElement.className = `js-selector-${productid}`;
    inputElement.value = '1';

    document.body.appendChild(inputElement);
  });

  afterEach(function() {
    if (inputElement && inputElement.parentNode) {
      inputElement.parentNode.removeChild(inputElement);
    }
  });

  it('adds an existing product to the cart', ()=>{
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId : productid,
        quantity: 1,
        deliveryOptionId : 1
      }]);
    });
    loadFromStorage();

    addToCart(productid);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productid);
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', ()=>{
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart(productid);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productid);
    expect(cart[0].quantity).toEqual(1);
  });
});