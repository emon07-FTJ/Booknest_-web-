const defaultBio = "Reader of mystery and slow, thoughtful fiction. Always one chapter away from bedtime.";
let currentUser = null;
let profileData = {};
let authUser = null;
let fullName = "Reader";
let email = "user@booknest.com";

const defaultProfile = {
  username: "reader",
  phone: "",
  location: "Dhaka, Bangladesh",
  genre: "Mystery",
  bio: defaultBio,
  readingGoal: 20
};
const BOOK_FAVOURITES_KEY = "booknest-home-favourites";
const READING_BOOKS_KEY = "booknest-reading-books";
const COMPLETED_BOOKS_KEY = "booknest-completed-books";
const BOOK_REVIEWS_KEY = "booknest-book-reviews";
const BOOK_CATALOG = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Adventure",
    year: 1988,
    description: "A young shepherd travels in search of a treasure and discovers lessons about dreams, courage, and the journey itself."
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Education",
    year: 2018,
    description: "A practical guide to understanding small habits and building better routines through consistent daily improvements."
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    year: 1813,
    description: "A classic novel exploring love, family, first impressions, and social expectations in nineteenth-century England."
  },
  {
    title: "Long Walk to Freedom",
    author: "Nelson Mandela",
    category: "Biography",
    year: 1994,
    description: "Nelson Mandela's autobiography recounts his life, struggle against apartheid, and journey toward freedom and equality."
  },
  {
    title: "And Then There Were None",
    author: "Agatha Christie",
    category: "Mystery",
    year: 1939,
    description: "Ten strangers gather on an isolated island, where a mysterious sequence of events creates a tense detective mystery."
  },
  {
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    category: "Fiction",
    year: 1911,
    description: "A classic story about Mary Lennox, who discovers a hidden garden and finds friendship and personal growth as she brings it back to life."
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    category: "Fantasy",
    year: 1997,
    description: "A young wizard discovers a new world of magic."
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    year: 1988,
    description: "An introduction to questions about the universe."
  },
  {
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    category: "History",
    year: 1947,
    description: "A historical diary written during World War II."
  },
  {
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    category: "Fantasy",
    year: 1937,
    description: "A fantasy adventure about a hobbit and a journey."
  }
];

function renderProfile() {
  const firstName = fullName.split(/\s+/)[0] || "Reader";
  const profile = { ...defaultProfile, ...(profileData || {}) };

  document.querySelectorAll("[data-profile-name]").forEach((element) => {
    element.textContent = fullName;
  });
  document.querySelectorAll("[data-profile-email]").forEach((element) => {
    element.textContent = email;
  });
  document.querySelectorAll("[data-first-name]").forEach((element) => {
    element.textContent = firstName;
  });
  document.querySelectorAll("[data-initial]").forEach((element) => {
    element.textContent = Array.from(firstName)[0].toUpperCase();
  });
  document.querySelectorAll("[data-profile-bio]").forEach((element) => {
    element.textContent = profile.bio || defaultBio;
  });
  document.querySelectorAll("[data-profile-location]").forEach((element) => {
    element.textContent = profile.location || defaultProfile.location;
  });
  document.querySelectorAll("[data-profile-genre]").forEach((element) => {
    element.textContent = profile.genre || defaultProfile.genre;
  });
  const goalValue = profile.reading_goal || profile.readingGoal || defaultProfile.readingGoal;
  document.querySelectorAll("[data-reading-goal]").forEach((element) => {
    element.textContent = goalValue;
  });
  const completedCount = getStoredTitles(COMPLETED_BOOKS_KEY).length;
  const goalCompletedEl = document.querySelector("[data-goal-completed]");
  if (goalCompletedEl) goalCompletedEl.textContent = String(completedCount);
  const goalProgress = document.querySelector(".goal-track");
  if (goalProgress) {
    goalProgress.setAttribute("aria-valuemax", String(goalValue));
    goalProgress.setAttribute("aria-valuenow", String(Math.min(completedCount, goalValue)));
    const goalSpan = goalProgress.querySelector("span");
    if (goalSpan) {
      goalSpan.style.width = `${Math.min(100, (completedCount / goalValue) * 100)}%`;
    }
  }

  const nameInput = document.getElementById("profileNameInput");
  if (nameInput) nameInput.value = fullName;
  const emailInput = document.getElementById("profileEmailInput");
  if (emailInput) emailInput.value = email;
  const usernameInput = document.getElementById("profileUsernameInput");
  if (usernameInput) usernameInput.value = profile.username || firstName.toLowerCase();
  const phoneInput = document.getElementById("profilePhoneInput");
  if (phoneInput) phoneInput.value = profile.phone || "";
  const locationInput = document.getElementById("profileLocationInput");
  if (locationInput) locationInput.value = profile.location || defaultProfile.location;
  const genreInput = document.getElementById("profileGenreInput");
  if (genreInput) genreInput.value = profile.genre || defaultProfile.genre;
  const bioInput = document.getElementById("profileBioInput");
  if (bioInput) bioInput.value = profile.bio || defaultBio;
  const goalInput = document.getElementById("readingGoalInput");
  if (goalInput) goalInput.value = goalValue;
  const currentPasswordInput = document.getElementById("currentPasswordInput");
  if (currentPasswordInput) currentPasswordInput.value = "";
  const newPasswordInput = document.getElementById("newPasswordInput");
  if (newPasswordInput) newPasswordInput.value = "";
}

