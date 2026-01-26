const phone = "919949770998";
const email = "goparajumanasa24@gmail.com";
const locationText = "Jubilee Hills, Hyderabad";

// WHATSAPP
document.getElementById("waBtn").href =
  `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hi, I'm interested in this property. Please share details."
  )}`;

// CALL
document.getElementById("callBtn").href = `tel:${phone}`;

// EMAIL
document.getElementById("mailBtn").href =
  `mailto:${email}?subject=Property Inquiry&body=I am interested in this property.`;

// MAP
document.getElementById("mapBtn").href =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`;

// SLIDER DOTS

const slides = document.querySelector(".slides");
const items = document.querySelectorAll(".slides img, .slides video");
const dotsContainer = document.querySelector(".dots");

let index = 0;

// create dots
items.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.onclick = () => moveSlide(i);
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dots span");

function moveSlide(i) {
  index = i;
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");
}

dots[0].classList.add("active");
