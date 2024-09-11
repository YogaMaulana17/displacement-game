const chara = document.getElementById("chara");
const buttonTop = document.querySelector(".top");
const buttonRight = document.querySelector(".right");
const buttonBottom = document.querySelector(".bottom");
const buttonLeft = document.querySelector(".left");
const specialButton = document.querySelector(".special");
const moveSound = new Audio("sound/move.mp3");
const specialSound = new Audio("sound/spesial.mp3");
const countElem = document.querySelector(".count");
const resetButton = document.getElementById("resetButton");

// Ambil nilai movementCount dari localStorage, jika ada
let movementCount = parseInt(localStorage.getItem("movementCount")) || 0;
let charaPositionX = 0; // Inisialisasi variabel posisi
let charaPositionY = 0; // Inisialisasi variabel posisi

// Fungsi untuk memperbarui localStorage
function saveMovementCount() {
  localStorage.setItem("movementCount", movementCount);
}

function playSoundSpecial() {
  specialSound.currentTime = 0; // Mulai dari awal
  specialSound.play();
}

function playSound() {
  moveSound.currentTime = 0; // Mulai dari awal
  moveSound.play();
}

function updateMovementCount() {
  countElem.textContent = `Pergerakan: ${movementCount}`;
  // Periksa jika movementCount adalah kelipatan 50
  if (movementCount > 0 && movementCount % 50 === 0) {
    playSoundSpecial();
  }
  // Simpan nilai movementCount ke localStorage
  saveMovementCount();
}

// Fungsi untuk menggerakkan karakter ke atas
function moveUp() {
  charaPositionY -= 10;
  chara.style.top = charaPositionY + "px";
  movementCount++;
  playSound();
  updateMovementCount();
}

// Fungsi untuk menggerakkan karakter ke kanan
function moveRight() {
  charaPositionX += 10;
  chara.style.left = charaPositionX + "px";
  movementCount++;
  playSound();
  updateMovementCount();
}

// Fungsi untuk menggerakkan karakter ke bawah
function moveDown() {
  charaPositionY += 10;
  chara.style.top = charaPositionY + "px";
  movementCount++;
  playSound();
  updateMovementCount();
}

// Fungsi untuk menggerakkan karakter ke kiri
function moveLeft() {
  charaPositionX -= 10;
  chara.style.left = charaPositionX + "px";
  movementCount++;
  playSound();
  updateMovementCount();
}

// Fungsi untuk mereset count dan localStorage
// Fungsi untuk mereset count dan localStorage
function resetCount() {
  movementCount = 0;
  countElem.textContent = `Pergerakan: ${movementCount}`;
  localStorage.removeItem("movementCount"); // Menghapus nilai dari localStorage
}

// Event listener untuk tombol reset
resetButton.addEventListener("click", function () {
  resetCount();
  // Debugging: Pastikan event listener berfungsi
  console.log("Reset button clicked.");
});

// Event listener untuk tombol arah
buttonTop.addEventListener("click", moveUp);
buttonRight.addEventListener("click", moveRight);
buttonBottom.addEventListener("click", moveDown);
buttonLeft.addEventListener("click", moveLeft);

// Event listener untuk keyboard
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "s":
      playSoundSpecial();
      break;
    default:
      return; // Keluar dari fungsi jika tombol lain ditekan
  }
});

// Event listener untuk tombol reset
resetButton.addEventListener("click", resetCount);

// Muat nilai movementCount dan update tampilan saat halaman dimuat
updateMovementCount();
