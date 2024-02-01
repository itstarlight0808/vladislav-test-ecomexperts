
// add Soft winter jacket to cart automatically when Black Medium Handbag is added to cart...
const handBagProductVariantId = 47787827462461;  // Handbag with Black color & medium size
const softWinterJacketVariantId = 47770969801021;

const sectionId = document.getElementsByName('section-id')[0].value;

document.getElementById(`ProductSubmitButton-${sectionId}`).addEventListener('click', async () => {
  const productVariantId = document.querySelector('.product-variant-id').value;
  if(productVariantId !== handBagProductVariantId.toString()) return;

  try {
    let response = await fetch('/cart.js');
    const cart = await response.json();
    const hasSoftWinterJacket = cart.items.some(item => item.variant_id === softWinterJacketVariantId);

    if (!hasSoftWinterJacket) {
      // Add Winter Jacket to cart
      response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: 1,
          id: softWinterJacketVariantId
        })
      });
      const cartItem = await response.json();
      console.log('Winter Jacket added to cart:', cartItem);
    }
  } catch(err) {
    console.log("Adding Free Product Item Error: ", err);
  }
});