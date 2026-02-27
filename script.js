const menu = {
  "Fruit Juices": [
    { name: "Apple Juice", regular: 40, special: 60, image: "apple.png" },
    { name: "Dragon Fruit Juice", regular: 50, image: "dragon.png" },
    { name: "Kiwi Juice", regular: 50, image: "kiwi.png" },
    { name: "Avocado Juice", regular: 60, special: 80, image: "avocado.png" },
    { name: "Pomegranate Juice", regular: 40, special: 60, image: "pomegranate.png" },
    { name: "Musk Melon Juice", regular: 30, special: 50, image: "muskmelon.png" },
    { name: "Anjeer Juice", regular: 30, special: 50, image: "anjeer.png" },
    { name: "Grape Juice", regular: 30, special: 50, image: "grape.png" },
    { name: "Mosambi Juice", regular: 30, special: 50, image: "mosambi.png" },
    { name: "Banana Juice", regular: 30, special: 50, image: "banana.png" },
    { name: "Pineapple Juice", regular: 30, special: 50, image: "pineapple.png" },
    { name: "Sapota Juice", regular: 30, special: 50, image: "sapota.png" },
    { name: "Mango Juice", regular: 30, special: 50, image: "mango.png" },
    { name: "Papaya Juice", regular: 30, special: 50, image: "papaya.png" },
    { name: "Watermelon Juice", regular: 30, special: 50, image: "watermelon.png" }
  ],

  "Vegetable Juices": [
    { name: "Carrot Juice", price: 30, image: "carrot.png" },
    { name: "Beetroot Juice", price: 30, image: "beetroot.png" },
    { name: "ABC Juice", price: 30, image: "abc.png" },
    { name: "Bitter Gourd Juice", price: 30, image: "bittergourd.png" },
    { name: "Bottle Gourd Juice", price: 30, image: "bottlegourd.png" },
    { name: "Ash Gourd Juice", price: 30, image: "ashgourd.png" },
    { name: "Cucumber Juice", price: 30, image: "cucumber.png" },
    { name: "Tomato Juice", price: 30, image: "tomato.png" },
    { name: "Mint Juice", price: 20, image: "mint.png" },
    { name: "Coriander Juice", price: 20, image: "coriander.png" },
    { name: "Tulsi Juice", price: 20, image: "tulsi.png" },
    { name: "Munagaku Juice", price: 20, image: "moringa.png" }
  ],

  "Milkshakes": [
    { name: "Butterscotch Milkshake", price: 80, image: "butterscotch.png" },
    { name: "Chocolate Milkshake", price: 80, image: "chocolate.png" },
    { name: "Strawberry Milkshake", price: 80, image: "strawberry.png" },
    { name: "Vanilla Milkshake", price: 80, image: "vanilla.png" },
    { name: "Oreo Vanilla Milkshake", price: 90, image: "oreo.png" },
    { name: "Oreo Chocolate Milkshake", price: 90, image: "oreo.png" }
  ]
};

const container = document.getElementById("menu-container");

for (let category in menu) {

  const title = document.createElement("h3");
  title.className = "section-title";
  title.textContent = category;
  container.appendChild(title);

  const scroll = document.createElement("div");
  scroll.className = "product-scroll";

  menu[category].forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";

    let priceText = "";

    if (item.special) {
      priceText = `₹${item.regular} | ₹${item.special}`;
    } else if (item.regular) {
      priceText = `₹${item.regular}`;
    } else {
      priceText = `₹${item.price}`;
    }

    card.innerHTML = `
      <div class="product-img">
        <img src="images/${item.image}" alt="${item.name}">
      </div>
      <h4>${item.name}</h4>
      <p>${priceText}</p>
    `;

    scroll.appendChild(card);
  });

  container.appendChild(scroll);
}