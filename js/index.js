// Password check functionality
document.addEventListener("DOMContentLoaded", () => {
  const unlockBtn = document.getElementById("unlock-btn");
  if (unlockBtn) {
    unlockBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const digit1 = document.getElementById("digit1").value;
      const digit2 = document.getElementById("digit2").value;
      const digit3 = document.getElementById("digit3").value;
      const digit4 = document.getElementById("digit4").value;
      const enteredPassword = digit1 + digit2 + digit3 + digit4;
      const correctPassword = "2604";

      if (enteredPassword === correctPassword) {
        // Add transition effect before redirecting
        document.body.classList.add("page-transition-out");

        // Redirect after animation completes
        setTimeout(() => {
          window.location.href = "photos.html";
        }, 800);
      } else {
        // Show error message
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent =
          "Oops! That's not the right code. Try again! 💔";
        errorMessage.style.display = "block";
        // Clear inputs
        document.getElementById("digit1").value = "";
        document.getElementById("digit2").value = "";
        document.getElementById("digit3").value = "";
        document.getElementById("digit4").value = "";
        document.getElementById("digit1").focus();
      }
    });

    // Auto-focus next input
    const inputs = document.querySelectorAll(".digit-input");
    inputs.forEach((input, index) => {
      input.addEventListener("input", () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });
    });
  }
});

// Falling hearts animation for password page
function createFallingHeart() {
  const heart = document.createElement("div");
  heart.className = "falling-heart";
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDelay = Math.random() * 2 + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

// Start falling hearts when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Create initial hearts
  for (let i = 0; i < 18; i++) {
    setTimeout(createFallingHeart, i * 200);
  }

  // Continue creating hearts even more frequently
  setInterval(createFallingHeart, 250);
});
