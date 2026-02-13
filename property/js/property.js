document.addEventListener("DOMContentLoaded", async () => {

const BACKEND_URL =
"https://homesplus-backend1-1.onrender.com";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if(!id) return;

try{

  const res = await fetch(
    `${BACKEND_URL}/api/properties/${id}`
  );

  const property = await res.json();
  if(!property) return;

  /* ===========================
     TEXT DATA (ONLY FORM FIELDS)
  ============================ */

  document.querySelector(".title").textContent =
    property.title || "";

  document.querySelector(".location").textContent =
    "📍 " + (property.location || "");

  document.querySelector(".price").textContent =
    "₹ " + (property.pricePerSqft || "");

  document.querySelector(".desc").textContent =
    property.description || "";

  document.querySelector(".project-name").textContent =
    property.title || "";

  document.querySelector(".area").textContent =
    property.area || "";

  document.querySelector(".facing").textContent =
    property.facing || "";

  document.querySelector(".floor").textContent =
    property.floor || "";

  document.querySelector(".pricePerSqft").textContent =
    property.pricePerSqft || "";


  /* ===========================
     SLIDER
  ============================ */

  const slides = document.querySelector(".slides");
  slides.innerHTML = "";

  // COVER IMAGE
  if(property.coverImage){
    const img = document.createElement("img");
    img.src = property.coverImage;
    slides.appendChild(img);
  }

  // MEDIA
  if(property.media && property.media.length){

    property.media.forEach(m => {

      if(m.type === "img"){
        const img = document.createElement("img");
        img.src = m.url;
        slides.appendChild(img);
      }else{
        const video = document.createElement("video");
        video.src = m.url;
        video.controls = true;
        video.muted = true;
        slides.appendChild(video);
      }

    });
  }

  /* ===========================
     SIMPLE SLIDER LOGIC
  ============================ */

  let current = 0;
  const items = slides.querySelectorAll("img,video");

  function showSlide(index){
    if(!items.length) return;

    current = (index + items.length) % items.length;
    slides.style.transform =
      `translateX(-${current * 100}%)`;
  }

  window.nextSlide = () => showSlide(current + 1);
  window.prevSlide = () => showSlide(current - 1);

}catch(err){
  console.error("Property load error", err);
}

});


async function addFavorite(){

  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("id");

  if(!propertyId) return;

  try{

    await fetch(
      "https://homesplus-backend1-1.onrender.com/api/favorites",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({ propertyId })
      }
    );

    alert("Added to favorites ❤️");

  }catch(err){
    console.error(err);
    alert("Failed to add favorite");
  }
}
