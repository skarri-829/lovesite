// Vinyl Player Control
const playButton = document.getElementById("playButton");
const vinylDisc = document.getElementById("vinylDisc");
const playerArm = document.getElementById("playerArm");
const playIcon = document.querySelector(".play-icon");
const pauseIcon = document.querySelector(".pause-icon");

let isPlaying = false;

if (playButton) {
  playButton.addEventListener("click", () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      vinylDisc.classList.add("spinning");
      playerArm.classList.add("playing");
      playIcon.style.display = "none";
      pauseIcon.style.display = "inline";
    } else {
      vinylDisc.classList.remove("spinning");
      playerArm.classList.remove("playing");
      playIcon.style.display = "inline";
      pauseIcon.style.display = "none";
    }
  });
}

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
      // Check if it's the back button (to photos)
      if (
        button.classList.contains("back") &&
        button.href.includes("photos.html")
      ) {
        e.preventDefault(); // Prevent immediate navigation
        document.body.classList.add("page-transition-right");
        setTimeout(() => {
          window.location.href = button.href;
        }, 800);
      }
      // Check if it's the next button (to memories)
      else if (
        button.classList.contains("next") &&
        button.href.includes("memories.html")
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

// Scratch Pad Functionality
const scratchPad = document.getElementById("scratchPad");
let audio = null;
let isScratched = false;

if (scratchPad) {
  const ctx = scratchPad.getContext("2d");
  let isDrawing = false;
  let scratchedPixels = 0;
  const totalPixels = scratchPad.width * scratchPad.height;

  // Set canvas size to match player body
  function resizeCanvas() {
    const playerBody = document.querySelector(".player-body");
    if (playerBody) {
      const rect = playerBody.getBoundingClientRect();
      scratchPad.width = rect.width;
      scratchPad.height = rect.height;

      // Clear canvas first
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Fill with solid color (this will be scratched away to reveal underneath)
      ctx.fillStyle = "#ff69b4";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Add gradient overlay for visual appeal
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, "rgba(255, 105, 180, 0.95)");
      gradient.addColorStop(1, "rgba(255, 20, 147, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Add text with better contrast and instructions
      ctx.fillStyle = "white";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 2;
      ctx.font = "bold 20px 'Dancing Script', cursive";
      ctx.textAlign = "center";
      ctx.strokeText(
        "Scratch Here to Reveal",
        rect.width / 2,
        rect.height / 2 - 30,
      );
      ctx.fillText(
        "Scratch Here to Reveal",
        rect.width / 2,
        rect.height / 2 - 30,
      );
      ctx.font = "14px 'Quicksand', sans-serif";
      ctx.strokeText(
        "and Play Our Special Song",
        rect.width / 2,
        rect.height / 2 - 5,
      );
      ctx.fillText(
        "and Play Our Special Song",
        rect.width / 2,
        rect.height / 2 - 5,
      );
      ctx.font = "12px 'Quicksand', sans-serif";
      ctx.strokeText(
        "👆 Scratch with your finger or mouse",
        rect.width / 2,
        rect.height / 2 + 25,
      );
      ctx.fillText(
        "👆 Scratch with your finger or mouse",
        rect.width / 2,
        rect.height / 2 + 25,
      );

      scratchedPixels = 0;
    }
  }

  // Initialize canvas
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Scratch functionality
  function scratch(e) {
    if (isScratched) return;

    isDrawing = true;
    const rect = scratchPad.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    // Save context state
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Add sparkle effect at scratch location
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    for (let i = 0; i < 3; i++) {
      const sparkleX = x + (Math.random() - 0.5) * 20;
      const sparkleY = y + (Math.random() - 0.5) * 20;
      ctx.beginPath();
      ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Check if enough is scratched (look for transparent areas)
    const imageData = ctx.getImageData(
      0,
      0,
      scratchPad.width,
      scratchPad.height,
    );
    let transparentPixels = 0;
    const totalPixels = imageData.data.length / 4;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 30) transparentPixels++;
    }

    const scratchedPercentage = transparentPixels / totalPixels;

    if (scratchedPercentage > 0.3) {
      // 30% scratched
      isScratched = true;
      // Add a fade out effect
      scratchPad.style.transition = "opacity 0.5s ease";
      scratchPad.style.opacity = "0";
      setTimeout(() => {
        scratchPad.style.display = "none";
        playSong();
      }, 500);
    }
  }

  function stopScratching() {
    isDrawing = false;
  }

  // Event listeners
  scratchPad.addEventListener("mousedown", () => (isDrawing = true));
  scratchPad.addEventListener("mousemove", (e) => {
    if (isDrawing) scratch(e);
  });
  scratchPad.addEventListener("mouseup", stopScratching);
  scratchPad.addEventListener("mouseout", stopScratching);

  // Touch events
  scratchPad.addEventListener("touchstart", (e) => {
    e.preventDefault();
    scratch(e);
  });
  scratchPad.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (isDrawing) scratch(e);
  });
  scratchPad.addEventListener("touchend", stopScratching);
}

function playSong() {
  // Replace 'YOUR_SONG_URL_HERE' with the actual song URL
  // IMPORTANT: Use a direct audio file URL (MP3, WAV, etc.) - YouTube URLs won't work
  // You can find direct audio URLs by:
  // 1. Using a YouTube to MP3 converter website
  // 2. Hosting the audio file on your own server
  // 3. Using a music streaming service that provides direct links
  const songUrl = "/assets/darling.mp3";

  if (songUrl && songUrl !== "YOUR_SONG_URL_HERE") {
    if (audio) {
      audio.pause();
    }

    audio = new Audio(songUrl);
    
    // Add load error handling
    audio.addEventListener('error', (e) => {
      console.error("Audio loading error:", e);
      console.error("Audio error code:", audio.error ? audio.error.code : 'unknown');
      alert("Unable to load the audio file. Error: " + (audio.error ? audio.error.message : 'Unknown error'));
    });
    
    // Try to play with better error handling
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log("Audio playing successfully");
      }).catch((e) => {
        console.error("Audio play failed:", e);
        alert(
          "Unable to play the song. This might be due to browser restrictions. Try clicking the play button below.",
        );
      });
    }

    // Also trigger the visual player
    if (playButton) {
      playButton.click();
    }
  } else {
    alert(
      "Please provide a valid direct audio file URL in the JavaScript code! YouTube URLs won't work - you need a direct MP3/WAV download link.",
    );
  }
}

// Add CSS for sparkles
const style = document.createElement("style");
style.textContent = `
`;
document.head.appendChild(style);
