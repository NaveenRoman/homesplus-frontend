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
const slides = document.getElementById("slides");
const dotsContainer = document.getElementById("dots");
const images = slides.querySelectorAll("img");

images.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

slides.addEventListener("scroll", () => {
  const index = Math.round(slides.scrollLeft / slides.clientWidth);
  dotsContainer.querySelectorAll("span").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
});
