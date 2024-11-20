// Glow effect following cursor
const glow = document.createElement("div");
glow.className = "glow";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  gsap.to(glow, {
    duration: 0.6,
    x: e.clientX - 75,
    y: e.clientY - 75,
    ease: "power2.out",
  });
});

// Enhanced floating particles
const colors = ["#6f8890", "#4b6474", "#758b93"];
const numParticles = 30;

for (let i = 0; i < numParticles; i++) {
  let particle = document.createElement("div");
  particle.className = "particle";
  document.body.appendChild(particle);

  gsap.set(particle, {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    scale: Math.random() * 0.3 + 0.2,
    borderRadius: "50%",
  });

  gsap.to(particle, {
    duration: Math.random() * 3 + 2,
    x: `+=${Math.random() * 200 - 100}`,
    y: `+=${Math.random() * 200 - 100}`,
    rotation: Math.random() * 360,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(particle, {
    duration: Math.random() * 2 + 1,
    opacity: 0.1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

// Enhanced form animations
const form = document.getElementById("contact-form");
const inputs = document.querySelectorAll("input, textarea");

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    gsap.to(input, {
      duration: 0.3,
      scale: 1.02,
      borderColor: "#6f8890",
      ease: "power2.out",
    });
  });

  input.addEventListener("blur", () => {
    gsap.to(input, {
      duration: 0.3,
      scale: 1,
      borderColor: "transparent",
      ease: "power2.out",
    });
  });
});

form.addEventListener("submit", function (e) {
  gsap
    .timeline()
    .to(form, {
      duration: 0.5,
      scale: 0.95,
      opacity: 0,
      ease: "power2.in",
    })
    .call(() => {
      form.innerHTML =
        '<h2 style="color: var(--accent-color);">Message Sent!</h2><p>We\'ll get back to you soon.</p>';
    })
    .from(form.children, {
      duration: 0.8,
      opacity: 0,
      y: 30,
      scale: 0.9,
      stagger: 0.2,
      ease: "elastic.out(1, 0.8)",
    });
});

// Enhanced entrance animations
const tl = gsap.timeline();

tl.from("header", {
  duration: 1.2,
  y: -100,
  opacity: 0,
  ease: "power4.out",
})
  .from(
    ".contact-form",
    {
      duration: 1,
      x: -50,
      opacity: 0,
      rotation: -2,
      ease: "back.out(1.7)",
    },
    "-=0.5"
  )
  .from(
    ".contact-info",
    {
      duration: 1,
      x: 50,
      opacity: 0,
      rotation: 2,
      ease: "back.out(1.7)",
    },
    "-=0.8"
  )
  .from(
    ".contact-method",
    {
      duration: 0.8,
      opacity: 0,
      x: 30,
      stagger: 0.2,
      ease: "power3.out",
    },
    "-=0.5"
  )
  .from(
    ".social-link",
    {
      duration: 0.6,
      scale: 0,
      opacity: 0,
      rotation: -180,
      stagger: 0.1,
      ease: "back.out(1.7)",
    },
    "-=0.5"
  );
