/* ========================================================
   BOOKNEST+ | ALL BOOKS LIBRARY JAVASCRIPT
   ======================================================== */

// 1. COMPREHENSIVE CURATED LIBRARY COLLECTION
const DEFAULT_BOOKS = [
    {
        id: "alchemist",
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Adventure",
        year: 1988,
        rating: 4.8,
        badge: "Reader's Pick",
        cover_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
        description: "A young Andalusian shepherd journeys to Egypt in search of a hidden treasure, discovering life-changing wisdom about destiny, omens, and listening to our hearts."
    },
    {
        id: "atomic-habits",
        title: "Atomic Habits",
        author: "James Clear",
        category: "Education",
        year: 2018,
        rating: 4.9,
        badge: "Bestseller",
        cover_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80",
        description: "An extraordinarily practical guide on how tiny daily changes and repeatable systems can compound into remarkable personal and professional growth."
    },
    {
        id: "pride-and-prejudice",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Fiction",
        year: 1813,
        rating: 4.7,
        badge: "Classic",
        cover_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
        description: "A timeless masterpiece navigating manners, marriage, morality, and misconceptions through the spirited Elizabeth Bennet and proud Mr. Darcy."
    },
    {
        id: "long-walk-to-freedom",
        title: "Long Walk to Freedom",
        author: "Nelson Mandela",
        category: "Biography",
        year: 1994,
        rating: 4.8,
        badge: "Inspiring",
        cover_url: "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=400&q=80",
        description: "The riveting autobiography of Nelson Mandela, chronicling his lifelong fight against apartheid, 27 years of imprisonment, and journey to presidency."
    },
    {
        id: "and-then-there-were-none",
        title: "And Then There Were None",
        author: "Agatha Christie",
        category: "Mystery",
        year: 1939,
        rating: 4.8,
        badge: "Top Mystery",
        cover_url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
        description: "Ten strangers are lured to an isolated island off the Devon coast by a mysterious host, where they are trapped and eliminated one by one in accordance with a sinister nursery rhyme."
    },
    {
        id: "secret-garden",
        title: "The Secret Garden",
        author: "Frances Hodgson Burnett",
        category: "Fiction",
        year: 1911,
        rating: 4.6,
        badge: "Classic",
        cover_url: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=400&q=80",
        description: "Orphaned Mary Lennox discovers a neglected walled garden at Misselthwaite Manor, finding renewal, friendship, and joy as she helps it bloom."
    },
    {
        id: "great-gatsby",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        year: 1925,
        rating: 4.5,
        badge: "Classic",
        cover_url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80",
        description: "Set in the Jazz Age, narrator Nick Carraway tells the tragic story of the enigmatic millionaire Jay Gatsby and his obsessive passion for Daisy Buchanan."
    },
    {
        id: "1984",
        title: "1984",
        author: "George Orwell",
        category: "Fiction",
        year: 1949,
        rating: 4.8,
        badge: "Masterpiece",
        cover_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
        description: "A chilling dystopian vision of totalitarian surveillance, government mind control, and Winston Smith's rebellion against Big Brother in Oceania."
    },
    {
        id: "hobbit",
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
        category: "Fantasy",
        year: 1937,
        rating: 4.9,
        badge: "Epic Fantasy",
        cover_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80",
        description: "Bilbo Baggins, a peace-loving hobbit, is swept into a dangerous quest with wizard Gandalf and thirteen dwarves to reclaim the Lonely Mountain from Smaug the dragon."
    },
    {
        id: "harry-potter-1",
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J. K. Rowling",
        category: "Fantasy",
        year: 1997,
        rating: 4.9,
        badge: "Fantasy",
        cover_url: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?auto=format&fit=crop&w=400&q=80",
        description: "An eleven-year-old orphan discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry, beginning an unforgettable magical journey."
    },
    {
        id: "brief-history-of-time",
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        year: 1988,
        rating: 4.7,
        badge: "Cosmology",
        cover_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
        description: "A landmark cosmological exploration explaining the Big Bang, black holes, light cones, and quantum mechanics in clear, accessible prose."
    },
    {
        id: "diary-of-anne-frank",
        title: "The Diary of a Young Girl",
        author: "Anne Frank",
        category: "History",
        year: 1947,
        rating: 4.8,
        badge: "Historical",
        cover_url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80",
        description: "The moving, intimate diary kept by Jewish teenager Anne Frank while hiding for two years with her family during the Nazi occupation of the Netherlands."
    },
    {
        id: "sapiens",
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        category: "History",
        year: 2011,
        rating: 4.8,
        badge: "Bestseller",
        cover_url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
        description: "How an insignificant ape became the ruler of planet Earth: tracing the Cognitive, Agricultural, and Scientific Revolutions that transformed humanity."
    },
    {
        id: "to-kill-a-mockingbird",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Fiction",
        year: 1960,
        rating: 4.9,
        badge: "Pulitzer Winner",
        cover_url: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=400&q=80",
        description: "Set in Alabama, lawyer Atticus Finch defends a Black man falsely accused of rape, teaching his children Scout and Jem the power of empathy and justice."
    },
    {
        id: "sherlock-holmes",
        title: "The Hound of the Baskervilles",
        author: "Arthur Conan Doyle",
        category: "Mystery",
        year: 1902,
        rating: 4.7,
        badge: "Detective",
        cover_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80",
        description: "Sherlock Holmes and Dr. Watson investigate the chilling legend of a supernatural, spectral hound terrorizing the wealthy Baskerville family on the desolate Devon moors."
    },
    {
        id: "man-search-for-meaning",
        title: "Man's Search for Meaning",
        author: "Viktor E. Frankl",
        category: "Biography",
        year: 1946,
        rating: 4.9,
        badge: "Philosophy",
        cover_url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
        description: "Psychiatrist Viktor Frankl's profound memoir of surviving Nazi concentration camps and developing logotherapy — finding deep purpose in the face of suffering."
    }
];

