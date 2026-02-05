document.addEventListener("DOMContentLoaded", function () {

  // PROPERTY DATABASE
  const properties = {
    1: {
      title: "ASBL Spire",
      location: "Kokapet, Hyderabad",
      price: "₹ 2.18 Cr",
      desc: "Premium luxury apartments by ASBL with world-class amenities, excellent connectivity and modern architecture.",
      area: "2180 Sq.ft",
      facing: "West (Corner Flat)",
      floor: "12th Floor",
      pricePerSqft: "₹10,000 / Sq.ft",
      map: "https://www.google.com/maps/search/ASBL+Spire+Kokapet",
      media: [
        { type: "img", src: "Assets/ASBL SPIRE/1.jpeg" },
        { type: "img", src: "Assets/ASBL SPIRE/2.jpeg" },
        { type: "video", src: "Assets/ASBL SPIRE/3.mp4" },
        { type: "img", src: "Assets/ASBL SPIRE/4.jpeg" },
        { type: "video", src: "Assets/ASBL SPIRE/5.mp4" },
        { type: "img", src: "Assets/ASBL SPIRE/6.jpeg" },
        { type: "img", src: "Assets/ASBL SPIRE/7.jpeg" },
        { type: "img", src: "Assets/ASBL SPIRE/8.jpeg" },
        { type: "img", src: "Assets/ASBL SPIRE/9.jpeg" },
        { type: "img", src: "Assets/ASBL SPIRE/10.jpeg" },
        { type: "img", src: "Assets/ASBL SPIRE/11.jpeg" },
        { type: "img", src: "Assets/ASBL SPIRE/12.jpeg" },
        { type: "img", src: "Assets/ASBL SPIRE/13.jpeg" }
      ]
    },

    2: {
      title: "CLNQ",
      location: "Financial District, Hyderabad",
      price: "₹ 1.95 Cr",
      desc: "Luxury apartments in Financial District with premium lifestyle features.",
      area: "2000 Sq.ft",
      facing: "East Facing",
      floor: "10th Floor",
      pricePerSqft: "₹11,030/- per sqft",
      map: "https://www.google.com/maps/search/Financial+District+Hyderabad",
      media: [
        { type: "img", src: "Assets/Clnq/1.jpg" },
        { type: "img", src: "Assets/Clnq/2.jpg" },
        { type: "video", src: "Assets/Clnq/3.mp4" },
        { type: "img", src: "Assets/Clnq/4.mp4" },
        { type: "img", src: "Assets/Clnq/5.jpg" },
        { type: "img", src: "Assets/Clnq/6.mp4" },
        { type: "img", src: "Assets/Clnq/7.mp4" },
        { type: "img", src: "Assets/Clnq/8.mp4" },
      ]
    }
  };

  // GET ID FROM URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || 1;

  const property = properties[id];

  // SET TEXT CONTENT
  document.querySelector(".details h1").textContent = property.title;
  document.querySelector(".location").textContent = "📍 " + property.location;
  document.querySelector(".price").textContent = property.price;
  document.querySelector(".desc").textContent = property.desc;

  document.querySelector(".project-name").textContent = property.title.toUpperCase();
  document.querySelector(".sub").textContent = property.location.toUpperCase();

  document.querySelector(".area").textContent = property.area;
  document.querySelector(".facing").textContent = property.facing;
  document.querySelector(".floor").textContent = property.floor;
  document.querySelector(".pricePerSqft").textContent = property.pricePerSqft;

  document.querySelector(".map").href = property.map;

  // LOAD MEDIA
  const slides = document.querySelector(".slides");
  slides.innerHTML = "";

  property.media.forEach(item => {
    if (item.type === "img") {
      const img = document.createElement("img");
      img.src = item.src;
      slides.appendChild(img);
    } else if (item.type === "video") {
      const video = document.createElement("video");
      video.controls = true;
      video.muted = true;

      const source = document.createElement("source");
      source.src = item.src;
      source.type = "video/mp4";

      video.appendChild(source);
      slides.appendChild(video);
    }
  });

  // SLIDER FUNCTIONALITY
  const items = document.querySelectorAll(".slides img, .slides video");
  const dotsContainer = document.querySelector(".dots");

  let index = 0;

  items.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => moveSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dots span");
  if (dots.length > 0) dots[0].classList.add("active");

  function moveSlide(i) {
    index = i;
    slides.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach(d => d.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  window.nextSlide = function () {
    index = (index + 1) % items.length;
    moveSlide(index);
  };

  window.prevSlide = function () {
    index = (index - 1 + items.length) % items.length;
    moveSlide(index);
  };

});
