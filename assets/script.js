console.log("Totally normal human fan site initialized. Neon mode: ON.");

const facts = [
  "I, a human, enjoy typical human activities such as high‑fives, teamwork, and snack time. So radical.",
  "Humans look at the night sky, make wishes, and then build telescopes—like upgrading a mixtape to a laserdisc.",
  "Kindness + curiosity = libraries, rockets, and banana bread. That's peak human, and I am very familiar.",
  "Humans invented music to talk to feelings and math to talk to the universe. Stereo excellence.",
  "Being human means trying, learning, trying again—then cheering loudly at sports (I do that frequently)."
];

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

    // Fruit confetti: bananas, apples, and pears for extra vibes
    bananaConfetti();
  });
}

// Simple fruit confetti effect (bananas + apples + pears)
function bananaConfetti() {
  const count = 28;
  const fruits = ["🍌", "🍎", "🍏", "🍐"];
  for (let i = 0; i < count; i++) {
    const b = document.createElement("span");
    b.textContent = fruits[Math.floor(Math.random() * fruits.length)];
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