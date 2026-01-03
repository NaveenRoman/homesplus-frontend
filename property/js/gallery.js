const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".gallery-card");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const type = tab.dataset.type;

    cards.forEach(card => {
      card.style.display =
        type === "all" || card.dataset.type === type
          ? "block"
          : "none";
    });
  });
});

cards.forEach(card => {
  card.addEventListener("click", () => {
    const id = card.dataset.id;
    window.location.href = `property.html?id=${id}`;
  });
});
