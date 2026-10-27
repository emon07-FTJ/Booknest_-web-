/* ==========================================
   BOOKNEST+ | HOME PAGE JAVASCRIPT
========================================== */

// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const loginNavButton = document.getElementById("loginNavButton");

function updateLoggedInState() {
  if (!loginNavButton) return;

  try {
    const user = JSON.parse(localStorage.getItem("booknestUser") || "null");

    if (user && user.name) {
      const firstName = user.name.trim().split(" ")[0];
      loginNavButton.textContent = `Hi, ${firstName}`;
      loginNavButton.setAttribute("title", `Logged in as ${user.name}`);
      loginNavButton.href = "profile.html";
      return;
    }
  } catch (error) {
    console.error("Failed to read user session:", error);
  }

  loginNavButton.textContent = "Login";
  loginNavButton.href = "login.html";
}

updateLoggedInState();

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


// 4. FAVOURITES AND READING TRACKER
// Reading status, favourites, and reviews are stored in this browser.

const STORAGE_KEY = "booknest-home-favourites";
const READING_KEY = "booknest-reading-books";
const COMPLETED_KEY = "booknest-completed-books";
const REVIEWS_KEY = "booknest-book-reviews";

const BOOK_DETAILS = {
  "the alchemist": {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A young shepherd travels in search of a treasure and discovers lessons about dreams, courage, and the journey itself."
  },
  "atomic habits": {
    title: "Atomic Habits",
    author: "James Clear",
    description: "A practical guide to understanding small habits and building better routines through consistent daily improvements."
  },
  "pride and prejudice": {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A classic novel exploring love, family, first impressions, and social expectations in nineteenth-century England."
  },
  "long walk to freedom": {
    title: "Long Walk to Freedom",
    author: "Nelson Mandela",
    description: "Nelson Mandela's autobiography recounts his life, struggle against apartheid, and journey toward freedom and equality."
  },
  "and then there were none": {
    title: "And Then There Were None",
    author: "Agatha Christie",
    description: "Ten strangers gather on an isolated island, where a mysterious sequence of events creates a tense detective mystery."
  }
};

function normalizeTitle(title) {
  return String(title || "").trim().toLowerCase();
}

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

function readBookList(storageKey) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(saved) ? saved.filter(title => typeof title === "string") : [];
  } catch (error) {
    console.error(`Failed to read ${storageKey}:`, error);
    return [];
  }
}

function readBookReviews() {
  try {
    const saved = JSON.parse(localStorage.getItem(REVIEWS_KEY) || "{}");
    return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  } catch (error) {
    console.error("Failed to read book reviews:", error);
    return {};
  }
}

function saveBookTracking(storageKey, titles) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(titles));
    return true;
  } catch (error) {
    console.error(`Failed to save ${storageKey}:`, error);
    trackingMessage.textContent = "We couldn't save this change. Please try again.";
    return false;
  }
}

function formatTitle(title) {
  return title
    .split(" ")
    .filter(Boolean)
    .map(word => {
      if (word.length <= 2) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function getBookInfo(title) {
  const key = normalizeTitle(title);
  const matchedBook = BOOK_DETAILS[key];

  if (matchedBook) {
    return matchedBook;
  }

  return {
    title: formatTitle(title),
    author: "Unknown Author",
    description: "This title is on your wishlist. Open the full details to learn more about it."
  };
}

function openBookDetails(title) {
  const info = getBookInfo(title);

  modalTitle.textContent = info.title;
  modalAuthor.textContent = "By " + info.author;
  modalDescription.textContent = info.description;
  updateTrackingActions(info.title);
  bookModal.showModal();
}

function renderWishlist() {
  const list = document.getElementById("wishlistList");
  const emptyMessage = document.getElementById("wishlistEmpty");
  const searchInput = document.getElementById("wishlistSearch");

  if (!list || !emptyMessage) {
    return;
  }

  const savedTitles = getFavourites();
  const searchTerm = normalizeTitle(searchInput ? searchInput.value : "");
  const visibleTitles = savedTitles.filter(title =>
    normalizeTitle(title).includes(searchTerm)
  );

  list.innerHTML = "";

  if (!savedTitles.length) {
    emptyMessage.hidden = false;
    return;
  }

  if (!visibleTitles.length) {
    emptyMessage.hidden = false;
    emptyMessage.textContent = "No matching books in your wishlist.";
    return;
  }

  emptyMessage.hidden = true;
  emptyMessage.textContent = "Your wishlist is empty. Tap the heart on any book to save it here.";

  visibleTitles.forEach(title => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "wishlist-item-home";
    item.textContent = formatTitle(title);
    item.addEventListener("click", () => openBookDetails(title));
    list.appendChild(item);
  });
}

function updateHeartButtons() {
  document.querySelectorAll(".heart-btn").forEach(button => {
    const card = button.closest(".book-card");
    const title = card.dataset.title;
    const isFavourite = favourites.includes(title);

    button.textContent = isFavourite ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(isFavourite));
  });

  renderWishlist();
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

    window.addEventListener("storage", event => {
      if ([STORAGE_KEY, READING_KEY, COMPLETED_KEY, REVIEWS_KEY].includes(event.key)) {
        favourites = getFavourites();
        updateHeartButtons();
        if (bookModal.open) {
          updateTrackingActions(modalTitle.textContent);
        }
      }
    });
  });
});