async function initProfile() {
  try {
    const { data: { user }, error } = await window.supabaseClient.auth.getUser();
    if (error || !user) {
      window.location.href = "login.html";
      return;
    }
    authUser = user;
    email = user.email || email;

    const { data, error: profileError } = await window.supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(profileError);
    }

    if (data) {
      profileData = data;
      fullName = data.full_name || data.username || (user.user_metadata && user.user_metadata.username) || fullName;
    } else {
      fullName = (user.user_metadata && user.user_metadata.username) || fullName;
      profileData = { ...defaultProfile, username: fullName.toLowerCase() };
    }

    renderProfile();
    initProfileForm();
  } catch (err) {
    console.error(err);
    window.location.href = "login.html";
  }
}

function initProfileForm() {
  const profileForm = document.getElementById("profileForm");
  if (!profileForm) return;

  profileForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const profileMessage = document.getElementById("profileMessage");
    if (!authUser) {
      window.location.href = "login.html";
      return;
    }

    const nameInput = document.getElementById("profileNameInput");
    const usernameInput = document.getElementById("profileUsernameInput");
    const phoneInput = document.getElementById("profilePhoneInput");
    const locationInput = document.getElementById("profileLocationInput");
    const genreInput = document.getElementById("profileGenreInput");
    const bioInput = document.getElementById("profileBioInput");
    const goalInput = document.getElementById("readingGoalInput");

    fullName = nameInput ? nameInput.value.trim() : fullName;
    profileData.full_name = fullName;
    profileData.username = usernameInput ? usernameInput.value.trim() : profileData.username;
    profileData.phone = phoneInput ? phoneInput.value.trim() : "";
    profileData.location = locationInput ? locationInput.value.trim() : "";
    profileData.genre = genreInput ? genreInput.value : "";
    profileData.bio = bioInput ? bioInput.value.trim() : "";
    profileData.reading_goal = goalInput ? parseInt(goalInput.value) || 20 : 20;

    if (profileMessage) {
      profileMessage.textContent = "Saving...";
      profileMessage.classList.remove("error", "success");
    }

    try {
      const { error } = await window.supabaseClient
        .from("profiles")
        .upsert({
          id: authUser.id,
          user_id: authUser.id,
          email: authUser.email,
          full_name: profileData.full_name,
          username: profileData.username,
          phone: profileData.phone,
          location: profileData.location,
          genre: profileData.genre,
          bio: profileData.bio,
          reading_goal: profileData.reading_goal,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (error) {
        console.error(error);
        if (profileMessage) {
          profileMessage.textContent = error.message || "Failed to save profile.";
          profileMessage.classList.add("error");
        }
        return;
      }

      if (profileMessage) {
        profileMessage.textContent = "Profile updated successfully!";
        profileMessage.classList.add("success");
      }
      renderProfile();
    } catch (err) {
      console.error(err);
      if (profileMessage) {
        profileMessage.textContent = "Something went wrong.";
        profileMessage.classList.add("error");
      }
    }
  });
}

initProfile();

function getSavedBookFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(BOOK_FAVOURITES_KEY) || "[]");
    return Array.isArray(saved)
      ? saved.filter((title) => typeof title === "string").map((title) => title.trim().toLowerCase())
      : [];
  } catch (error) {
    console.error("Failed to read book favourites:", error);
    return [];
  }
}

