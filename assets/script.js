console.log("Totally normal human fan site initialized.");

const facts = [
  "I, a human, enjoy typical human activities such as high‑fives, teamwork, and snack time.",
  "Humans look at the night sky, make wishes, and then build telescopes to understand those wishes better.",
  "A classic human combo: kindness plus curiosity. Results include libraries, rockets, and banana bread.",
  "Humans invented music to talk to feelings and math to talk to the universe. Both are very relatable.",
  "Being human means trying, learning, and trying again. Also cheering loudly at sports (I do this frequently)."
];

const btn = document.getElementById("joke-btn");
if (btn) {
  btn.addEventListener("click", () => {
    const fact = facts[Math.floor(Math.random() * facts.length)];
    const bubble = document.createElement("div");
    bubble.textContent = fact;
    bubble.className = "joke-bubble";
    // Style injected minimally to avoid extra CSS rules
    bubble.style.position = "fixed";
    bubble.style.left = "50%";
    bubble.style.bottom = "28px";
    bubble.style.transform = "translateX(-50%)";
    bubble.style.background = "#fff";
    bubble.style.border = "2px solid rgba(43, 25, 91, 0.25)";
    bubble.style.borderRadius = "14px";
    bubble.style.padding = "0.65rem 0.9rem";
    bubble.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
    bubble.style.zIndex = "999";
    bubble.style.maxWidth = "88vw";
    bubble.style.textAlign = "center";
    document.body.appendChild(bubble);

    setTimeout(() => {
      bubble.style.transition = "opacity 280ms ease, transform 280ms ease";
      bubble.style.opacity = "0";
      bubble.style.transform = "translateX(-50%) translateY(8px)";
      setTimeout(() => bubble.remove(), 320);
    }, 2800);
  });
}