const wishlistSearch = document.getElementById("wishlistSearch");
if (wishlistSearch) {
  wishlistSearch.addEventListener("input", renderWishlist);
}

updateHeartButtons();


// 5. BOOK DETAILS MODAL

const bookModal = document.getElementById("bookModal");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");
const modalDone = document.getElementById("modalDone");
const modalReadBook = document.getElementById("modalReadBook");
const modalStartReading = document.getElementById("modalStartReading");
const modalMarkCompleted = document.getElementById("modalMarkCompleted");
const trackingMessage = document.getElementById("trackingMessage");
const bookReviewForm = document.getElementById("bookReviewForm");

function updateTrackingActions(title) {
  const normalizedTitle = normalizeTitle(title);
  const readingBooks = readBookList(READING_KEY);
  const completedBooks = readBookList(COMPLETED_KEY);
  const reviews = readBookReviews();
  const isReading = readingBooks.some(item => normalizeTitle(item) === normalizedTitle);
  const isCompleted = completedBooks.some(item => normalizeTitle(item) === normalizedTitle);
  const review = reviews[normalizedTitle];

  modalStartReading.textContent = isReading ? "Currently reading ✓" : "Start reading";
  modalStartReading.setAttribute("aria-pressed", String(isReading));
  modalMarkCompleted.textContent = isCompleted ? "Completed ✓" : "Mark completed";
  modalMarkCompleted.setAttribute("aria-pressed", String(isCompleted));
  document.getElementById("reviewRating").value = String(review?.rating || 5);
  document.getElementById("reviewText").value = review?.text || "";
  trackingMessage.textContent = review
    ? "You have already reviewed this book. Save to update your review."
    : "";
}

function setBookStatus(title, status) {
  const normalizedTitle = normalizeTitle(title);
  const readingBooks = readBookList(READING_KEY)
    .filter(item => normalizeTitle(item) !== normalizedTitle);
  const completedBooks = readBookList(COMPLETED_KEY)
    .filter(item => normalizeTitle(item) !== normalizedTitle);

  if (status === "reading") {
    readingBooks.push(title);
  } else {
    completedBooks.push(title);
  }

  if (!saveBookTracking(READING_KEY, readingBooks)) return;
  if (!saveBookTracking(COMPLETED_KEY, completedBooks)) return;
  updateTrackingActions(title);
  trackingMessage.textContent = status === "reading"
    ? `${title} added to Currently reading.`
    : `${title} marked as completed.`;
}

modalStartReading.addEventListener("click", () => {
  setBookStatus(modalTitle.textContent, "reading");
});

modalReadBook.addEventListener("click", () => {
  const title = modalTitle.textContent;
  setBookStatus(title, "reading");
  window.location.href = `reader.html?book=${encodeURIComponent(
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  )}`;
});

modalMarkCompleted.addEventListener("click", () => {
  setBookStatus(modalTitle.textContent, "completed");
});

bookReviewForm.addEventListener("submit", event => {
  event.preventDefault();
  const title = modalTitle.textContent;
  const normalizedTitle = normalizeTitle(title);
  const reviewText = document.getElementById("reviewText").value.trim();

  if (!reviewText) {
    trackingMessage.textContent = "Write a few words before saving your review.";
    document.getElementById("reviewText").focus();
    return;
  }

  const review = {
    title,
    author: modalAuthor.textContent.replace(/^By\s+/, ""),
    rating: Number(document.getElementById("reviewRating").value),
    text: reviewText,
    updatedAt: new Date().toISOString()
  };
  const reviews = readBookReviews();
  reviews[normalizedTitle] = review;

  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    trackingMessage.textContent = "Your review has been saved.";
  } catch (error) {
    console.error("Failed to save book review:", error);
    trackingMessage.textContent = "We couldn't save your review. Please try again.";
  }
});

document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.title;
    modalAuthor.textContent = "By " + button.dataset.author;
    modalDescription.textContent = button.dataset.description;
    updateTrackingActions(button.dataset.title);
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