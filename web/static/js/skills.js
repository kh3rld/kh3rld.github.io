gsap.registerPlugin(ScrollTrigger);

gsap.from("header", {
  duration: 1.5,
  y: -100,
  opacity: 0,
  ease: "elastic.out(1, 0.7)",
});

gsap.from(".filter-btn", {
  duration: 0.8,
  scale: 0,
  opacity: 0,
  stagger: 0.1,
  ease: "back.out(1.7)",
  delay: 0.5,
});

gsap.from(".skills-category", {
  duration: 1,
  y: 100,
  opacity: 0,
  rotation: 5,
  stagger: 0.2,
  ease: "power4.out",
  delay: 1,
});

const filterButtons = document.querySelectorAll(".filter-btn");
const skillsCategories = document.querySelectorAll(".skills-category");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    skillsCategories.forEach((category) => {
      const categories = category.getAttribute("data-category").split(" ");

      if (filter === "all" || categories.includes(filter)) {
        gsap.to(category, {
          duration: 0.8,
          scale: 1,
          opacity: 1,
          rotationX: 0,
          ease: "power4.out",
          display: "block",
        });
      } else {
        gsap.to(category, {
          duration: 0.8,
          scale: 0.9,
          opacity: 0,
          rotationX: -15,
          ease: "power4.in",
          display: "none",
        });
      }
    });
  });
});

const skillItems = document.querySelectorAll(".skill-item");
skillItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      duration: 0.4,
      y: -5,
      rotationX: 10,
      scale: 1.05,
      ease: "power2.out",
      boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
    });

    gsap.to(item.querySelector("i"), {
      duration: 0.3,
      scale: 1.2,
      color: "#e5dfc7",
      ease: "back.out(1.7)",
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      duration: 0.4,
      y: 0,
      rotationX: 0,
      scale: 1,
      ease: "power2.inOut",
      boxShadow: "none",
    });

    gsap.to(item.querySelector("i"), {
      duration: 0.3,
      scale: 1,
      color: "#e5dfc7",
      ease: "power2.inOut",
    });
  });
});
