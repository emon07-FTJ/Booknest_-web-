
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("bookSearch");
  const categorySelect = document.getElementById("categorySelect");
  const categoryButtons = document.querySelectorAll(".category-card");
  const bookCards = document.querySelectorAll(".book-card");
  const emptyMessage = document.getElementById("emptyMessage");

  let activeCategory = "All";

  function filterBooks() {
    const searchText = (searchInput?.value || "").trim().toLowerCase();
    const selectedCategory = categorySelect?.value || activeCategory;
    let visibleCount = 0;

    bookCards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const author = card.dataset.author.toLowerCase();
      const category = card.dataset.category;

      const matchesSearch =
        title.includes(searchText) ||
        author.includes(searchText) ||
        category.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "All" || category === selectedCategory;

      const visible = matchesSearch && matchesCategory;
      card.hidden = !visible;

      if (visible) visibleCount++;
    });

    if (emptyMessage) {
      emptyMessage.hidden = visibleCount !== 0;
    }
  }

  searchInput?.addEventListener("input", filterBooks);
  categorySelect?.addEventListener("change", () => {
    activeCategory = categorySelect.value;
    categoryButtons.forEach(button => {
      button.classList.toggle(
        "selected",
        button.dataset.category === activeCategory
      );
    });
    filterBooks();
  });

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      if (categorySelect) categorySelect.value = activeCategory;

      categoryButtons.forEach(item => {
        item.classList.toggle("selected", item === button);
      });

      filterBooks();
      document.getElementById("featured")?.scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  filterBooks();
});
