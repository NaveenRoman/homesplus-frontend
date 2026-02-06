document.addEventListener("DOMContentLoaded", async function () {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  try {
    const res = await fetch(
      `https://homesplus-backend1-1.onrender.com/api/properties/${id}`
    );

    const property = await res.json();
    if (!property) return;

    /* ===============================
       TEXT DATA
    ================================ */

    document.querySelector(".details h1").textContent = property.title || "";
    document.querySelector(".location").textContent =
      "📍 " + (property.location || "");

    document.querySelector(".price").textContent =
      property.pricePerSqft || "";

    document.querySelector(".map").href = property.map || "#";
    document.querySelector(".desc").textContent = property.description || "";

    document.querySelector(".project-name").textContent =
      (property.title || "").toUpperCase();

    document.querySelector(".sub").textContent =
      (property.location || "").toUpperCase();

    document.querySelector(".area").textContent = property.area || "";
    document.querySelector(".facing").textContent = property.facing || "";
    document.querySelector(".floor").textContent = property.floor || "";
    document.querySelector(".pricePerSqft").textContent =
      property.pricePerSqft || "";

    /* ===============================
       SLIDER SECTION
    ================================ */

    const slides = document.querySelector(".slides");
    slides.innerHTML = "";

    /* 1️⃣ Add Cover Image First */
    if (property.coverImage) {
      const coverImg = document.createElement("img");
      coverImg.src = property.coverImage;
      slides.appendChild(coverImg);
    }

    /* 2️⃣ Add Other Media */
    if (property.media && property.media.length > 0) {
      property.media.forEach(item => {
        if (item.type === "img") {
          const img = document.createElement("img");
          img.src = item.url;
          slides.appendChild(img);
        } else {
          const video = document.createElement("video");
          video.controls = true;
          video.muted = true;
          video.src = item.url;
          slides.appendChild(video);
        }
      });
    }

    /* ===============================
       SIMPLE SLIDER LOGIC
    ================================ */

    let currentIndex = 0;
    const allSlides = slides.querySelectorAll("img, video");

    function showSlide(index) {
      if (!allSlides.length) return;

      currentIndex = (index + allSlides.length) % allSlides.length;
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    /* Make global for buttons */
    window.nextSlide = function () {
      showSlide(currentIndex + 1);
    };

    window.prevSlide = function () {
      showSlide(currentIndex - 1);
    };

  } catch (error) {
    console.error("Error loading property:", error);
  }
});
