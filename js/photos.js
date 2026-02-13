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

// Carousel functionality
const carouselTrack = document.querySelector(".carousel-track");
const carouselItems = document.querySelectorAll(".photo-item");
const prevBtn = document.querySelector(".carousel-nav.prev");
const nextBtn = document.querySelector(".carousel-nav.next");
const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

// Create dots
carouselItems.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("carousel-dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".carousel-dot");

// Update active states
function updateActiveStates() {
  carouselItems.forEach((item, index) => {
    item.classList.toggle("active", index === currentIndex);
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });

  // Show/hide navigation based on current slide
  const isLastSlide = currentIndex === carouselItems.length - 1;
  const carouselNav = document.querySelectorAll(".carousel-nav");
  const carouselDots = document.querySelector(".carousel-dots");

  if (isLastSlide) {
    // Hide carousel navigation
    carouselNav.forEach((btn) => (btn.style.display = "none"));
    carouselDots.style.display = "none";

    // Create and show next page button in carousel position
    let nextPageBtn = document.querySelector(".nav-button.next");
    if (!nextPageBtn) {
      nextPageBtn = document.createElement("a");
      nextPageBtn.href = "songs.html";
      nextPageBtn.className = "nav-button next carousel-positioned";
      nextPageBtn.innerHTML = "<span>Next Chapter: Our Songs ➡️</span>";
      document.querySelector(".carousel-container").appendChild(nextPageBtn);

      // Add page transition effect for the new button
      nextPageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.add("page-transition-left");
        setTimeout(() => {
          window.location.href = nextPageBtn.href;
        }, 800);
      });
    }
    nextPageBtn.classList.add("carousel-positioned");
    nextPageBtn.style.display = "inline-block";
  } else {
    // Show carousel navigation
    carouselNav.forEach((btn) => (btn.style.display = "flex"));
    carouselDots.style.display = "flex";

    // Hide next page button
    const nextPageBtn = document.querySelector(".nav-button.next");
    if (nextPageBtn) {
      nextPageBtn.style.display = "none";
      nextPageBtn.classList.remove("carousel-positioned");
    }
  }
}

// Go to specific slide
function goToSlide(index) {
  if (index < 0) {
    currentIndex = 0;
  } else if (index >= carouselItems.length) {
    currentIndex = carouselItems.length - 1;
  } else {
    currentIndex = index;
  }

  const itemWidth = carouselItems[0].offsetWidth;
  const gap = 32; // 2rem
  const offset = currentIndex * (itemWidth + gap);

  carouselTrack.style.transform = `translateX(-${offset}px)`;
  updateActiveStates();
}

// Navigation buttons
prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
nextBtn.addEventListener("click", () => {
  if (currentIndex < carouselItems.length - 1) {
    goToSlide(currentIndex + 1);
  }
});

// Mouse drag functionality
function touchStart(index) {
  return function (event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    carouselTrack.classList.add("dragging");

    // Prevent page scrolling on touch
    if (event.type === "touchstart") {
      event.preventDefault();
    }
  };
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;

    // Prevent page scrolling while dragging
    if (event.type === "touchmove") {
      event.preventDefault();
    }
  }
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  carouselTrack.classList.remove("dragging");

  const movedBy = currentTranslate - prevTranslate;

  // Swipe threshold
  if (movedBy < -50 && currentIndex < carouselItems.length - 1) {
    currentIndex += 1;
  }
  if (movedBy > 50 && currentIndex > 0) {
    currentIndex -= 1;
  }

  goToSlide(currentIndex);

  const itemWidth = carouselItems[0].offsetWidth;
  const gap = 32;
  prevTranslate = -currentIndex * (itemWidth + gap);
  currentTranslate = prevTranslate;
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  if (isDragging) {
    carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
    requestAnimationFrame(animation);
  }
}

// Event listeners for mouse and touch
carouselTrack.addEventListener("mousedown", touchStart(0));
carouselTrack.addEventListener("touchstart", touchStart(0), { passive: false });
carouselTrack.addEventListener("mousemove", touchMove);
carouselTrack.addEventListener("touchmove", touchMove, { passive: false });
carouselTrack.addEventListener("mouseup", touchEnd);
carouselTrack.addEventListener("touchend", touchEnd);
carouselTrack.addEventListener("mouseleave", () => {
  if (isDragging) touchEnd();
});

// Prevent context menu on long press
carouselTrack.addEventListener("contextmenu", (e) => e.preventDefault());

// Initialize
updateActiveStates();

// Handle window resize
window.addEventListener("resize", () => {
  goToSlide(currentIndex);
});

// Add page transition effect
document
  .querySelectorAll(".nav-button, .adventure-button")
  .forEach((button) => {
    button.addEventListener("click", (e) => {
      // Check if it's the back button (to password page)
      if (
        button.classList.contains("back") &&
        button.href.includes("index.html")
      ) {
        e.preventDefault(); // Prevent immediate navigation
        document.body.classList.add("page-transition-back");
        setTimeout(() => {
          window.location.href = button.href;
        }, 800);
      }
      // Check if it's the next button (to songs)
      else if (
        button.classList.contains("next") &&
        button.href.includes("songs.html")
      ) {
        e.preventDefault(); // Prevent immediate navigation
        document.body.classList.add("page-transition-left");
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

// Add CSS for floating hearts and sparkles
const style = document.createElement("style");
style.textContent = `
`;
document.head.appendChild(style);
