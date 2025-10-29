console.log("Bananas & Boys loaded!");

const jokes = [
  "Why did the banana go to the doctor? It wasn’t peeling well.",
  "What do you call two bananas? A pair of slippers.",
  "Why did the boy bring a banana to class? He wanted to ace ‘peels’ and valves.",
  "What’s a banana’s favorite gym move? The split.",
  "Why don’t bananas ever feel lonely? They hang out in bunches."
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
    bubble.style.border = "2px solid rgba(0,0,0,0.08)";
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