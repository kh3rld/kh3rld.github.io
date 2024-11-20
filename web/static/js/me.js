const codeChars = "01";
const codeBackground = document.querySelector(".code-background");

function generateCodeRain() {
  const columns = Math.floor(window.innerWidth / 20);
  for (let i = 0; i < columns; i++) {
    const column = document.createElement("div");
    column.style.position = "absolute";
    column.style.left = i * 20 + "px";
    column.style.top = Math.random() * 100 + "%";
    column.style.color = "var(--accent-color)";
    codeBackground.appendChild(column);

    animateColumn(column);
  }
}

function animateColumn(column) {
  let text = "";
  for (let i = 0; i < 20; i++) {
    text += codeChars[Math.floor(Math.random() * codeChars.length)];
  }
  column.textContent = text;

  gsap.to(column, {
    duration: Math.random() * 2 + 1,
    y: "+=100%",
    ease: "none",
    repeat: -1,
    opacity: 0,
    onRepeat: () => {
      column.style.top = "-100%";
      column.style.opacity = 1;
    },
  });
}

generateCodeRain();

gsap.from(".hero-content", {
  duration: 1.5,
  y: 50,
  opacity: 0,
  ease: "power3.out",
});

gsap.from(".nav-menu", {
  duration: 1,
  y: -50,
  opacity: 0,
  ease: "power2.out",
});

// Smooth Nav Menu Hover Effect
const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
  link.addEventListener("mouseenter", (e) => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -3,
      scale: 1.1,
      ease: "power2.out",
    });
  });

  link.addEventListener("mouseleave", (e) => {
    gsap.to(e.target, {
      duration: 0.3,
      y: 0,
      scale: 1,
      ease: "power2.in",
    });
  });
});

// Smooth Page Transitions
const links = document.querySelectorAll("a");
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    gsap.to(".container", {
      duration: 0.5,
      opacity: 0,
      y: -50,
      ease: "power2.inOut",
      onComplete: () => {
        window.location.href = href;
      },
    });
  });
});
