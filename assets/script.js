// Banana sprinkles, gallery interactions, and Banana Wall
(function () {
  console.log("Banana site loaded!");

  const sprinkleContainer = document.querySelector(".banana-sprinkles");
  const addBtn = document.getElementById("add-bananas");

  const wall = document.getElementById("banana-wall");
  const loadMoreBtn = document.getElementById("load-more-bananas");

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Animated sprinkle bananas across the page
  function addBananas(count = 16) {
    if (!sprinkleContainer) return;
    const { width, height } = sprinkleContainer.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.className = "banana";
      span.textContent = "🍌";

      // Random position in container
      const left = random(0, Math.max(20, width - 20));
      const top = random(0, Math.max(20, height - 20));
      span.style.left = `${left}px`;
      span.style.top = `${top}px`;

      // Randomized animation timing
      span.style.animationDuration = `${random(4, 9)}s`;
      span.style.animationDelay = `${random(0, 3)}s`;
      span.style.opacity = `${random(0.6, 1)}`;

      sprinkleContainer.appendChild(span);

      // Cleanup to avoid too many nodes over time
      setTimeout(() => {
        if (span.parentNode === sprinkleContainer) {
          sprinkleContainer.removeChild(span);
        }
      }, 20000 + Math.floor(random(0, 10000))); // 20–30s
    }
  }

  // Banana Wall: create a large grid of bananas
  function populateBananaWall(count = 120) {
    if (!wall) return;

    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.textContent = "🍌";
      frag.appendChild(s);
    }
    wall.appendChild(frag);
  }

  // Initial bananas for fun
  addBananas(30);              // more sprinkles to start
  populateBananaWall(160);     // a bigger initial banana wall

  // Add more on button click
  if (addBtn) {
    addBtn.addEventListener("click", () => addBananas(24));
  }

  // Load more bananas into the wall
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => populateBananaWall(200));
  }

  // Periodically add sprinkles for continuous fun
  setInterval(() => addBananas(12), 3500);
})();