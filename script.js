let blur = document.querySelector(".blur-bg");
let navbar_menu = document.querySelector(".navbar-items");
let cart = document.getElementById("cart-icon");
let cart_container = document.querySelector(".cart-product-container");
let menuBar = document.getElementById("menu-bar");
let close = document.getElementById("close");
let cartList = document.querySelector(".list");

let big_img = document.getElementById("big-img");
let thumbnail_imgs = document.querySelectorAll(".thumbnail-img");
let zBig_img = document.getElementById("Zbig-img");
let zThumbnail_imgs = document.querySelectorAll(".Zthumbnail-img");

let btn = document.querySelector(".btn");
let close_zoom_img = document.getElementById("close-zoom-img");

let previousBtn = document.getElementById("previous-button");
let nextBtn = document.getElementById("next-button");

let plus = document.getElementById("plus-icon");
let minus = document.getElementById("minus-icon");
let product_quantity = document.getElementById("product-quantity");

let product_prize = document.querySelector(".product-prize h2");
let product_name = document.querySelector(".product-name");
let addToCartBtn = document.getElementById("add-to-cart-btn");
product_prize = parseInt(product_prize.innerHTML.match(/\d+/)[0]);


let imgChange = 1;
let zImgChange = 1;
let pQuantity = 0;


if (menuBar) {
    menuBar.addEventListener("click", () => {
        navbar_menu.classList.add("active-menu");
        blur.classList.add("active-menu");
    })
}

if (close) {
    close.addEventListener("click", () => {
        navbar_menu.classList.remove("active-menu");
        blur.classList.remove("active-menu");
    })
}

cart.addEventListener('click', () => {
    cart_container.classList.toggle("active-cart")
})



big_img.addEventListener("click", () => {
    document.querySelector(".zoom-img-container").classList.add("active-zoom");
})

close_zoom_img.addEventListener("click", () => {
    document.querySelector(".zoom-img-container").classList.remove("active-zoom");
})




function changeImg(event) {
    thumbnail_imgs.forEach(img => {
        img.parentNode.classList.remove("active-img")

        if (event.target.src == img.src) {
            img.parentNode.classList.add("active-img")
            big_img.src = event.target.src.replace("-thumbnail", "");
        }
    })
}

thumbnail_imgs.forEach(img => {
    img.addEventListener("click", changeImg);
})


function changeZImg(event) {
    zThumbnail_imgs.forEach(img => {
        img.parentNode.classList.remove("active-img")

        if (event.target.src == img.src) {
            img.parentNode.classList.add("active-img")
            zBig_img.src = event.target.src.replace("-thumbnail", "");
            zImgChange = parseInt(zBig_img.src.match(/\d+/g)[5]);
        }
    })
}

zThumbnail_imgs.forEach(img => {
    img.addEventListener("click", changeZImg);
})



// ----------------------------------------------------------------------

nextBtn.addEventListener("click", changeNextImg);
previousBtn.addEventListener("click", changePreviousImg);


function changeNextImg() {
    zImgChange++
    if (zImgChange >= 4) {
        zImgChange = 4;
    }
    zBig_img.src = "images/image-product-" + zImgChange + ".jpg";

    zThumbnail_imgs.forEach(img => {
        img.parentNode.classList.remove("active-img")
        img.src = img.src.replace("-thumbnail", "");
        if (zBig_img.src == img.src) {
            img.parentNode.classList.add("active-img")
        }
    })
}

function changePreviousImg() {
    zImgChange--
    if (zImgChange <= 1) {
        zImgChange = 1;
    }
    zBig_img.src = "images/image-product-" + zImgChange + ".jpg";
    zThumbnail_imgs.forEach(img => {
        img.parentNode.classList.remove("active-img")
        img.src = img.src.replace("-thumbnail", "");
        if (zBig_img.src == img.src) {
            img.parentNode.classList.add("active-img")
        }
    })
}

plus.addEventListener("click", () => {
    pQuantity++;
    product_quantity.innerHTML = pQuantity;
})

minus.addEventListener("click", () => {
    if (pQuantity <= 0) {
        pQuantity = 0;
    }
    else {
        pQuantity--;
        product_quantity.innerHTML = pQuantity;
    }
})


function orderInfo() {
    if (pQuantity > 0) {
        document.querySelector(".item-count").innerHTML = pQuantity;
        document.querySelector(".cart").classList.add("active");

        const totalPrize = product_prize * parseInt(pQuantity);
        const productHTMLElement = `
                <div class="product-info">
                  <img src="${big_img.src}" alt="" class="cart-product-img">
                  <div class="name-prize">
                    <p class="name">${product_name.innerHTML}</p>
                    <p class="prize">$${product_prize}.00 x ${parseInt(pQuantity)} = <b><span class="total-prize">$${totalPrize}.00</span></b></p>
                  </div>
                  <img src="images/icon-delete.svg" alt="" id="delete">
                </div>`;
        cartList.innerHTML = productHTMLElement;

        const cDelete = document.getElementById("delete");
        cDelete.addEventListener("click", () => {
            document.querySelector(".cart").classList.remove("active");
        })
    }
}


let previous_mob = document.getElementById("previous-button-mobile");
let next_mob = document.getElementById("next-button-mobile");

previous_mob.addEventListener("click", ()=>{
    imgChange--
    if (imgChange <= 1) {
        imgChange = 1;
    }
    big_img.src = "images/image-product-" + imgChange + ".jpg";
})


next_mob.addEventListener("click", ()=>{
    imgChange++
    if (imgChange >= 4) {
        imgChange = 4;
    }
    big_img.src = "images/image-product-" + imgChange + ".jpg";
})