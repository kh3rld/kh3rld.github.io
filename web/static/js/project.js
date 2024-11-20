AOS.init({
  duration: 1000,
  once: true,
});

const GITHUB_USERNAME = "kh3rld";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

async function fetchGithubProjects() {
  const cacheKey = `githubProjects_${GITHUB_USERNAME}`;
  const cachedData = localStorage.getItem(cacheKey);

  // Check if cached data exists and is not expired
  if (cachedData) {
    console.log("Using cached data");
    return JSON.parse(cachedData);
  }

  try {
    const response = await fetch(GITHUB_API_URL);
    if (!response.ok) throw new Error("GitHub API request failed");

    const repos = await response.json();

    // Fetch additional data for each repo (languages, topics)
    const detailedRepos = await Promise.all(
      repos.map(async (repo) => {
        const [languagesRes, topicsRes] = await Promise.all([
          fetch(repo.languages_url),
          fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/topics`,
            {
              headers: {
                Accept: "application/vnd.github.mercy-preview+json",
              },
            }
          ),
        ]);

        const languages = await languagesRes.json();
        const { names: topics } = await topicsRes.json();

        return {
          ...repo,
          detailedLanguages: languages,
          topics: topics || [],
        };
      })
    );

    // Cache the fetched data with a timestamp
    localStorage.setItem(cacheKey, JSON.stringify(detailedRepos));
    return detailedRepos.map((repo) => ({
      name: repo.name,
      description: repo.description || "No description available",
      html_url: repo.html_url,
      homepage: repo.homepage,
      topics: repo.topics,
      languages: Object.keys(repo.detailedLanguages),
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      created_at: new Date(repo.created_at).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
}

function createProjectCard(project) {
  const categoryMap = {
    web: [
      "web",
      "frontend",
      "backend",
      "fullstack",
      "javascript",
      "typescript",
      "react",
      "vue",
      "angular",
    ],
    ai: ["ai", "machine-learning", "deep-learning", "tensorflow", "pytorch"],
    blockchain: ["blockchain", "web3", "crypto", "ethereum", "solidity"],
  };

  let categories = new Set();
  project.topics.forEach((topic) => {
    Object.entries(categoryMap).forEach(([category, keywords]) => {
      if (keywords.some((keyword) => topic.toLowerCase().includes(keyword))) {
        categories.add(category);
      }
    });
  });

  const card = document.createElement("div");
  card.className = "project-card";
  card.setAttribute("data-category", Array.from(categories).join(" "));
  card.setAttribute("data-aos", "fade-up");

  card.innerHTML = `
    <h2 class="project-title">${project.name}</h2>
    <p class="project-description">${project.description}</p>
    <div class="project-tech">
      ${project.languages
        .map((lang) => `<span class="tech-tag">${lang}</span>`)
        .join("")}
      ${project.topics
        .map((topic) => `<span class="tech-tag">${topic}</span>`)
        .join("")}
    </div>
    <div class="project-stats">
      <div class="stat">
        <i class="fas fa-star"></i>
        ${project.stargazers_count} stars
      </div>
      <div class="stat">
        <i class="fas fa-code-branch"></i>
        ${project.forks_count} forks
      </div>
      <div class="stat">
        <i class="far fa-calendar-alt"></i>
        ${project.created_at}
      </div>
    </div>
    <div class="project-links">
      <a href="${project.html_url}" class="project-link" target="_blank">
        <i class="fab fa-github"></i> View Source
      </a>
      ${
        project.homepage
          ? `
        <a href="${project.homepage}" class="project-link" target="_blank">
          <i class="fas fa-external-link-alt"></i> Live Demo
        </a>
      `
          : ""
      }
    </div>
  `;

  return card;
}

async function initializeProjects() {
  const projectsGrid = document.querySelector(".projects-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  projectsGrid.innerHTML = '<div class="loading">Loading projects</div>';

  const projects = await fetchGithubProjects();

  if (projects.length === 0) {
    projectsGrid.innerHTML = '<div class="no-results">No projects found</div>';
    return;
  }

  // Sort projects by stars (stargazers_count)
  projects.sort((a, b) => b.stargazers_count - a.stargazers_count);

  projectsGrid.innerHTML = "";

  projects.forEach((project, index) => {
    const card = createProjectCard(project);
    projectsGrid.appendChild(card);

    // Animation - smooth curved entrance effect
    gsap.from(card, {
      duration: 1,
      opacity: 0,
      y: 30,
      scale: 0.8,
      ease: "power3.out",
      delay: index * 0.1, // Delay for staggered animation
    });
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      let hasVisibleProjects = false;

      document.querySelectorAll(".project-card").forEach((card) => {
        const categories = card.getAttribute("data-category").split(" ");
        const shouldShow = filter === "all" || categories.includes(filter);

        if (shouldShow) hasVisibleProjects = true;

        gsap.to(card, {
          duration: 0.5,
          scale: shouldShow ? 1 : 0.8,
          opacity: shouldShow ? 1 : 0,
          display: shouldShow ? "block" : "none",
          ease: "power2.out",
        });
      });

      if (!hasVisibleProjects) {
        const noResults = document.createElement("div");
        noResults.className = "no-results";
        noResults.textContent = `No ${filter} projects found`;
        projectsGrid.appendChild(noResults);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initializeProjects);
