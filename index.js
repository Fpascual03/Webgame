const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const container = document.getElementById("gameContainer");
const overlay = document.getElementById("overlay");
const closeOverlay = document.getElementById("closeOverlay");
const countdownEl = document.getElementById("countdown");

let countdown = 15;
let timer;

// Function to show Yes overlay
function chooseYes() {
  overlay.classList.add("active");
  clearInterval(timer); // stop countdown
}

// Randomize No button position
function randomPosition() {
  const containerRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Move No button when mouse gets close
container.addEventListener("mousemove", (e) => {
  const btnRect = noBtn.getBoundingClientRect();
  const distance = Math.hypot(
    e.clientX - (btnRect.left + btnRect.width / 2),
    e.clientY - (btnRect.top + btnRect.height / 2)
  );

  if (distance < 100) {
    randomPosition();
  }
});

// No button click → just move
noBtn.addEventListener("click", randomPosition);

// Yes button click → overlay
yesBtn.addEventListener("click", chooseYes);

closeOverlay.addEventListener("click", () => {
  overlay.classList.remove("active");
});

// Start countdown
function startCountdown() {
  timer = setInterval(() => {
    countdown--;
    countdownEl.textContent = countdown;

    if (countdown <= 0) {
      chooseYes(); // auto choose Yes
    }
  }, 1000);
}

// Run countdown on page load
startCountdown();
