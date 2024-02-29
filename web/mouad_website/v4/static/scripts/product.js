document.addEventListener("DOMContentLoaded", function() {
    let path = window.location.pathname;
    let product_id = path.split('product/').pop();
    
    
    fetch('http://localhost:5001/api/products/' + product_id)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const p_id = data.id;
        const p_title = data.title;
        const p_price = data.price;
        const p_disription = data.description;
        const p_discount = data.discount;
        const p_ctgType = data.category_type;
        const p_ctgName = data.category_name;
        let new_price = p_price - p_price * (p_discount / 100);
        document.getElementById("dynamicTitle").innerText = p_title
        document.querySelector(".thumbnails").innerHTML =`
        <img
          src="../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img1.WEBP"
          alt="product"
          class="main-thumbnail invisible-mob"
        />
        <div class="mobile-thumb hidden">
          <img
            src="../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img1.WEBP"
            class="thumb-mob"
            alt="product"
          />
          <button id="next">
            <img src="../static/images/icon-next.svg" alt="next" />
          </button>
          <button id="previous">
            <img src="../static/images/icon-previous.svg" alt="previos" />
          </button>
        </div>
        <div>
          <div class="preview">
            <img
              class="selected"
              src="../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img1.WEBP"
              alt=""
            />
            <img src="../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img2.WEBP" alt="" />
            <img src="../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img3.WEBP" alt="" />
            <img src="../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img4.WEBP" alt="" />
          </div>
        </div>`
        document.querySelector(".content").innerHTML = `
        <h1 class="title">${p_title}</h1>
        <p class="info">${p_disription}</p>
        <div class="price">
          <div class="new-price">
            <p class="now">$${new_price.toFixed(2)}</p>
            <span>${p_discount}% Off</span>
          </div>
          <p class="old-price">$${p_price.toFixed(2)}</p>
        </div>
        <div class="buttons">
          <div class="amount-btn">
            <button id="minus">
              <img src="../static/images/icon-minus.svg" alt="minus" />
            </button>
            <p class="amount">0</p>
            <button id="plus">
              <img src="../static/images/icon-plus.svg" alt="plus" />
            </button>
          </div>
          <button class="add_btn">
            <img src="../static/images/icon-cart.svg" alt="cart" />
            Add to cart
          </button>
        </div>`

        const mainThumbnail = document.querySelector(".main-thumbnail");
        const images = document.querySelectorAll(".preview img");
        const plusBtn = document.querySelector("#plus");
        const minusBtn = document.querySelector("#minus");
        const amount = document.querySelector(".amount");
        const nextBtn = document.getElementById("next");
        const prevBtn = document.getElementById("previous");
        const thumbMob = document.querySelector(".thumb-mob");
        const addBtn = document.querySelector(".add_btn");
        const indicator = document.querySelector(".indicator");
        const wrp = document.querySelector(".cart-content");
        let amountValue = 0;
        let currentImg = 1;

        indicator.style.display = "none";
    
        function handlePlus() {
        amountValue++;
        amount.innerText = amountValue;
        }

        function handleMinus() {
        if (amountValue > 0) {
            amountValue--;
        }
        amount.innerText = amountValue;
        }

        function nextImage() {
            if (currentImg == 4) {
                currentImg = 1;
            } else {
                currentImg++;
            }
            thumbMob.src = `../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img${currentImg}.WEBP`;
        }

        function prevImage() {
            if (currentImg == 1) {
                currentImg = 4;
            } else {
                currentImg--;
            }
            thumbMob.src = `../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img${currentImg}.WEBP`;
        }

        function addItem() {
            if (amountValue > 0) {
                let total = new_price * amountValue;
                wrp.classList.remove("empty");
                wrp.innerHTML = `
                <div class="product">
                    <div>
                    <img src="../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img1.WEBP" class="product-img" alt="product">
                    <div class="product-info">
                        <p class="product-title">${p_title}</p>
                    <p><span>$${new_price.toFixed(2)}</span> × <span class="number">${amountValue}</span> <b>$${total.toFixed(2)}</b></p>
                    </div>
                    <button class="delete-btn" onclick='
                        wrp = document.querySelector(".cart-content");
                        wrp.classList.add("empty");
                        wrp.innerHTML = "<p>Your cart is empty</p>";
                    '><img src="../static/images/icon-delete.svg" alt="delete"></button>
                    </div>
                    <button class="checkout-btn">Checkout</button>
                </div>
                `;
                indicator.style.display = "block";
                indicator.innerText = amountValue;
            }
        }

        function deleteItem() {
            wrp.classList.add("empty");
            wrp.innerHTML = `<p>Your cart is empty</p>`;
            indicator.style.display = "none";
        };

        images.forEach((image) => {
            image.addEventListener("click", () => {
                const lastImg = document.querySelectorAll(".selected");
                if (lastImg) {
                lastImg[0].classList.remove("selected");
                }
                image.classList.add("selected");
                const selectedImg = document.querySelector(".selected");
                
                switch (selectedImg.getAttribute("src")) {
                case `../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img1.WEBP`:
                    mainThumbnail.src = `../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img1.WEBP`;
                    break;
                case `../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img2.WEBP`:
                    mainThumbnail.src = `../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img2.WEBP`;
                    break;
                case `../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img3.WEBP`:
                    mainThumbnail.src = `../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img1.WEBP`;
                    break;
                case `../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img4.WEBP`:
                    mainThumbnail.src = `../static/images/${p_ctgType}/${p_ctgName}/product_ID_${p_id}/img4.WEBP`;
                    break;
                }
            });
        });
        plusBtn.addEventListener("click", handlePlus);
        minusBtn.addEventListener("click", handleMinus);
        nextBtn.addEventListener("click", nextImage);
        prevBtn.addEventListener("click", prevImage);
        addBtn.addEventListener("click", addItem);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('result').textContent = 'Error: ' + error;
    });
})