function getStoredTitles(storageKey) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(saved)
      ? [...new Map(
        saved
          .filter((title) => typeof title === "string")
          .map((title) => [normalizeBookTitle(title), title.trim()])
      ).values()]
      : [];
  } catch (error) {
    console.error(`Failed to read ${storageKey}:`, error);
    return [];
  }
}

function getStoredReviews() {
  try {
    const saved = JSON.parse(localStorage.getItem(BOOK_REVIEWS_KEY) || "{}");
    return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  } catch (error) {
    console.error("Failed to read book reviews:", error);
    return {};
  }
}

function normalizeBookTitle(title) {
  return String(title || "").trim().toLowerCase();
}

function showBookTrackingMessage(text, isError = false) {
  const message = document.getElementById("profileBookMessage");
  message.textContent = text;
  message.classList.toggle("error", isError);
  message.classList.toggle("success", !isError && Boolean(text));
}

function createBookCard(book) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "favourite-book";
  card.setAttribute("aria-label", `View details for ${book.title}`);

  const cover = document.createElement("span");
  cover.className = `book-cover cover-${book.category.toLowerCase().replace(/\s+/g, "-")}`;
  cover.setAttribute("aria-hidden", "true");
  cover.textContent = book.title;

  const title = document.createElement("span");
  title.className = "favourite-title";
  title.textContent = book.title;

  const author = document.createElement("span");
  author.className = "favourite-author";
  author.textContent = book.author;

  card.append(cover, title, author);
  card.addEventListener("click", () => openBookDetails(book));
  return card;
}

function renderBookLists() {
  const savedFavourites = getSavedBookFavourites();
  const readingTitles = getStoredTitles(READING_BOOKS_KEY);
  const completedTitles = getStoredTitles(COMPLETED_BOOKS_KEY);
  const reviews = getStoredReviews();
  const savedFavouriteSet = new Set(savedFavourites);
  const favouriteBooks = BOOK_CATALOG.filter((book) =>
    savedFavouriteSet.has(book.title.toLowerCase())
  );
  const recentBooks = favouriteBooks.slice().reverse();

  document.querySelector("[data-favourite-count]").textContent =
    String(favouriteBooks.length);
  const readingBooks = BOOK_CATALOG.filter((book) =>
    readingTitles.some((title) => normalizeBookTitle(title) === normalizeBookTitle(book.title))
  );
  const completedBooks = BOOK_CATALOG.filter((book) =>
    completedTitles.some((title) => normalizeBookTitle(title) === normalizeBookTitle(book.title))
  );
  const reviewedBooks = BOOK_CATALOG.filter((book) =>
    Boolean(reviews[normalizeBookTitle(book.title)])
  );

  document.querySelector("[data-reading-count]").textContent = String(readingBooks.length);
  document.querySelector("[data-completed-count]").textContent = String(completedBooks.length);
  document.querySelector("[data-review-count]").textContent = String(reviewedBooks.length);
  const readingGoal = Number(document.querySelector("[data-reading-goal]").textContent);
  document.querySelector("[data-goal-completed]").textContent = String(completedBooks.length);
  const goalProgress = document.querySelector(".goal-track");
  goalProgress.setAttribute("aria-valuenow", String(Math.min(completedBooks.length, readingGoal)));
  goalProgress.querySelector("span").style.width =
    `${Math.min(100, (completedBooks.length / readingGoal) * 100)}%`;

  [
    { name: "recent", books: recentBooks },
    { name: "favourites", books: favouriteBooks },
    { name: "reading", books: readingBooks },
    { name: "reading-overview", books: readingBooks.slice(0, 4) },
    { name: "completed", books: completedBooks }
  ].forEach(({ name, books }) => {
    const list = document.querySelector(`[data-book-list="${name}"]`);
    const emptyMessage = document.querySelector(`[data-book-empty="${name}"]`);
    list.replaceChildren(...books.map(createBookCard));
    emptyMessage.hidden = books.length > 0;
  });

  const reviewList = document.querySelector("[data-review-list]");
  reviewList.replaceChildren(...reviewedBooks.map((book) => {
    const review = reviews[normalizeBookTitle(book.title)];
    const card = document.createElement("article");
    card.className = "review-card";

    const heading = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = book.title;
    const rating = document.createElement("span");
    rating.className = "review-rating";
    rating.setAttribute("aria-label", `${review.rating} out of 5 stars`);
    rating.textContent = `${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}`;
    heading.append(title, rating);

    const text = document.createElement("p");
    text.textContent = review.text;
    const author = document.createElement("small");
    author.textContent = `By ${book.author}`;
    card.append(heading, text, author);
    return card;
  }));
  document.querySelector("[data-review-empty]").hidden = reviewedBooks.length > 0;
}