let allBooks = [...DEFAULT_BOOKS];
let activeCategory = "All";
let activeSort = "rating";
let userFavourites = JSON.parse(localStorage.getItem("booknest-home-favourites") || "[]");

// DOM ELEMENTS
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const clearButton = document.getElementById("clear-button");
const booksContainer = document.getElementById("books-container");
const emptyMessage = document.getElementById("empty-message");
const resultCount = document.getElementById("result-count");
const categoryChips = document.querySelectorAll(".chip");

// MODAL ELEMENTS
const bookModal = document.getElementById("bookModal");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalReadBtn = document.getElementById("modalReadBtn");
const modalClose = document.getElementById("modalClose");
const modalDone = document.getElementById("modalDone");

// 2. FETCH ADDITIONAL BOOKS FROM SUPABASE IF AVAILABLE
async function syncSupabaseBooks() {
    try {
        if (!window.supabaseClient) return;

        const { data, error } = await window.supabaseClient
            .from("books")
            .select("*");

        if (error) {
            console.warn("Supabase books sync notice:", error);
            return;
        }

        if (data && data.length > 0) {
            const existingIds = new Set(allBooks.map(b => String(b.id)));
            data.forEach(dbBook => {
                if (!existingIds.has(String(dbBook.id))) {
                    allBooks.push({
                        id: dbBook.id,
                        title: dbBook.title,
                        author: dbBook.author,
                        category: dbBook.category || "General",
                        year: dbBook.year || 2024,
                        rating: Number(dbBook.rating) || 4.7,
                        badge: "Community",
                        cover_url: dbBook.cover_url || "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
                        description: dbBook.description || "A curated book in the BookNest+ collection."
                    });
                }
            });
            applyFilters();
        }
    } catch (e) {
        console.warn("Supabase fetch exception:", e);
    }
}

// 3. RENDER BOOKS GRID
function displayBooks(bookList) {
    booksContainer.innerHTML = "";

    resultCount.textContent = `${bookList.length} ${bookList.length === 1 ? 'book' : 'books'} available`;
    emptyMessage.hidden = bookList.length !== 0;

    bookList.forEach(book => {
        const isFav = userFavourites.includes(book.title.toLowerCase());

        const card = document.createElement("article");
        card.className = "book-card";

        // Cover Wrap
        const coverWrap = document.createElement("div");
        coverWrap.className = "book-cover-wrap";

        const img = document.createElement("img");
        img.src = book.cover_url;
        img.alt = `${book.title} cover`;
        img.loading = "lazy";

        const badge = document.createElement("span");
        badge.className = "book-badge";
        badge.textContent = book.badge || book.category;

        const heartBtn = document.createElement("button");
        heartBtn.className = `card-heart-btn ${isFav ? 'favourited' : ''}`;
        heartBtn.setAttribute("aria-label", "Save to favourites");
        heartBtn.textContent = isFav ? "♥" : "♡";
        heartBtn.addEventListener("click", () => toggleFavourite(book.title, heartBtn));

        coverWrap.append(img, badge, heartBtn);

        // Content
        const content = document.createElement("div");
        content.className = "book-content";

        const cat = document.createElement("span");
        cat.className = "book-category-tag";
        cat.textContent = book.category;

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.className = "book-author";
        author.textContent = `By ${book.author}`;

        const metaRow = document.createElement("div");
        metaRow.className = "book-meta-row";

        const rating = document.createElement("span");
        rating.className = "rating-badge";
        rating.textContent = `★ ${book.rating || 4.7}`;

        const year = document.createElement("span");
        year.textContent = `${book.year || ''}`;

        metaRow.append(rating, year);

        const desc = document.createElement("p");
        desc.className = "book-description";
        desc.textContent = book.description;

        // Action Buttons
        const actions = document.createElement("div");
        actions.className = "card-actions";

        const readBtn = document.createElement("a");
        readBtn.className = "btn-read";
        readBtn.href = `reader/reader.html?id=${encodeURIComponent(book.id)}`;
        readBtn.innerHTML = "📖 Read Now";

        const detailsBtn = document.createElement("button");
        detailsBtn.className = "btn-details";
        detailsBtn.textContent = "Details ↗";
        detailsBtn.addEventListener("click", () => openBookModal(book));

        actions.append(readBtn, detailsBtn);

        content.append(cat, title, author, metaRow, desc, actions);
        card.append(coverWrap, content);
        booksContainer.appendChild(card);
    });
}

