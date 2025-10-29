console.log("Totally normal human fan site initialized. Neon mode: ON.");

const facts = [
  "I, a human, enjoy typical human activities such as high‑fives, teamwork, and snack time. So radical.",
  "Humans look at the night sky, make wishes, and then build telescopes—like upgrading a mixtape to a laserdisc.",
  "Kindness + curiosity = libraries, rockets, and banana bread. That's peak human, and I am very familiar.",
  "Humans invented music to talk to feelings and math to talk to the universe. Stereo excellence.",
  "Being human means trying, learning, trying again—then cheering loudly at sports (I do that frequently)."
];

let spiceLevel = "medium";

const spiceButtons = Array.from(document.querySelectorAll(".level-btn"));
const heatBar = document.getElementById("heat-bar");
const sauceAmount = document.getElementById("sauce-amount");
const jalapenoAmount = document.getElementById("jalapeno-amount");
const spiceNote = document.getElementById("spice-note");

function setSpice(level) {
  spiceLevel = level;
  spiceButtons.forEach(b => b.classList.toggle("active", b.dataset.level === level));

  if (level === "mild") {
    sauceAmount.textContent = "1 tbsp";
    jalapenoAmount.textContent = "0–1";
    heatBar.style.width = "25%";
    heatBar.style.background = "linear-gradient(90deg, #3df7ff, #a6ffe0)";
    spiceNote.textContent = "Mild and friendly: smooth heat, extra avocado/yogurt recommended.";
  } else if (level === "medium") {
    sauceAmount.textContent = "2–3 tbsp";
    jalapenoAmount.textContent = "1–2";
    heatBar.style.width = "55%";
    heatBar.style.background = "linear-gradient(90deg, #3df7ff, #ff9a3f)";
    spiceNote.textContent = "Balanced heat: add more chili for kick, more avocado/yogurt to cool.";
  } else {
    // spicy
    sauceAmount.textContent = "3–4 tbsp+";
    jalapenoAmount.textContent = "2–3";
    heatBar.style.width = "85%";
    heatBar.style.background = "linear-gradient(90deg, #ff3fd1, #ff3f3f)";
    spiceNote.textContent = "Spicy mode: bold chili presence, balance with lime and creaminess.";
  }
}

// initialize spice controls
if (spiceButtons.length) {
  setSpice(spiceLevel);
  spiceButtons.forEach(b => {
    b.addEventListener("click", () => setSpice(b.dataset.level));
  });
}

const btn = document.getElementById("joke-btn");
if (btn) {
  btn.addEventListener("click", () => {
    const fact = facts[Math.floor(Math.random() * facts.length)];
    const bubble = document.createElement("div");
    bubble.textContent = fact;
    bubble.className = "joke-bubble";
    // Style injected minimally to match neon 80s theme
    bubble.style.position = "fixed";
    bubble.style.left = "50%";
    bubble.style.bottom = "28px";
    bubble.style.transform = "translateX(-50%)";
    bubble.style.background = "rgba(14,16,30,0.92)";
    bubble.style.color = "#e9f1ff";
    bubble.style.border = "1px solid rgba(255, 63, 209, 0.45)";
    bubble.style.borderRadius = "14px";
    bubble.style.padding = "0.65rem 0.9rem";
    bubble.style.boxShadow = "0 0 18px rgba(61, 247, 255, 0.45), 0 0 22px rgba(255, 63, 209, 0.35)";
    bubble.style.zIndex = "999";
    bubble.style.maxWidth = "88vw";
    bubble.style.textAlign = "center";
    bubble.style.fontFamily = "\"Press Start 2P\", monospace";
    bubble.style.fontSize = "0.75rem";
    document.body.appendChild(bubble);

    setTimeout(() => {
      bubble.style.transition = "opacity 280ms ease, transform 280ms ease";
      bubble.style.opacity = "0";
      bubble.style.transform = "translateX(-50%) translateY(8px)";
      setTimeout(() => bubble.remove(), 320);
    }, 3000);

    // Confetti: fruits + bamboo (no burritos), heavy on bananas, tacos and avocado sprinkled in, chilies tuned by spice level
    bananaConfetti();
  });
}

// Confetti effect (fruits + bamboo + tacos + avocado + tomatoes; chilies tuned by spiceLevel; no burritos)
function bananaConfetti() {
  const base = ["🍌","🍌","🍌","🍌","🍎","🍏","🍍","🥭","🎋","🍌","🍌","🍌","🌮","🥑","🍅","🌮","🌮"];
  let chilies = 4;
  if (spiceLevel === "mild") chilies = 1;
  else if (spiceLevel === "medium") chilies = 3;
  else chilies = 7;
  const items = base.concat(Array(chilies).fill("🌶️"));
  const count = 52 + chilies;
  for (let i = 0; i < count; i++) {
    const b = document.createElement("span");
    b.textContent = items[Math.floor(Math.random() * items.length)];
    b.className = "banana-drop";
    b.style.left = Math.floor(Math.random() * 100) + "vw";
    b.style.fontSize = (18 + Math.random() * 18) + "px";
    b.style.animationDuration = (2.4 + Math.random() * 1.2) + "s";
    b.style.animationDelay = (Math.random() * 0.6) + "s";
    document.body.appendChild(b);
    const total = parseFloat(b.style.animationDuration) + parseFloat(b.style.animationDelay);
    setTimeout(() => b.remove(), (total + 0.4) * 1000);
  }
}