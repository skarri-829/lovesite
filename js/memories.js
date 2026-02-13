// Add fade-in animation on scroll for content
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply fade-in to main content elements
document
  .querySelectorAll(
    ".photo-gallery, .song-list, .memory-grid, .letter-container, .chapter-intro, .intro-text",
  )
  .forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

// Memory items click effect
document.querySelectorAll(".memory-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.style.transform = "scale(0.95)";
    setTimeout(() => {
      item.style.transform = "";
    }, 150);
  });
});

// Falling tulip effect for memory image
const memoryImage = document.querySelector(".memory-image");
if (memoryImage) {
  memoryImage.addEventListener("click", () => {
    createFallingTulip();
  });
}

function createFallingTulip() {
  const tulip = document.createElement("img");
  tulip.src = "assets/tulip.png";
  tulip.className = "falling-tulip";
  tulip.style.left = Math.random() * 100 + "%";
  tulip.style.animationDelay = Math.random() * 0.5 + "s";

  document.body.appendChild(tulip);

  // Remove tulip after animation completes
  setTimeout(() => {
    if (tulip.parentNode) {
      tulip.parentNode.removeChild(tulip);
    }
  }, 5000);
}

// Add page transition effect
document
  .querySelectorAll(".nav-button, .adventure-button")
  .forEach((button) => {
    button.addEventListener("click", (e) => {
      // Check if it's the back button (to songs)
      if (
        button.classList.contains("back") &&
        button.href.includes("songs.html")
      ) {
        e.preventDefault(); // Prevent immediate navigation
        document.body.classList.add("page-transition-right");
        setTimeout(() => {
          window.location.href = button.href;
        }, 800);
      }
      // Check if it's the next button (to letter)
      else if (
        button.classList.contains("next") &&
        button.href.includes("letter.html")
      ) {
        e.preventDefault(); // Prevent immediate navigation
        document.body.classList.add("page-transition-down");
        setTimeout(() => {
          window.location.href = button.href;
        }, 800);
      } else {
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.3s ease";
      }
    });
  });

// Add entrance animation for the page
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Add CSS for sparkles
const style = document.createElement("style");
style.textContent = `
`;
document.head.appendChild(style);
