export const useBombPetal = () => {
  const petalsContainer = document.querySelector("body");
  if (!petalsContainer) return;

  petalsContainer.style.overflow = "hidden";
  const numberOfPetals = 200;

  for (let i = 0; i < numberOfPetals; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petalsContainer.prepend(petal);

    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    const randomDelay = Math.random() * 3;
    const duration = Math.random() * 3 + 2;
    const size = Math.random() * 12 + 8;
    const color = getRandomColor();

    petal.style.left = `${randomX}px`;
    petal.style.top = `${randomY}px`;
    petal.style.animation = `fall ${duration}s ease-out ${randomDelay}s infinite`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.backgroundColor = color;
  }

  setTimeout(() => {
    document.querySelectorAll(".petal").forEach((el) => el.remove());
    petalsContainer.style.overflow = "";
  }, 5000);

  function getRandomColor() {
    const rainbowColors = [
      "ff0000", // Red
      "ff7f00", // Orange
      "ffff00", // Yellow
      "00ff00", // Green
      "00ffff", // Cyan
      "0000ff", // Blue
      "8a2be2", // BlueViolet
      "ff00ff", // Magenta
    ];
    return "#" + rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
  }
};
