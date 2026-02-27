function scrollToMenu() {
  document.getElementById("menu")
  .scrollIntoView({ behavior: "smooth" });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}