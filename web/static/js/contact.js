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

// Form submission animation
const form = document.getElementById("contact-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  gsap.to(form, {
    duration: 0.5,
    opacity: 0,
    y: -50,
    onComplete: () => {
      form.innerHTML =
        '<h2 style="color: var(--accent-color);">Thank you for your message!</h2><p>We\'ll get back to you soon.</p>';
      gsap.from(form.children, {
        duration: 0.5,
        opacity: 0,
        y: 50,
        stagger: 0.2,
      });
    },
  });
});

// Entrance animations
gsap.from("header", { duration: 1, y: -50, opacity: 0 });
gsap.from(".contact-form", { duration: 1, x: -50, opacity: 0, delay: 0.5 });
gsap.from(".contact-info", { duration: 1, x: 50, opacity: 0, delay: 0.5 });
gsap.from(".home-button", {
  duration: 1,
  scale: 0,
  opacity: 0,
  delay: 1,
  ease: "back.out(1.7)",
});
