// Unhinged banana obsession: sprinkles, wall, marquee and interactions
(function () {
  console.log("Banana site loaded!");

  const body = document.body;
  const sprinkleContainer = document.querySelector(".banana-sprinkles");
  const addBtn = document.getElementById("add-bananas");

  const wall = document.getElementById("banana-wall");
  const loadMoreBtn = document.getElementById("load-more-bananas");

  const toggleUnhingedBtn = document.getElementById("toggle-unhinged");
  const countEl = document.getElementById("banana-count");

  let totalBananas = 0;
  let sprinkleInterval = null;
  let unhinged = false;
  let lastTrailTime = 0;

  const sizes = ["size-xs", "size-sm", "size-md", "size-lg", "size-xl"];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }
  function pickSize() {
    // Weight toward medium/large for visual balance
    const r = Math.random();
    if (r < 0.12) return sizes[0];      // xs
    if (r < 0.35) return sizes[1];      // sm
    if (r < 0.70) return sizes[2];      // md
    if (r < 0.92) return sizes[3];      // lg
    return sizes[4];                    // xl
  }

  function incrementCount(n) {
    totalBananas += n;
    if (countEl) countEl.textContent = String(totalBananas);
  }

  // Animated sprinkle bananas across the page with varied sizes
  function addBananas(count = 16) {
    if (!sprinkleContainer) return;
    const { width, height } = sprinkleContainer.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.className = `banana ${pickSize()}`;
      span.textContent = "🍌";

      // Random position in container
      const left = random(0, Math.max(20, width - 20));
      const top = random(0, Math.max(20, height - 20));
      span.style.left = `${left}px`;
      span.style.top = `${top}px`;

      // Randomized animation timing
      span.style.animationDuration = `${random(3.2, 8)}s`;
      span.style.animationDelay = `${random(0, 2.5)}s`;
      span.style.opacity = `${random(0.6, 1)}`;

      sprinkleContainer.appendChild(span);
      incrementCount(1);

      // Cleanup to avoid too many nodes over time
      setTimeout(() => {
        if (span.parentNode === sprinkleContainer) {
          sprinkleContainer.removeChild(span);
        }
      }, 20000 + Math.floor(random(0, 12000))); // 20–32s
    }
  }

  // Banana Wall: create a large grid of bananas with varied sizes
  function populateBananaWall(count = 120) {
    if (!wall) return;

    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.textContent = "🍌";
      s.className = pickSize();
      frag.appendChild(s);
    }
    wall.appendChild(frag);
    incrementCount(count);
  }

  // Toggle unhinged mode
  function setUnhinged(enabled) {
    unhinged = enabled;
    body.classList.toggle("unhinged", enabled);
    if (toggleUnhingedBtn) {
      toggleUnhingedBtn.textContent = enabled ? "Deactivate Unhinged Mode" : "Activate Unhinged Mode";
      toggleUnhingedBtn.setAttribute("aria-pressed", String(enabled));
    }
    // Manage sprinkle cadence
    if (sprinkleInterval) clearInterval(sprinkleInterval);
    sprinkleInterval = setInterval(() => addBananas(enabled ? 20 : 10), enabled ? 2200 : 4200);

    // Immediate burst when enabling
    if (enabled) {
      addBananas(40);
      populateBananaWall(240);
    }
  }

  // Mouse banana trail when unhinged with varied sizes
  window.addEventListener("mousemove", (e) => {
    if (!unhinged || !sprinkleContainer) return;
    const now = performance.now();
    if (now - lastTrailTime < 60) return; // throttle
    lastTrailTime = now;

    const span = document.createElement("span");
    span.className = `banana ${pickSize()}`;
    span.textContent = "🍌";
    span.style.left = `${e.clientX - 10}px`;
    span.style.top = `${e.clientY - 10}px`;
    span.style.position = "fixed";
    span.style.opacity = "0.85";
    span.style.animationDuration = "4s";

    sprinkleContainer.appendChild(span);
    incrementCount(1);

    setTimeout(() => {
      if (span.parentNode === sprinkleContainer) {
        sprinkleContainer.removeChild(span);
      }
    }, 8000);
  });

  // Konami code triggers a banana storm
  const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let buffer = [];
  window.addEventListener("keydown", (e) => {
    buffer.push(e.key);
    if (buffer.length > konami.length) buffer.shift();
    if (konami.every((k, i) => buffer[i] === k)) {
      addBananas(120);
      populateBananaWall(600);
      // brief ultra-fast sprinkle mode for chaos
      const temp = setInterval(() => addBananas(30), 600);
      setTimeout(() => clearInterval(temp), 4000);
    }
  });

  // Initial bananas for fun
  addBananas(40);              // more sprinkles to start
  populateBananaWall(200);     // a bigger initial banana wall
  setUnhinged(false);          // start tame
  sprinkleInterval = setInterval(() => addBananas(10), 4200);

  // Buttons
  if (addBtn) {
    addBtn.addEventListener("click", () => addBananas(28));
  }
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => populateBananaWall(240));
  }
  if (toggleUnhingedBtn) {
    toggleUnhingedBtn.addEventListener("click", () => setUnhinged(!unhinged));
  }
})();