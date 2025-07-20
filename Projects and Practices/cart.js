let cart = JSON.parse(localStorage.getItem("cart") || []);
const cartContainer = document.querySelector("#cart-container");

if (!cartContainer) {
  console.error("Cart container not found");
} else if (cart.length === 0) {
  cartContainer.innerHTML = "<p>Your cart is empty</p>";
} else {
  let total = 0;
  const itemlist = document.createElement("div");
  itemlist.classList.add("cart-items");

  cart.forEach((item) => {
    const itemdiv = document.createElement("div");
    itemdiv.classList.add("cart-item");

    itemdiv.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" width="80" />
      <div class="item-details">
        <h3>${item.title}</h3>
        <p>Price: ₹${item.price}</p>
        <button class="wishlist-btn">Move to Wishlist ❤️</button>
        <button class="remove-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="11" width="12" viewBox="0 0 448 512">
            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
          </svg> Remove
        </button>
      </div>
    `;

    // Wishlist button logic
    const wishlistBtn = itemdiv.querySelector(".wishlist-btn");
    wishlistBtn.addEventListener("click", () => {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      const exists = wishlist.some(w => w.id === item.id);
      if (!exists) {
        wishlist.push(item);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Added to wishlist!");

        // Remove from cart after moving
        
        cart = cart.filter(c => c.id !== item.id);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      } else {
        alert("Already in wishlist!");
      }
    });

    // Remove button logic
    const removeBtn = itemdiv.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      cart = cart.filter(c => c.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });

    total += item.price;
    itemlist.appendChild(itemdiv);
  });

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");
  totalDiv.innerHTML = `<h3>Total: ₹${total.toFixed(2)}</h3>`;

  cartContainer.appendChild(itemlist);
  cartContainer.appendChild(totalDiv);
}
