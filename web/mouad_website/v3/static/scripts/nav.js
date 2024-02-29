document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector('nav');
    nav.innerHTML =
    `<div class="nav_container">
        <div class="nav_left-sec">
        <img
            src="../static/images/icon-menu.svg"
            id="menu-btn"
            alt="menu"
            class="hidden menu"
        />
        <img src="../static/images/logo.png" alt="logo" class="nav_logo" />
        <div class="overlay"></div>
        <ul class="nav_links">
            <img
            src="../static/images/icon-close.svg"
            alt="close"
            class="close-btn hidden"
            />
            <li class="nav_link">Collections</li>
            <li class="nav_link">Men</li>
            <li class="nav_link">Women</li>
            <li class="nav_link">About</li>
            <li class="nav_link">Contact</li>
        </ul>
        </div>
        <div class="nav_right-sec">
        <!-- Cart -->
        <div class="cart-container">
            <button class="cart-btn">
            <span class="indicator"></span>
            <img src="../static/images/icon-cart.svg" alt="cart" class="cart" />
            </button>
            <div class="cart-wrp invisible">
            <p class="cart-heading">Cart</p>
            <div class="divider"></div>
            <div class="cart-content empty">
                <p>Your cart is empty</p>
            </div>
            </div>
        </div>
        <img src="../static/images/image-avatar.png" alt="avatar" class="avatar" />
        </div>
    </div>`

    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.querySelector(".close-btn");
    const menu = document.querySelector(".nav_links");
    const overlay = document.querySelector(".overlay");
    const cartBtn = document.querySelector(".cart-btn");
    const cart = document.querySelector(".cart-wrp");
    const indicator = document.querySelector(".indicator");
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });

    indicator.style.display = "none";
    function openMenu() {
        menu.classList.add("active");
        overlay.classList.add("active");
    };
    function closeMenu() {
        menu.classList.remove("active");
        overlay.classList.remove("active");
    };
    function toggleCart() {
        cart.classList.toggle("invisible");
    };

    menuBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    cartBtn.addEventListener("click", toggleCart);
});
