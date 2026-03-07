/* ==============================
   MENU DATA
============================== */

const menu = {

"Fruit Juices":[
 {name:"Apple Juice", regular:40, special:60, image:"apple.png"},
 {name:"Dragon Fruit Juice", price:50, image:"dragon.png"},
 {name:"Kiwi Juice", price:50, image:"kiwi.png"},
 {name:"Avocado Juice", regular:60, special:80, image:"avocado.png"},
 {name:"Pomegranate Juice", regular:40, special:60, image:"pomegranate.png"},
 {name:"Musk Melon Juice", regular:30, special:50, image:"muskmelon.png"},
 {name:"Anjeer Juice", regular:30, special:50, image:"anjeer.png"},
 {name:"Grape Juice", regular:30, special:50, image:"grape.png"},
 {name:"Mosambi Juice", regular:30, special:50, image:"mosambi.png"},
 {name:"Banana Juice", regular:30, special:50, image:"banana.png"},
 {name:"Pineapple Juice", regular:30, special:50, image:"pineapple.png"},
 {name:"Sapota Juice", regular:30, special:50, image:"sapota.png"},
 {name:"Mango Juice", regular:30, special:50, image:"mango.png"},
 {name:"Papaya Juice", regular:30, special:50, image:"papaya.png"},
 {name:"Watermelon Juice", regular:30, special:50, image:"watermelon.png"}
],

"Vegetable Juices":[
 {name:"Carrot Juice", price:30, image:"carrot.png"},
 {name:"Beetroot Juice", price:30, image:"beetroot.png"},
 {name:"ABC Juice", price:30, image:"abc.png"},
 {name:"Bitter Gourd Juice", price:30, image:"bittergourd.png"},
 {name:"Bottle Gourd Juice", price:30, image:"bottlegourd.png"},
 {name:"Ash Gourd Juice", price:30, image:"ashgourd.png"},
 {name:"Cucumber Juice", price:30, image:"cucumber.png"},
 {name:"Tomato Juice", price:30, image:"tomato.png"},
 {name:"Mint Juice", price:20, image:"mint.png"},
 {name:"Coriander Juice", price:20, image:"coriander.png"},
 {name:"Tulsi Juice", price:20, image:"tulsi.png"},
 {name:"Munagaku (Moringa) Juice", price:20, image:"moringa.png"}
],

"Milkshakes":[
 {name:"Butterscotch Milkshake", price:80, image:"butterscotch.png"},
 {name:"Chocolate Milkshake", price:80, image:"chocolate.png"},
 {name:"Strawberry Milkshake", price:80, image:"strawberry.png"},
 {name:"Vanilla Milkshake", price:80, image:"vanilla.png"},
 {name:"Oreo Vanilla Milkshake", price:90, image:"oreo.png"},
 {name:"Oreo Chocolate Milkshake", price:90, image:"oreo.png"}
]

};

/* ==============================
   VARIABLES
============================== */

const container = document.getElementById("menu-container");
const searchInput = document.getElementById("searchInput");

let currentCategory = "All";
let cart = [];


/* ==============================
   RENDER MENU
============================== */

function renderMenu(){

container.innerHTML = "";

const searchValue = searchInput.value.toLowerCase();

for(let category in menu){

if(currentCategory !== "All" && currentCategory !== category){
continue;
}

const filteredItems = menu[category].filter(item =>
item.name.toLowerCase().includes(searchValue)
);

if(filteredItems.length === 0){
continue;
}

const title = document.createElement("h3");
title.className = "section-title";
title.textContent = category;
container.appendChild(title);


const wrapper = document.createElement("div");
wrapper.className = "product-scroll-wrapper";

const scroll = document.createElement("div");
scroll.className = "product-scroll";


filteredItems.forEach(item=>{

const price = item.special ? item.regular : (item.regular || item.price);

const card = document.createElement("div");
card.className = "product-card";

card.innerHTML = `
<div class="product-img">
<img src="images/${item.image}">
</div>

<h4>${item.name}</h4>

<p>₹${price}</p>

<button class="add-btn" onclick="addToCart('${item.name}',${price})">
Add
</button>
`;

scroll.appendChild(card);

});

wrapper.appendChild(scroll);
container.appendChild(wrapper);

}

observeCards();

}


/* ==============================
   FILTER CATEGORY
============================== */

function filterCategory(category){

currentCategory = category;

document.querySelectorAll(".tab-btn").forEach(btn=>{
btn.classList.remove("active");
});

event.target.classList.add("active");

renderMenu();

}


/* ==============================
   SEARCH
============================== */

searchInput.addEventListener("input",renderMenu);


/* ==============================
   CARD SCROLL ANIMATION
============================== */

const observer = new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
},{threshold:0.15});

function observeCards(){
document.querySelectorAll(".product-card").forEach(card=>{
observer.observe(card);
});
}


/* ==============================
   CART SYSTEM
============================== */

function addToCart(name,price){

const existing = cart.find(item=>item.name===name);

if(existing){
existing.qty++;
}else{
cart.push({name:name,price:price,qty:1});
}

updateCartCount();

}


/* ==============================
   CART COUNT
============================== */

function updateCartCount(){

const totalItems = cart.reduce((sum,item)=>sum+item.qty,0);

document.getElementById("cart-count").textContent = totalItems;

}


/* ==============================
   CART POPUP
============================== */

function openCart(){

const modal = document.getElementById("cartModal");
const cartItems = document.getElementById("cart-items");

cartItems.innerHTML = "";

let total = 0;

if(cart.length === 0){
cartItems.innerHTML = "<p>Your cart is empty</p>";
}

cart.forEach(item=>{

total += item.price * item.qty;

const row = document.createElement("div");
row.className = "cart-row";

row.innerHTML = `
<span>${item.name}</span>

<div class="qty-controls">
<button onclick="decreaseQty('${item.name}')">-</button>
<span>${item.qty}</span>
<button onclick="increaseQty('${item.name}')">+</button>
</div>

<span>₹${item.price * item.qty}</span>
`;

cartItems.appendChild(row);

});

const totalRow = document.createElement("div");
totalRow.className = "cart-total";

totalRow.innerHTML = `<strong>Total : ₹${total}</strong>`;

cartItems.appendChild(totalRow);

modal.classList.add("show");

}


/* ==============================
   CART QUANTITY CONTROL
============================== */

function increaseQty(name){

const item = cart.find(i=>i.name===name);

if(item){
item.qty++;
}

openCart();
updateCartCount();

}

function decreaseQty(name){

const item = cart.find(i=>i.name===name);

if(item){

item.qty--;

if(item.qty === 0){
cart = cart.filter(i=>i.name!==name);
}

}

openCart();
updateCartCount();

}


/* ==============================
   CLOSE CART
============================== */

function closeCart(){
document.getElementById("cartModal").classList.remove("show");
}


/* ==============================
   INITIAL LOAD
============================== */

renderMenu();