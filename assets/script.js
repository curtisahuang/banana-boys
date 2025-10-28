// Banana sprinkles and "Add more bananas" interaction
(function () {
  console.log("Banana site loaded!");

  const sprinkleContainer = document.querySelector(".banana-sprinkles");
  const addBtn = document.getElementById("add-bananas");

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function addBananas(count = 12) {
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

      // Optional cleanup after some time to avoid too many nodes
      setTimeout(() => {
        if (span.parentNode === sprinkleContainer) {
          sprinkleContainer.removeChild(span);
        }
      }, 20000 + Math.floor(random(0, 10000))); // 20–30s
    }
  }

  // Initial bananas for fun
  addBananas(18);

  // Add more on button click
  if (addBtn) {
    addBtn.addEventListener("click", () => addBananas(20));
  }
})();