const bookDetailModal = document.getElementById("profileBookModal");
let selectedBook = null;

function updateBookModalActions() {
  if (!selectedBook) return;

  const title = normalizeBookTitle(selectedBook.title);
  const isReading = getStoredTitles(READING_BOOKS_KEY)
    .some((item) => normalizeBookTitle(item) === title);
  const isCompleted = getStoredTitles(COMPLETED_BOOKS_KEY)
    .some((item) => normalizeBookTitle(item) === title);
  const review = getStoredReviews()[title];
  document.querySelector('[data-book-action="reading"]').textContent =
    isReading ? "Currently reading ✓" : "Start reading";
  document.querySelector('[data-book-action="completed"]').textContent =
    isCompleted ? "Completed ✓" : "Mark completed";
  document.getElementById("profileReviewRating").value = String(review?.rating || 5);
  document.getElementById("profileReviewText").value = review?.text || "";
}

function openBookDetails(book) {
  selectedBook = book;
  document.getElementById("profileBookCategory").textContent = book.category;
  document.getElementById("profileBookTitle").textContent = book.title;
  document.getElementById("profileBookAuthor").textContent = `By ${book.author}`;
  document.getElementById("profileBookYear").textContent = `Publication year: ${book.year}`;
  document.getElementById("profileBookDescription").textContent = book.description;
  showBookTrackingMessage("");
  updateBookModalActions();
  bookDetailModal.showModal();
}

function setBookStatus(status) {
  if (!selectedBook) return;

  const title = selectedBook.title;
  const normalizedTitle = normalizeBookTitle(title);
  const readingTitles = getStoredTitles(READING_BOOKS_KEY)
    .filter((item) => normalizeBookTitle(item) !== normalizedTitle);
  const completedTitles = getStoredTitles(COMPLETED_BOOKS_KEY)
    .filter((item) => normalizeBookTitle(item) !== normalizedTitle);

  if (status === "reading") {
    readingTitles.push(title);
  } else {
    completedTitles.push(title);
  }

  try {
    localStorage.setItem(READING_BOOKS_KEY, JSON.stringify(readingTitles));
    localStorage.setItem(COMPLETED_BOOKS_KEY, JSON.stringify(completedTitles));
    renderBookLists();
    updateBookModalActions();
    showBookTrackingMessage(status === "reading"
      ? `${title} added to Currently reading.`
      : `${title} marked as completed.`);
  } catch (error) {
    console.error("Failed to update reading status:", error);
    showBookTrackingMessage("We couldn't save this change. Please try again.", true);
  }
}

document.querySelectorAll("[data-book-action]").forEach((button) => {
  button.addEventListener("click", () => setBookStatus(button.dataset.bookAction));
});

document.getElementById("profileReviewForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!selectedBook) return;

  const reviews = getStoredReviews();
  const title = normalizeBookTitle(selectedBook.title);
  const reviewText = document.getElementById("profileReviewText").value.trim();

  if (!reviewText) {
    showBookTrackingMessage("Write a few words before saving your review.", true);
    document.getElementById("profileReviewText").focus();
    return;
  }

  reviews[title] = {
    title: selectedBook.title,
    author: selectedBook.author,
    rating: Number(document.getElementById("profileReviewRating").value),
    text: reviewText,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(BOOK_REVIEWS_KEY, JSON.stringify(reviews));
    renderBookLists();
    showBookTrackingMessage("Your review has been saved.");
  } catch (error) {
    console.error("Failed to save book review:", error);
    showBookTrackingMessage("We couldn't save your review. Please try again.", true);
  }
});

document.querySelector(".book-modal-close").addEventListener("click", () => {
  bookDetailModal.close();
});

bookDetailModal.addEventListener("click", (event) => {
  if (event.target === bookDetailModal) {
    bookDetailModal.close();
  }
});

renderBookLists();

window.addEventListener("storage", (event) => {
  if ([BOOK_FAVOURITES_KEY, READING_BOOKS_KEY, COMPLETED_BOOKS_KEY, BOOK_REVIEWS_KEY].includes(event.key)) {
    renderBookLists();
  }
});

const profileTabs = Array.from(document.querySelectorAll("[data-profile-tab]"));
const profilePanels = Array.from(document.querySelectorAll("[data-profile-panel]"));
const currentPasswordInput = document.getElementById("currentPasswordInput");
const newPasswordInput = document.getElementById("newPasswordInput");

