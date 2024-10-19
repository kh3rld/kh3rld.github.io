// Entrance animations
gsap.from("header", { duration: 1, y: -50, opacity: 0 });
gsap.from(".filter-btn", {
  duration: 0.5,
  y: -20,
  opacity: 0,
  stagger: 0.1,
  delay: 0.5,
});
gsap.from(".project-card", {
  duration: 0.8,
  y: 50,
  opacity: 0,
  stagger: 0.2,
  delay: 1,
});

// Filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.getAttribute("data-category").split(" ");

      if (filter === "all" || categories.includes(filter)) {
        gsap.to(card, {
          duration: 0.5,
          scale: 1,
          opacity: 1,
          display: "block",
        });
      } else {
        gsap.to(card, {
          duration: 0.5,
          scale: 0.8,
          opacity: 0,
          display: "none",
        });
      }
    });
  });
});

// Hover animations for project cards
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      duration: 0.3,
      y: -10,
      boxShadow: "0 10px 20px rgba(0, 255, 153, 0.2)",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, { duration: 0.3, y: 0, boxShadow: "none" });
  });
});

// Particle animation
const createParticle = (x, y) => {
  const particle = document.createElement("div");
  particle.style.position = "absolute";
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  particle.style.width = "5px";
  particle.style.height = "5px";
  particle.style.background = "var(--accent-color)";
  particle.style.borderRadius = "50%";
  document.body.appendChild(particle);

  gsap.to(particle, {
    duration: Math.random() * 1 + 0.5,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    opacity: 0,
    scale: 0,
    onComplete: () => particle.remove(),
  });
};

document.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.9) {
    createParticle(e.clientX, e.clientY);
  }
});
