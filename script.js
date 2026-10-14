
/* ==========================================
   BOOKNEST+ | HOME PAGE JAVASCRIPT
========================================== */

// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";

    document.querySelectorAll(".nav-link").forEach(item => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});


// 2. FEATURED BOOK SEARCH AND CATEGORY FILTER

const searchInput = document.getElementById("bookSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const bookCards = document.querySelectorAll(".book-card");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "All";

function filterBooks() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  bookCards.forEach(card => {
    const category = card.dataset.category;
    const title = card.dataset.title;
    const author = card.querySelector(".book-author")
      .textContent.toLowerCase();

    const matchesCategory =
      selectedCategory === "All" ||
      category === selectedCategory;

    const matchesSearch =
      title.includes(searchTerm) ||
      author.includes(searchTerm) ||
      category.toLowerCase().includes(searchTerm);

    const isVisible = matchesCategory && matchesSearch;

    card.hidden = !isVisible;

    if (isVisible) {
      visibleCount++;
    }
  });

  emptyMessage.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterBooks);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.filter;

    filterButtons.forEach(item => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");
    filterBooks();
  });
});


// 3. CATEGORY CARDS

document.querySelectorAll("[data-category-link]").forEach(link => {
  link.addEventListener("click", () => {
    selectedCategory = link.dataset.categoryLink;

    filterButtons.forEach(button => {
      button.classList.toggle(
        "selected",
        button.dataset.filter === selectedCategory
      );
    });

    filterBooks();
  });
});


// 4. FAVOURITES DEMO
// This uses localStorage in the current browser only.
// Member 4 can later connect this to the shared wishlist module.

const STORAGE_KEY = "booknest-home-favourites";

function getFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

let favourites = getFavourites();

function saveFavourites() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favourites)
    );
  } catch {
    // The page remains usable if browser storage is unavailable.
  }
}

function updateHeartButtons() {
  document.querySelectorAll(".heart-btn").forEach(button => {
    const card = button.closest(".book-card");
    const title = card.dataset.title;
    const isFavourite = favourites.includes(title);

    button.textContent = isFavourite ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(isFavourite));
  });
}

document.querySelectorAll(".heart-btn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".book-card");
    const title = card.dataset.title;

    if (favourites.includes(title)) {
      favourites = favourites.filter(item => item !== title);
    } else {
      favourites.push(title);
    }

    saveFavourites();
    updateHeartButtons();
  });
});

updateHeartButtons();


// 5. BOOK DETAILS MODAL

const bookModal = document.getElementById("bookModal");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");
const modalDone = document.getElementById("modalDone");

document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.title;
    modalAuthor.textContent = "By " + button.dataset.author;
    modalDescription.textContent = button.dataset.description;

    bookModal.showModal();
  });
});

modalClose.addEventListener("click", () => {
  bookModal.close();
});

modalDone.addEventListener("click", () => {
  bookModal.close();
});

bookModal.addEventListener("click", event => {
  if (event.target === bookModal) {
    bookModal.close();
  }
});


// 6. FOOTER CURRENT YEAR

document.getElementById("currentYear").textContent =
  new Date().getFullYear();
  /* 7. OPEN LIBRARY API SEARCH */

const openLibraryInput = document.getElementById("bookSearch");
const openLibraryResults = document.getElementById("apiBookResults");
const openLibraryStatus = document.getElementById("apiBookStatus");

let openLibraryTimer;

openLibraryInput.addEventListener("input", () => {
    clearTimeout(openLibraryTimer);

    const query = openLibraryInput.value.trim();

    openLibraryResults.replaceChildren();
    openLibraryStatus.textContent = "";

    if (!query) {
        return;
    }

    openLibraryStatus.textContent = "Searching books...";

    openLibraryTimer = setTimeout(async () => {
        try {
            const url =
                "https://openlibrary.org/search.json?q=" +
                encodeURIComponent(query) +
                "&limit=10";

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("API request failed");
            }

            const data = await response.json();
            const books = data.docs || [];

            openLibraryResults.replaceChildren();

            if (books.length === 0) {
                openLibraryStatus.textContent = "No books found.";
                return;
            }

            books.forEach((book) => {
                const card = document.createElement("div");
                card.className = "api-book-card";

                if (book.cover_i) {
                    const image = document.createElement("img");

                    image.src =
                        "https://covers.openlibrary.org/b/id/" +
                        book.cover_i +
                        "-M.jpg";

                    image.alt = (book.title || "Book") + " cover";
                    image.loading = "lazy";

                    card.appendChild(image);
                }

                const title = document.createElement("h3");
                title.textContent = book.title || "Untitled";

                const author = document.createElement("p");
                author.textContent =
                    "Author: " +
                    (book.author_name?.slice(0, 3).join(", ") ||
                        "Unknown");

                const link = document.createElement("a");
                link.textContent = "View Book Details";
                link.href = book.key
                    ? "https://openlibrary.org" + book.key
                    : "https://openlibrary.org";

                link.target = "_blank";
                link.rel = "noopener noreferrer";

                card.append(title, author, link);
                openLibraryResults.appendChild(card);
            });

            openLibraryStatus.textContent =
                "Found " + books.length + " book results.";

        } catch (error) {
            openLibraryStatus.textContent =
                "Could not load books. Please try again.";

            console.error("Open Library API error:", error);
        }
    }, 400);
});