newPasswordInput.addEventListener("input", () => {
  currentPasswordInput.required = newPasswordInput.value.length > 0;
});

function activateProfileTab(tabName) {
  profileTabs.forEach((tab) => {
    const isActive = tab.dataset.profileTab === tabName;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  profilePanels.forEach((panel) => {
    panel.hidden = panel.dataset.profilePanel !== tabName;
  });
}

profileTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateProfileTab(tab.dataset.profileTab));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextTab = profileTabs[(index + direction + profileTabs.length) % profileTabs.length];
    activateProfileTab(nextTab.dataset.profileTab);
    nextTab.focus();
  });
});

document.querySelector("[data-open-settings]")?.addEventListener("click", () => {
  activateProfileTab("settings");
  document.getElementById("tab-settings").focus();
});

document.querySelector("[data-open-favourites]")?.addEventListener("click", () => {
  renderBookLists();
  activateProfileTab("favourites");
  document.getElementById("tab-favourites").focus();
});

document.getElementById("profileForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const message = document.getElementById("profileMessage");
  const newPassword = newPasswordInput.value;
  const currentPassword = currentPasswordInput.value;
  const updatedUser = {
    ...(currentUser || {}),
    name: document.getElementById("profileNameInput").value.trim(),
    email: document.getElementById("profileEmailInput").value.trim(),
    username: document.getElementById("profileUsernameInput").value.trim(),
    phone: document.getElementById("profilePhoneInput").value.trim(),
    location: document.getElementById("profileLocationInput").value.trim(),
    genre: document.getElementById("profileGenreInput").value,
    bio: document.getElementById("profileBioInput").value.trim(),
    readingGoal: Number(document.getElementById("readingGoalInput").value)
  };

  if (newPassword && !currentPassword) {
    message.textContent = "Enter your current password to change it.";
    message.classList.remove("success");
    message.classList.add("error");
    currentPasswordInput.focus();
    return;
  }

  if (newPassword && String(currentUser?.password || "") !== currentPassword) {
    message.textContent = "Your current password is incorrect.";
    message.classList.remove("success");
    message.classList.add("error");
    currentPasswordInput.focus();
    return;
  }

  if (newPassword) {
    updatedUser.password = newPassword;
  }

  try {
    const savedUsers = JSON.parse(localStorage.getItem("booknestUsers") || "[]");
    const users = Array.isArray(savedUsers) ? savedUsers : [];
    const oldEmail = currentUser && typeof currentUser.email === "string"
      ? currentUser.email.trim().toLowerCase()
      : "";
    const emailTaken = users.some((user) =>
      typeof user.email === "string" &&
      user.email.trim().toLowerCase() === updatedUser.email.toLowerCase() &&
      user.email.trim().toLowerCase() !== oldEmail
    );

    if (emailTaken) {
      message.textContent = "That email address is already used by another account.";
      message.classList.remove("success");
      message.classList.add("error");
      document.getElementById("profileEmailInput").focus();
      return;
    }

    const userIndex = users.findIndex((user) =>
      typeof user.email === "string" && user.email.trim().toLowerCase() === oldEmail
    );

    if (userIndex >= 0) {
      users[userIndex] = updatedUser;
    } else {
      users.push(updatedUser);
    }

    localStorage.setItem("booknestUsers", JSON.stringify(users));
    localStorage.setItem("booknestUser", JSON.stringify(updatedUser));

    currentUser = updatedUser;
    fullName = updatedUser.name;
    email = updatedUser.email;
    renderProfile();
    message.textContent = "Your profile has been updated.";
    message.classList.remove("error");
    message.classList.add("success");
  } catch (error) {
    console.error("Failed to save user profile:", error);
    message.textContent = "We couldn't save your profile. Please try again.";
    message.classList.remove("success");
    message.classList.add("error");
  }
});

document.getElementById("cancelProfileButton").addEventListener("click", () => {
  renderProfile();
  activateProfileTab("overview");
  const message = document.getElementById("profileMessage");
  message.textContent = "";
  message.classList.remove("success", "error");
});

document.getElementById("forgotPasswordButton").addEventListener("click", () => {
  const message = document.getElementById("profileMessage");
  message.textContent = "Password reset is not available in this demo. Please contact BookNest+ support.";
  message.classList.remove("success");
  message.classList.add("error");
});
