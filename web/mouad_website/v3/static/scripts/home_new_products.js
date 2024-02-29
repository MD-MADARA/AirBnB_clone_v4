fetch('http://localhost:5001/api/products')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON from the response
  })
  .then(data => {
    data.forEach(product => {
      var productDiv = document.createElement('div');
      productDiv.classList.add('row');
      productDiv.innerHTML = `
        <a href="product/${product.id}">
          <img src="../static/images/${product.img_url}" alt="">
        </a>
        <div class="product-text">
          <h5>hot</h5>
        </div>
        <button class="card-btn" onclick="addToCartePopUp('${product.id}')">add to cart</button>
        <div class="heart-icon">
          <i class="bx bx-heart"></i>
        </div>
        <div class="price">
          <h4>${product.title}</h4>
          <p>$${product.price}</p>
        </div>
      `;
      document.querySelector('.products').prepend(productDiv);
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    document.getElementById('result').textContent = 'Error: ' + error;
  });
