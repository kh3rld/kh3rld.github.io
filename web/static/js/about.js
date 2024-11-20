const createParticles = () => {
  const colors = ["#e5dfc7", "#6f8890", "#4b6474"];
  const numParticles = 22; // Reduced for more minimal feel

  for (let i = 0; i < numParticles; i++) {
    let particle = document.createElement("div");
    particle.className = "particle";
    document.body.appendChild(particle);

    gsap.set(particle, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      scale: Math.random() * 0.3 + 0.2, // Smaller particles
      width: "4px",
      height: "4px",
      opacity: 0.6,
    });

    // Create bezier path animation
    gsap.to(particle, {
      duration: Math.random() * 4 + 3,
      motionPath: {
        path: [
          { x: "+=100", y: "+=100" },
          { x: "-=150", y: "+=50" },
          { x: "+=100", y: "-=100" },
        ],
        curviness: 2,
      },
      repeat: -1,
      ease: "none",
    });
  }
};

createParticles();

const profileImgContainer = document.querySelector(".profile-img-container");

profileImgContainer.addEventListener("mouseenter", () => {
  gsap.to(".profile-img", {
    duration: 0.8,
    scale: 1.05,
    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
    ease: "power2.out",
  });
});

profileImgContainer.addEventListener("mouseleave", () => {
  gsap.to(".profile-img", {
    duration: 1,
    scale: 1,
    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
    ease: "power2.inOut",
  });
});

gsap.from("header", {
  duration: 1.5,
  y: -100,
  opacity: 0,
  ease: "power4.out",
});

gsap.from(".about-text", {
  duration: 1.2,
  x: -100,
  opacity: 0,
  ease: "power3.out",
  delay: 0.3,
});

gsap.from(".about-image", {
  duration: 1.2,
  rotationY: 45,
  x: 100,
  opacity: 0,
  ease: "power3.out",
  delay: 0.3,
});

gsap.from(".skill-tag", {
  duration: 0.8,
  scale: 0,
  opacity: 0,
  rotation: -15,
  stagger: {
    amount: 1.5,
    from: "random",
  },
  ease: "back.out(1.7)",
});

const companyCards = document.querySelectorAll(".company");
companyCards.forEach((card, index) => {
  gsap.from(card, {
    duration: 1,
    y: 100,
    opacity: 0,
    rotation: 5,
    transformOrigin: "left bottom",
    ease: "power3.out",
    delay: 0.2 * index,
  });
});

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("mouseenter", () => {
    gsap.to(button, {
      duration: 0.3,
      scale: 1.05,
      ease: "power1.out",
    });
  });
  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      duration: 0.3,
      scale: 1,
      ease: "power1.out",
    });
  });
});

gsap.to(".tech-icon", {
  y: -20,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  stagger: 0.5,
});
