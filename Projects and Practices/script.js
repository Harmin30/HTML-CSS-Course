function toggleMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.classList.toggle('show');
}

const productGrid = document.getElementById("productGrid");


//An asynchronous function allows your code to handle long-running operations (like API calls) without freezing the rest of your website, by using async and await.

// async = declares the function in asynchronous , async lets you use wait 
//await  = pauses the function until a promise is resolved , await tells js : "wait here until the response comes back"

function addToCart(product){
  let cart = JSON.parse(localStorage.getItem("cart") || []);

  const exists = cart.find(item => item.id === product.id);
  if(exists){
    alert("Item already in cart!")
    return;
  }
  cart.push(product);

  localStorage.setItem("cart",JSON.stringify(cart));

  alert("item added to cart")


}


async function fetchFurnitureProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products/category/furniture");
    // const response = await fetch(" https://dummyjson.com/products");
    const data = await response.json();
    // const data2 = await response2.json();

    //Created outer card
    data.products.forEach(product => {
      if (!product.title) throw new Error("Missing title");

      const card = document.createElement("div");
      card.classList.add("product-card");

      //For Image 
      const img = document.createElement("img");
      img.src = product.thumbnail;
      img.alt = product.title;
      card.appendChild(img);

      // Tittle 
      const title = document.createElement("h4");
      title.textContent = product.title;
      card.appendChild(title);


      //Price 
      const price = document.createElement("p");
      price.textContent = `₹${product.price}`;
      card.appendChild(price);


      const buttonGroup = document.createElement("div");
      buttonGroup.classList.add("button-group");

      //Add to cart button

      const btn = document.createElement("button");
      btn.classList.add("add-to-cart-btn");
      btn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
   Add to Cart
`;
      btn.addEventListener("click", () => {
        addToCart(product);
      });
      buttonGroup.appendChild(btn);


      //Buy now btn

      const buyBtn = document.createElement("button");
      buyBtn.textContent = 'Buy Now';
      buyBtn.classList.add("buy-button");
      buyBtn.addEventListener("click", () => {
        buyNow(product);
      });
      buttonGroup.appendChild(buyBtn);


      const wishListBtn = document.createElement("button");
      wishListBtn.textContent = "Add to Wishlist";
      wishListBtn.classList.add("wishlist-button");
      wishListBtn.addEventListener("click", () => {
        addToWishList(product);
      });
      buttonGroup.appendChild(wishListBtn);


      //append card to grid 
      productGrid.appendChild(card);
      // Add the group to the card
      card.appendChild(buttonGroup)


    });

  } catch (error) {
    console.error("error fetching products : ", error)
  }
}
fetchFurnitureProducts()


