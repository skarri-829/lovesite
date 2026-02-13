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

// Add page transition effect
document
  .querySelectorAll(".nav-button, .adventure-button")
  .forEach((button) => {
    button.addEventListener("click", (e) => {
      // Check if it's the back button (to memories)
      if (
        button.classList.contains("back") &&
        button.href.includes("memories.html")
      ) {
        e.preventDefault(); // Prevent immediate navigation
        document.body.classList.add("page-transition-up");
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

// Envelope and Letter interaction
const envelope = document.getElementById("envelope");
const letterPaper = document.getElementById("letterPaper");
const closeButton = document.getElementById("closeButton");

// Create backdrop
const backdrop = document.createElement("div");
backdrop.className = "letter-backdrop";
document.body.appendChild(backdrop);

// Open letter
if (envelope) {
  envelope.addEventListener("click", () => {
    envelope.classList.add("opening");
    setTimeout(() => {
      letterPaper.classList.add("show");
      backdrop.classList.add("show");
    }, 600);
  });
}

// Close letter
function closeLetter() {
  letterPaper.classList.remove("show");
  backdrop.classList.remove("show");
  setTimeout(() => {
    envelope.classList.remove("opening");
  }, 500);
}

if (closeButton) {
  closeButton.addEventListener("click", closeLetter);
}

if (backdrop) {
  backdrop.addEventListener("click", closeLetter);
}

// Add CSS for sparkles
// const style = document.createElement("style");
// style.textContent = `
// `;
// document.head.appendChild(style);
