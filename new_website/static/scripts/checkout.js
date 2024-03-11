function createProductRow(product) {
    new_price = product.price - product.price * (product.discount / 100);
    let amountValue = 1;
    let total = new_price * amountValue;
    var productRow = document.createElement('div');
    productRow.classList.add('checkout-row', 'Products')
    productRow.innerHTML = `
    <div class="checkout-column col1 prod-column">
        <div class="product-card">
        <a href="/product/${product.id}"><img src="../static/images/${product.category_type}/${product.category_name}/product_ID_${product.id}/img1.WEBP" class="product-img" alt="product"></a>
                
        <div class="product-info">
            <p class="product-title">${product.title}</p>
        <p><span>$${new_price.toFixed(2)}</span> × <span class="number">${amountValue}</span> <b>$${total.toFixed(2)}</b></p>
        </div>
        </div>
    </div>
    <div class="checkout-column col2">
        <div class="buttons" style="width: 100%">
            <div class="amount-btn">
            <button id="minus">
                <img src="../static/images/icon-minus.svg" alt="minus" />
            </button>
            <p class="amount">0</p>
            <button id="plus">
                <img src="../static/images/icon-plus.svg" alt="plus" />
            </button>
            </div>
        </div>
    </div>
    <div class="checkout-column col3">
        <h3>Subtotal</h3>
    </div>`
    let checkoutContainer = document.querySelector(".checkout-container")
    checkoutContainer.appendChild(productRow)
}
document.addEventListener("DOMContentLoaded", function() {
    const userid = localStorage.getItem('id');
    fetch(`https://www.madaralx.tech/api/users/${userid}/cart`)
    .then(response => {
      return response.json();
    })
    .then(data => {
        if (data.length == 0) {
            document.querySelector(".checkout-section").innerHTML = `
            <div class="emty_cart_img"></div>
            `
            document.querySelector(".checkout-section").classList.add("relative")
        } else {
            data.forEach(product => {
                createProductRow(product);
            });
        };
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      document.getElementById('result').textContent = 'Error: ' + error;
    });
});
