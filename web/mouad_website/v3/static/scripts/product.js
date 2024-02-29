document.addEventListener("DOMContentLoaded", function() {
    let path = window.location.pathname;
    let product_id = path.split('product/').pop();
    
    
    fetch('http://localhost:5001/api/products/' + product_id)
    .then(response => response.json())
    .then(data => {
        document.getElementById("dynamicTitle").innerText = data.title
        document.getElementById("productDetails").innerHTML = `
            <h2>${data.title}</h2>
            <p>Description: ${data.description}</p>
            <p>Price: $${data.price}</p>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