// 4. FILTERING & SORTING LOGIC
function applyFilters() {
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";

    let filtered = allBooks.filter(book => {
        const matchesCategory = (activeCategory === "All") || (book.category.toLowerCase() === activeCategory.toLowerCase());
        const matchesSearch = !searchTerm || 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.category.toLowerCase().includes(searchTerm) ||
            (book.description && book.description.toLowerCase().includes(searchTerm));

        return matchesCategory && matchesSearch;
    });

    // Sorting
    if (activeSort === "rating") {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (activeSort === "year-desc") {
        filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (activeSort === "title-asc") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    displayBooks(filtered);
}

// 5. EVENT LISTENERS
if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
}

if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
        activeSort = e.target.value;
        applyFilters();
    });
}

if (clearButton) {
    clearButton.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        activeCategory = "All";
        categoryChips.forEach(c => c.classList.toggle("active", c.dataset.category === "All"));
        applyFilters();
    });
}

categoryChips.forEach(chip => {
    chip.addEventListener("click", () => {
        categoryChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        activeCategory = chip.dataset.category || "All";
        applyFilters();
    });
});

// 6. MODAL INTERACTION
function openBookModal(book) {
    if (!bookModal) return;

    modalTitle.textContent = book.title;
    modalAuthor.textContent = `By ${book.author} • ${book.year}`;
    if (modalCategory) modalCategory.textContent = book.category;
    modalDescription.textContent = book.description;

    if (modalReadBtn) {
        modalReadBtn.href = `reader/reader.html?id=${encodeURIComponent(book.id)}`;
    }

    bookModal.showModal();
}

if (modalClose) {
    modalClose.addEventListener("click", () => bookModal.close());
}
if (modalDone) {
    modalDone.addEventListener("click", () => bookModal.close());
}
if (bookModal) {
    bookModal.addEventListener("click", (e) => {
        if (e.target === bookModal) bookModal.close();
    });
}

// 7. FAVORITES & WISHLIST TOGGLE
async function toggleFavourite(bookTitle, buttonEl) {
    const key = bookTitle.toLowerCase();
    const index = userFavourites.indexOf(key);

    if (index > -1) {
        userFavourites.splice(index, 1);
        buttonEl.textContent = "♡";
        buttonEl.classList.remove("favourited");
    } else {
        userFavourites.push(key);
        buttonEl.textContent = "♥";
        buttonEl.classList.add("favourited");
    }

    localStorage.setItem("booknest-home-favourites", JSON.stringify(userFavourites));

    // Sync to Supabase wishlist if user is authenticated
    try {
        if (window.supabaseClient) {
            const { data: { user } } = await window.supabaseClient.auth.getUser();
            if (user) {
                if (userFavourites.includes(key)) {
                    await window.supabaseClient.from("wishlist").insert({ user_id: user.id, book_id: key });
                } else {
                    await window.supabaseClient.from("wishlist").delete().eq("user_id", user.id).eq("book_id", key);
                }
            }
        }
    } catch (e) {
        console.warn("Wishlist sync error:", e);
    }
}

// 8. DYNAMIC AUTH IN NAVBAR
async function checkAuthNavbar() {
    try {
        if (!window.supabaseClient) return;
        const { data: { user } } = await window.supabaseClient.auth.getUser();
        const navActions = document.getElementById("navActions");
        if (user && navActions) {
            const username = user.user_metadata?.username || user.email?.split("@")[0] || "Profile";
            navActions.innerHTML = `
                <a href="wishlist.html" class="nav-link">♡ Favourites</a>
                <a href="author-submission/submit-writing.html" class="btn btn-submit">✍️ Submit Writing</a>
                <a href="profile.html" class="btn btn-outline">👤 ${username}</a>
                <button type="button" id="logoutBtn" class="btn btn-primary">Logout</button>
            `;
            document.getElementById("logoutBtn")?.addEventListener("click", async () => {
                await window.supabaseClient.auth.signOut();
                window.location.reload();
            });
        }
    } catch (e) {
        console.error(e);
    }
}

// INITIALIZE
document.addEventListener("DOMContentLoaded", () => {
    applyFilters();
    syncSupabaseBooks();
    checkAuthNavbar();
});
