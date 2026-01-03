document.querySelectorAll(".property-card").forEach(card => {
  card.addEventListener("click", () => {
    const id = card.dataset.id;
    window.location.href = `property.html?id=${id}`;
  });
});
