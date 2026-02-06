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

    document.querySelector(".details h1").textContent = property.title;
    document.querySelector(".location").textContent =
      "📍 " + property.location;
    document.querySelector(".price").textContent =
    "₹ " + property.pricePerSqft + " / sqft";
    document.querySelector(".map").href = property.map;

    document.querySelector(".desc").textContent = property.description;

    document.querySelector(".project-name").textContent =
      property.title.toUpperCase();
    document.querySelector(".sub").textContent =
      property.location.toUpperCase();

    document.querySelector(".area").textContent = property.area;
    document.querySelector(".facing").textContent = property.facing;
    document.querySelector(".floor").textContent = property.floor;
    document.querySelector(".pricePerSqft").textContent =
      property.pricePerSqft;

   

    const slides = document.querySelector(".slides");
    slides.innerHTML = "";

    property.media.forEach(item => {
      if (item.type === "img") {
        const img = document.createElement("img");
        img.src = item.url;
        slides.appendChild(img);
      } else {
        const video = document.createElement("video");
        video.controls = true;
        video.muted = true;

        const source = document.createElement("source");
        source.src = item.url;
        source.type = "video/mp4";

        video.appendChild(source);
        slides.appendChild(video);
      }
    });

  } catch (error) {
    console.error("Error loading property:", error);
  }
});
