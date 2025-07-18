function toggleMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.classList.toggle('show');
}

const productGrid = document.getElementById("productGrid");


//An asynchronous function allows your code to handle long-running operations (like API calls) without freezing the rest of your website, by using async and await.

// async = declares the function in asynchronous , async lets you use wait 
//await  = pauses the function until a promise is resolved , await tells js : "wait here until the response comes back"

async function fetchFurnitureProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products/category/furniture");
    const data = await response.json();

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

      //append card to grid 
      productGrid.appendChild(card);

    });

  } catch (error) {
    console.error("error fetching products : ", error)
  }
}
fetchFurnitureProducts()


