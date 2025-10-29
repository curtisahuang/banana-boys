console.log("Sector Zeta: Bananas & Boys dossier initialized.");

const jokes = [
  "Transmission 001: The banana claims it is a fruit. Our sensors detect dessert-level sweetness. Conclusion: truth-drifting.",
  "Transmission 014: Juvenile human refuses curved yellow nutrient rod. Outcome: banana adopts orbit around lunchbox.",
  "Transmission 029: We measured a 'banana split'. Result: fruit underwent bifurcation without distress.",
  "Transmission 042: Why do bananas travel in bunches? Social clustering reduces peel-slip incidents by 83%.",
  "Transmission 073: The boy said the banana is 'appealing'. Lexical pun detected. Humor quality: high."
];

const btn = document.getElementById("joke-btn");
if (btn) {
  btn.addEventListener("click", () => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    const bubble = document.createElement("div");
    bubble.textContent = joke;
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
    }, 2600);
  });
}