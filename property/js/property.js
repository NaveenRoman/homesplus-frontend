document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelector(".slides");
  const items = document.querySelectorAll(".slides img, .slides video");
  const dotsContainer = document.querySelector(".dots");

  let index = 0;

  // create dots
  items.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => moveSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dots span");

  if (dots.length > 0) {
    dots[0].classList.add("active");
  }

  function moveSlide(i) {
    index = i;
    slides.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach(d => d.classList.remove("active"));
    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }

  // Make functions global so buttons can access them
  window.nextSlide = function () {
    index = (index + 1) % items.length;
    moveSlide(index);
  };

  window.prevSlide = function () {
    index = (index - 1 + items.length) % items.length;
    moveSlide(index);
  };

});
