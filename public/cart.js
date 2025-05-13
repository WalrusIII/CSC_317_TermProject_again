document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.getElementById('addToCart');
  
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', async () => {
        const productKey = document.getElementById('productKey').value;
  
        const response = await fetch(`/add-to-cart/${productKey}`, {
          method: 'POST'
        });
  
        if (response.ok) {
          alert('Item added to cart!');
        } else {
          const errorText = await response.text();
          alert(`Failed to add to cart: ${errorText}`);
        }
      });
    }
  });
  