const menu = [
  // Fruit Juices
  { category: "Fruit Juices", name: "Apple Juice", regular: 40, special: 60, image: "apple.png" },
  { category: "Fruit Juices", name: "Dragon Fruit Juice", regular: 50, image: "dragon.png" },
  { category: "Fruit Juices", name: "Kiwi Juice", regular: 50, image: "kiwi.png" },
  { category: "Fruit Juices", name: "Avocado Juice", regular: 60, special: 80, image: "avocado.png" },
  { category: "Fruit Juices", name: "Pomegranate Juice", regular: 40, special: 60, image: "pomegranate.png" },
  { category: "Fruit Juices", name: "Musk Melon Juice", regular: 30, special: 50, image: "muskmelon.png" },
  { category: "Fruit Juices", name: "Anjeer Juice", regular: 30, special: 50, image: "anjeer.png" },
  { category: "Fruit Juices", name: "Grape Juice", regular: 30, special: 50, image: "grape.png" },
  { category: "Fruit Juices", name: "Mosambi Juice", regular: 30, special: 50, image: "mosambi.png" },
  { category: "Fruit Juices", name: "Banana Juice", regular: 30, special: 50, image: "banana.png" },
  { category: "Fruit Juices", name: "Pineapple Juice", regular: 30, special: 50, image: "pineapple.png" },
  { category: "Fruit Juices", name: "Sapota Juice", regular: 30, special: 50, image: "sapota.png" },
  { category: "Fruit Juices", name: "Mango Juice", regular: 30, special: 50, image: "mango.png" },
  { category: "Fruit Juices", name: "Papaya Juice", regular: 30, special: 50, image: "papaya.png" },
  { category: "Fruit Juices", name: "Watermelon Juice", regular: 30, special: 50, image: "watermelon.png" },

  // Vegetable Juices
  { category: "Vegetable Juices", name: "Carrot Juice", price: 30, image: "carrot.png" },
  { category: "Vegetable Juices", name: "Beetroot Juice", price: 30, image: "beetroot.png" },
  { category: "Vegetable Juices", name: "ABC Juice", price: 30, image: "abc.png" },
  { category: "Vegetable Juices", name: "Bitter Gourd Juice", price: 30, image: "bittergourd.png" },
  { category: "Vegetable Juices", name: "Bottle Gourd Juice", price: 30, image: "bottlegourd.png" },
  { category: "Vegetable Juices", name: "Ash Gourd Juice", price: 30, image: "ashgourd.png" },
  { category: "Vegetable Juices", name: "Cucumber Juice", price: 30, image: "cucumber.png" },
  { category: "Vegetable Juices", name: "Tomato Juice", price: 30, image: "tomato.png" },
  { category: "Vegetable Juices", name: "Mint Juice", price: 20, image: "mint.png" },
  { category: "Vegetable Juices", name: "Coriander Juice", price: 20, image: "coriander.png" },
  { category: "Vegetable Juices", name: "Tulsi Juice", price: 20, image: "tulsi.png" },
  { category: "Vegetable Juices", name: "Munagaku Juice", price: 20, image: "moringa.png" },

  // Milkshakes
  { category: "Milkshakes", name: "Butterscotch Milkshake", price: 80, image: "butterscotch.png" },
  { category: "Milkshakes", name: "Chocolate Milkshake", price: 80, image: "chocolate.png" },
  { category: "Milkshakes", name: "Strawberry Milkshake", price: 80, image: "strawberry.png" },
  { category: "Milkshakes", name: "Vanilla Milkshake", price: 80, image: "vanilla.png" },
  { category: "Milkshakes", name: "Oreo Vanilla Milkshake", price: 90, image: "oreo.png" },
  { category: "Milkshakes", name: "Oreo Chocolate Milkshake", price: 90, image: "oreo.png" }
];

let cart = [];
let currentCategory = "All";

const container = document.getElementById("menu-container");
const searchInput = document.getElementById("searchInput");

function renderMenu() {
  container.innerHTML = "";
  const searchValue = searchInput.value.toLowerCase();

  const filtered = menu.filter(item =>
    (currentCategory === "All" || item.category === currentCategory) &&
    item.name.toLowerCase().includes(searchValue)
  );

  const grouped = {};
  filtered.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  for (let category in grouped) {
    const title = document.createElement("h3");
    title.className = "section-title";
    title.textContent = category;
    container.appendChild(title);

    const wrapper = document.createElement("div");
wrapper.className = "product-scroll-wrapper";

const scroll = document.createElement("div");
scroll.className = "product-scroll";

    grouped[category].forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card";

      const priceText = item.special
        ? `₹${item.regular} | ₹${item.special}`
        : `₹${item.regular || item.price}`;

      card.innerHTML = `
        <div class="product-img">
          <img src="images/${item.image}" alt="${item.name}">
        </div>
        <h4>${item.name}</h4>
        <p>${priceText}</p>
        <button class="add-btn" onclick="addToCart('${item.name}', ${item.regular || item.price})">
          Add
        </button>
      `;

      scroll.appendChild(card);
    });

    wrapper.appendChild(scroll);
container.appendChild(wrapper);
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
  if (existing) existing.qty++;
  else cart.push({ name, price, qty: 1 });
  updateCart();
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-count").textContent = count;
}

function openCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.qty * item.price;

    cartItems.innerHTML += `
      <div class="cart-row">
        <span>${item.name}</span>
        <div class="qty-controls">
          <button onclick="changeQty('${item.name}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.name}', 1)">+</button>
        </div>
        <span>₹${item.qty * item.price}</span>
      </div>
    `;
  });

  cartItems.innerHTML += `<hr><h4>Total: ₹${total}</h4>`;

  document.getElementById("cartModal").style.display = "flex";
}

function changeQty(name, change) {
  const item = cart.find(i => i.name === name);
  item.qty += change;
  if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
  updateCart();
  openCart();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

renderMenu();