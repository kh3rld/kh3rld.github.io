// Filter functionality
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
          duration: 0.5,
          scale: 1,
          opacity: 1,
          display: "block",
        });
      } else {
        gsap.to(category, {
          duration: 0.5,
          scale: 0.8,
          opacity: 0,
          display: "none",
        });
      }
    });
  });
});

// Entrance animations
gsap.from("header", { duration: 1, y: -50, opacity: 0 });
gsap.from(".filter-btn", {
  duration: 0.5,
  y: -20,
  opacity: 0,
  stagger: 0.1,
  delay: 0.5,
});
gsap.from(".skills-category", {
  duration: 0.8,
  y: 50,
  opacity: 0,
  stagger: 0.2,
  delay: 1,
});

// Hover animations for skill items
const skillItems = document.querySelectorAll(".skill-item");
skillItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      duration: 0.3,
      y: -5,
      boxShadow: "0 5px 15px rgba(0, 255, 153, 0.2)",
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, { duration: 0.3, y: 0, boxShadow: "none" });
  });
});
