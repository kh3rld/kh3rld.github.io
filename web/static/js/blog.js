// Filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const blogPosts = document.querySelectorAll(".blog-post");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    blogPosts.forEach((post) => {
      const categories = post.getAttribute("data-category").split(" ");

      if (filter === "all" || categories.includes(filter)) {
        gsap.to(post, {
          duration: 0.5,
          scale: 1,
          opacity: 1,
          display: "block",
        });
      } else {
        gsap.to(post, {
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
gsap.from(".blog-post", {
  duration: 0.8,
  y: 50,
  opacity: 0,
  stagger: 0.2,
  delay: 1,
});

// Hover animations for blog posts
blogPosts.forEach((post) => {
  post.addEventListener("mouseenter", () => {
    gsap.to(post, {
      duration: 0.3,
      y: -5,
      boxShadow: "0 10px 20px rgba(111, 136, 144, 0.2)",
    });
  });

  post.addEventListener("mouseleave", () => {
    gsap.to(post, { duration: 0.3, y: 0, boxShadow: "none" });
  });
});

// Pagination functionality (for demonstration, not fully implemented)
const pageButtons = document.querySelectorAll(".page-btn");
pageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    pageButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    // TODO: typically load new content or change the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
