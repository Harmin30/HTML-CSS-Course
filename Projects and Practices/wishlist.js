let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const wishlistContainer = document.querySelector("#wishlist-container");

if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>Your wishlist is empty</p>";
} else {
    const itemList = document.createElement("div");
    itemList.classList.add("wishlist-items");

    wishlist.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("wishlist-item");

        itemDiv.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" width="80" />
            <div class="item-details">
                <h3>${item.title}</h3>
                <p>₹${item.price}</p>
                <button class="move-to-cart">🛒 Move to Cart</button>
                <button class="remove-item">
                    <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg> Remove
                </button>
            </div>
        `;

        itemDiv.querySelector(".move-to-cart").addEventListener("click", () => {
            const alreadyInCart = cart.find(c => c.id === item.id);
            if (!alreadyInCart) {
                cart.push(item);
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            wishlist.splice(index, 1);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            location.reload();
        });

        itemDiv.querySelector(".remove-item").addEventListener("click", () => {
            wishlist.splice(index, 1);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            location.reload();
        });

        itemList.appendChild(itemDiv);
    });

    wishlistContainer.appendChild(itemList);
}
