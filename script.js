const menu = {
  "Fruit Juices": [
    { name: "Apple Juice", regular: 40, special: 60, image: "apple.png" },
    { name: "Mango Juice", regular: 30, special: 50, image: "mango.png" },
    { name: "Watermelon Juice", regular: 30, special: 50, image: "watermelon.png" },
    { name: "Pineapple Juice", regular: 30, special: 50, image: "pineapple.png" },
    { name: "Pomegranate Juice", regular: 40, special: 60, image: "pomegranate.png" }
  ],
  "Vegetable Juices": [
    { name: "Carrot Juice", price: 30, image: "carrot.png" },
    { name: "Beetroot Juice", price: 30, image: "beetroot.png" },
    { name: "Mint Juice", price: 20, image: "mint.png" }
  ],
  "Milkshakes": [
    { name: "Chocolate Milkshake", price: 80, image: "chocolate.png" },
    { name: "Strawberry Milkshake", price: 80, image: "strawberry.png" },
    { name: "Oreo Chocolate Milkshake", price: 90, image: "oreo.png" }
  ]
};

let cart = [];
let currentCategory = "All";

const container = document.getElementById("menu-container");
const searchInput = document.getElementById("searchInput");

function renderMenu() {
  container.innerHTML = "";
  const searchValue = searchInput.value.toLowerCase();

  for (let category in menu) {
    if (currentCategory !== "All" && currentCategory !== category) continue;

    const filteredItems = menu[category].filter(item =>
      item.name.toLowerCase().includes(searchValue)
    );

    if (filteredItems.length === 0) continue;

    const title = document.createElement("h3");
    title.className = "section-title";
    title.textContent = category;
    container.appendChild(title);

    const scroll = document.createElement("div");
    scroll.className = "product-scroll";

    filteredItems.forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card";

      let price = item.special ? item.regular : (item.regular || item.price);

      card.innerHTML = `
        <div class="product-img">
          <img src="images/${item.image}" alt="${item.name}">
        </div>
        <h4>${item.name}</h4>
        <p>₹${price}</p>
        <button onclick="addToCart('${item.name}', ${price})">Add</button>
      `;

      scroll.appendChild(card);
    });

    container.appendChild(scroll);
  }
}

function filterCategory(category) {
  currentCategory = category;

  document.querySelectorAll(".tab-btn").forEach(btn =>
    btn.classList.remove("active")
  );

  event.target.classList.add("active");

  renderMenu();
}

searchInput.addEventListener("input", renderMenu);

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cart-count").textContent =
    cart.reduce((sum, item) => sum + item.qty, 0);
}

function openCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  cart.forEach(item => {
    cartItems.innerHTML += `
      <p>${item.name} x ${item.qty} = ₹${item.qty * item.price}</p>
    `;
  });

  document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

renderMenu();