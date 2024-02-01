
// add Soft winter jacket to cart automatically when Black Medium Handbag is added to cart...
const handBagProductVariantId = 47787827462461; // Handbag with Black color & medium size
const softWinterJacketVariantId = 47770969801021;

const autoRemoveProduct = (productVariantId) => { // when user clicks remove cart item
  if(productVariantId !== handBagProductVariantId) return;
  // if cart item is handbag...
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
        const hasSoftWinterJacket = cart.items.some(item => item.variant_id === softWinterJacketVariantId);

        if (hasSoftWinterJacket) {
          // Remove Winter Jacket from the cart
          fetch('/cart/update.js', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              updates: {
                [softWinterJacketVariantId]: 0
              }
            })
          }).then(response => response.json())
          .then(cartItem => {
            document.querySelector(`cart-remove-button[data-variant-id="${softWinterJacketVariantId}"]`).click();
            console.log('Winter Jacket was removed from the cart:', cartItem);
          })
          .catch(error => {
              console.error('Error removing Winter Jacket from cart:', error);
          });
        }
    });
};