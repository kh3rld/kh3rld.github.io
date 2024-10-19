// Floating particles animation
const colors = ["#00ff99", "#ff00ff", "#00ffff"];
const numParticles = 50;

for (let i = 0; i < numParticles; i++) {
  let particle = document.createElement("div");
  particle.className = "particle";
  document.body.appendChild(particle);

  gsap.set(particle, {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    scale: Math.random() * 0.5 + 0.5,
  });

  gsap.to(particle, {
    duration: Math.random() * 2 + 1,
    x: "+=50",
    y: "+=50",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(particle, {
    duration: Math.random() * 2 + 1,
    opacity: 0.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

// Entrance animations
gsap.from("header", { duration: 1, y: -50, opacity: 0 });
gsap.from(".about-text", { duration: 1, x: -50, opacity: 0, delay: 0.5 });
gsap.from(".about-image", { duration: 1, x: 50, opacity: 0, delay: 0.5 });
gsap.from(".skill-tag", {
  duration: 0.5,
  scale: 0,
  opacity: 0,
  stagger: 0.1,
  delay: 1,
});
gsap.from(".quote", { duration: 1, y: 50, opacity: 0, delay: 1.5 });

// Hover effect for skill tags
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", () => {
    gsap.to(tag, { duration: 0.3, y: -3, scale: 1.1, ease: "power1.out" });
  });
  tag.addEventListener("mouseleave", () => {
    gsap.to(tag, { duration: 0.3, y: 0, scale: 1, ease: "power1.out" });
  });
});

// Animate tech icons
gsap.to(".tech-icon", {
  y: -20,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  stagger: 0.5,
});

// Image color pop effect
const profileImg = document.querySelector(".profile-img");

profileImg.addEventListener("mouseover", () => {
  gsap.to(profileImg, {
    duration: 0.5,
    filter: "saturate(1.5) contrast(1.2)",
    scale: 1.05,
    ease: "power2.out",
  });
});

profileImg.addEventListener("mouseout", () => {
  gsap.to(profileImg, {
    duration: 0.5,
    filter: "saturate(1) contrast(1)",
    scale: 1,
    ease: "power2.out",
  });
});

// Random shape morphing for profile image
function generateRandomShape() {
  const randomness = () => Math.floor(Math.random() * 71) + 30; // 30 to 100
  return `${randomness()}% ${randomness()}% ${randomness()}% ${randomness()}% / ${randomness()}% ${randomness()}% ${randomness()}% ${randomness()}%`;
}

setInterval(() => {
  gsap.to(profileImg, {
    duration: 3,
    borderRadius: generateRandomShape(),
    ease: "sine.inOut",
  });
}, 5000);
