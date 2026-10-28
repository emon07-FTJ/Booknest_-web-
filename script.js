
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


// 1.1 AUTH STATE & NAVBAR UI
async function updateAuthUI() {
  const navActions = document.querySelector(".nav-actions");
  if (!navActions) return;

  try {
    if (!window.supabaseClient) return;

    const { data: { session } } = await window.supabaseClient.auth.getSession();
    const user = session?.user;

    if (user) {
      // Logged-in user: replace Login/Join Us with Profile + Logout.
      // Submit Writing & My Submissions stay in static HTML — not added here again.
      const username = user.user_metadata?.username || user.email?.split("@")[0] || "Profile";
      const isAdmin = (typeof window.isAdminUser === "function" && window.isAdminUser(user)) ||
                      (user.email && (user.email.toLowerCase() === "admin@booknest.com" || user.email.toLowerCase() === "admin@gmail.com"));

      // Remove Login & Join Us buttons (only change for regular users)
      navActions.querySelectorAll("a[href='login.html'], a[href='signup.html']").forEach(el => el.remove());

      // Add Admin Panel button only for admin (insert before first btn-outline or at end)
      if (isAdmin && !navActions.querySelector(".admin-panel-btn")) {
        const adminBtn = document.createElement("a");
        adminBtn.className = "submit-writing-link admin-panel-btn";
        adminBtn.href = "author-submission/admin-review.html";
        adminBtn.title = "Moderate Author Submissions";
        adminBtn.style.cssText = "background:#a32222;border:1.5px solid #feb2b2;box-shadow:0 4px 12px rgba(163,34,34,0.35);";
        adminBtn.textContent = "👑 Admin Panel";
        navActions.appendChild(adminBtn);
      }

      // Add Profile link if not already present
      if (!navActions.querySelector(".profile-link")) {
        const profileLink = document.createElement("a");
        profileLink.href = "profile.html";
        profileLink.className = "btn btn-outline profile-link";
        profileLink.title = "View Profile";
        profileLink.textContent = "👤 " + username;
        navActions.appendChild(profileLink);
      }

      // Add Logout button if not already present
      if (!navActions.querySelector("#logoutBtn")) {
        const logoutBtn = document.createElement("button");
        logoutBtn.type = "button";
        logoutBtn.id = "logoutBtn";
        logoutBtn.className = "btn btn-primary";
        logoutBtn.style.cursor = "pointer";
        logoutBtn.textContent = "Logout";
        logoutBtn.addEventListener("click", async () => {
          await window.supabaseClient.auth.signOut();
          window.location.reload();
        });
        navActions.appendChild(logoutBtn);
      }
    }
  } catch (error) {
    console.error("Auth check failed:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateAuthUI);
} else {
  updateAuthUI();
}

if (window.supabaseClient && window.supabaseClient.auth) {
  window.supabaseClient.auth.onAuthStateChange(() => {
    updateAuthUI();
  });
}


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
  button.addEventListener("click", async () => {
    const card = button.closest(".book-card");
    const title = card.dataset.title;

    if (favourites.includes(title)) {
      favourites = favourites.filter(item => item !== title);
    } else {
      favourites.push(title);
    }

    saveFavourites();
    updateHeartButtons();

    try {
      if (window.supabaseClient) {
        const { data: { user } } = await window.supabaseClient.auth.getUser();
        if (user) {
          const map = {
            "the alchemist": "alchemist",
            "atomic habits": "atomic-habits",
            "pride and prejudice": "pride-and-prejudice",
            "long walk to freedom": "long-walk-to-freedom",
            "and then there were none": "and-then-there-were-none"
          };
          const bookId = map[title];
          if (bookId) {
            if (favourites.includes(title)) {
              await window.supabaseClient.from("wishlist").insert({ user_id: user.id, book_id: bookId });
            } else {
              await window.supabaseClient.from("wishlist").delete().eq("user_id", user.id).eq("book_id", bookId);
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
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
const modalReadBtn = document.getElementById("modalReadBtn");

const bookIdMap = {
  "the alchemist": "alchemist",
  "atomic habits": "atomic-habits",
  "pride and prejudice": "pride-and-prejudice",
  "long walk to freedom": "long-walk-to-freedom",
  "and then there were none": "and-then-there-were-none",
  "the secret garden": "secret-garden"
};

// Event delegation handles both static & dynamically rendered books
document.addEventListener("click", event => {
  const button = event.target.closest(".details-btn");
  if (!button || !bookModal) return;

  const title = button.dataset.title || "Book Title";
  const author = button.dataset.author || "Unknown";
  const description = button.dataset.description || "No description provided.";
  const rawId = button.dataset.id;

  modalTitle.textContent = title;
  modalAuthor.textContent = "By " + author;
  modalDescription.textContent = description;

  const normalized = title.trim().toLowerCase();
  const bookId = rawId || bookIdMap[normalized] || normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "alchemist";

  if (modalReadBtn) {
    modalReadBtn.href = `reader/reader.html?id=${encodeURIComponent(bookId)}`;
  }

  bookModal.showModal();
});

if (modalClose) {
  modalClose.addEventListener("click", () => {
    bookModal.close();
  });
}

if (modalDone) {
  modalDone.addEventListener("click", () => {
    bookModal.close();
  });
}

if (bookModal) {
  bookModal.addEventListener("click", event => {
    if (event.target === bookModal) {
      bookModal.close();
    }
  });
}


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