let cart = JSON.parse(localStorage.getItem("cart")) || [];

//  Get the main container
const cartContainer = document.querySelector("#cart-container");
// / Checking if the cart is empty
if (cart.length === 0) {
    cart.cartContainer.innerHTML = "<p> Your cart is empty</p>";
} else {
    let total = 0;

  // Created a container for all items
    const itemlist = document.createElement("div")
    itemlist.classList.add("cart-items");

    //  Created a div for each item

    cart.forEach((item) => {
        const itemdiv = document.createElement("div");
        itemdiv.classList.add("cart-item");

          // Add item info
        itemdiv.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}" width="80" />
        <div class="item-details">
        <h3>${item.title}</h3>
        <p>Price: ₹${item.price}</p>
        </div>
        `;

        // Add to the total price
        total += item.price;

        // Add itemDiv to itemList
        itemlist.appendChild(itemdiv);

    });

    //  Showing total
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("cart-total");
    totalDiv.innerHTML = `<h3>Total: ₹${total.toFixed(2)}</h3>`;


    cartContainer.appendChild(itemlist);
    cartContainer.appendChild(totalDiv);

}