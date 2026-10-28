/* ========================================================
   BOOKNEST+ | WISHLIST JAVASCRIPT
   ======================================================== */

// 1. MASTER BOOK CATALOG REFERENCE FOR WISHLIST ENRICHMENT
const WISHLIST_CATALOG = {
    "alchemist": {
        id: "alchemist",
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Adventure",
        rating: 4.8,
        cover_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80"
    },
    "the alchemist": {
        id: "alchemist",
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Adventure",
        rating: 4.8,
        cover_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80"
    },
    "atomic-habits": {
        id: "atomic-habits",
        title: "Atomic Habits",
        author: "James Clear",
        category: "Education",
        rating: 4.9,
        cover_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80"
    },
    "atomic habits": {
        id: "atomic-habits",
        title: "Atomic Habits",
        author: "James Clear",
        category: "Education",
        rating: 4.9,
        cover_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80"
    },
    "pride-and-prejudice": {
        id: "pride-and-prejudice",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Fiction",
        rating: 4.7,
        cover_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
    },
    "pride and prejudice": {
        id: "pride-and-prejudice",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Fiction",
        rating: 4.7,
        cover_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
    },
    "long-walk-to-freedom": {
        id: "long-walk-to-freedom",
        title: "Long Walk to Freedom",
        author: "Nelson Mandela",
        category: "Biography",
        rating: 4.8,
        cover_url: "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=400&q=80"
    },
    "long walk to freedom": {
        id: "long-walk-to-freedom",
        title: "Long Walk to Freedom",
        author: "Nelson Mandela",
        category: "Biography",
        rating: 4.8,
        cover_url: "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=400&q=80"
    },
    "and-then-there-were-none": {
        id: "and-then-there-were-none",
        title: "And Then There Were None",
        author: "Agatha Christie",
        category: "Mystery",
        rating: 4.8,
        cover_url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80"
    },
    "and then there were none": {
        id: "and-then-there-were-none",
        title: "And Then There Were None",
        author: "Agatha Christie",
        category: "Mystery",
        rating: 4.8,
        cover_url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80"
    },
    "secret-garden": {
        id: "secret-garden",
        title: "The Secret Garden",
        author: "Frances Hodgson Burnett",
        category: "Classic Fiction",
        rating: 4.6,
        cover_url: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=400&q=80"
    },
    "the secret garden": {
        id: "secret-garden",
        title: "The Secret Garden",
        author: "Frances Hodgson Burnett",
        category: "Classic Fiction",
        rating: 4.6,
        cover_url: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=400&q=80"
    },
    "great-gatsby": {
        id: "great-gatsby",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        rating: 4.5,
        cover_url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80"
    },
    "1984": {
        id: "1984",
        title: "1984",
        author: "George Orwell",
        category: "Fiction",
        rating: 4.8,
        cover_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80"
    },
    "hobbit": {
        id: "hobbit",
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
        category: "Fantasy",
        rating: 4.9,
        cover_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
    },
    "harry-potter-1": {
        id: "harry-potter-1",
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J. K. Rowling",
        category: "Fantasy",
        rating: 4.9,
        cover_url: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?auto=format&fit=crop&w=400&q=80"
    },
    "brief-history-of-time": {
        id: "brief-history-of-time",
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        rating: 4.7,
        cover_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80"
    },
    "diary-of-anne-frank": {
        id: "diary-of-anne-frank",
        title: "The Diary of a Young Girl",
        author: "Anne Frank",
        category: "History",
        rating: 4.8,
        cover_url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80"
    },
    "sapiens": {
        id: "sapiens",
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        category: "History",
        rating: 4.8,
        cover_url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80"
    },
    "to-kill-a-mockingbird": {
        id: "to-kill-a-mockingbird",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Fiction",
        rating: 4.9,
        cover_url: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=400&q=80"
    },
    "sherlock-holmes": {
        id: "sherlock-holmes",
        title: "The Hound of the Baskervilles",
        author: "Arthur Conan Doyle",
        category: "Mystery",
        rating: 4.7,
        cover_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80"
    },
    "man-search-for-meaning": {
        id: "man-search-for-meaning",
        title: "Man's Search for Meaning",
        author: "Viktor E. Frankl",
        category: "Biography",
        rating: 4.9,
        cover_url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80"
    }
};

let BOOK = {
    id: "secret-garden",
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    category: "Classic Fiction",
    year: "1911",
    description: "The Secret Garden is a classic novel about a young girl named Mary Lennox who discovers a hidden garden. As she explores and cares for the garden, she develops friendships and experiences personal growth."
};

// 2. HELPER FUNCTIONS
async function getCurrentUser() {
    try {
        if (!window.supabaseClient) return null;
        const { data } = await window.supabaseClient.auth.getUser();
        return data.user || null;
    } catch (error) {
        console.warn("User auth check:", error);
        return null;
    }
}

// 3. BOOK DETAILS PAGE COMPATIBILITY (book-details.html)
async function loadBookDetail() {
    try {
        const params = new URLSearchParams(window.location.search);
        const bookId = window.BOOK_DETAIL_ID || params.get('id') || BOOK.id;
        BOOK.id = bookId;

        if (window.supabaseClient) {
            const { data } = await window.supabaseClient
                .from('books')
                .select('*')
                .eq('id', bookId)
                .maybeSingle();

            if (data) {
                BOOK.title = data.title || BOOK.title;
                BOOK.author = data.author || BOOK.author;
                BOOK.category = data.category || BOOK.category;
                BOOK.description = data.description || BOOK.description;
            }
        }
    } catch (e) {
        console.warn("loadBookDetail error:", e);
    }
}

async function addToWishlist() {
    const message = document.getElementById("details-message");
    if (!message) return;

    const user = await getCurrentUser();
    if (!user) {
        message.innerHTML = 'Please <a href="login.html" style="color: #b42318; font-weight: bold; text-decoration: underline;">log in</a> to add books to your cloud wishlist.';
        message.style.color = "#b42318";
        return;
    }

    try {
        const { error } = await window.supabaseClient
            .from("wishlist")
            .insert({
                user_id: user.id,
                book_id: BOOK.id
            });

        if (error) {
            if (error.code === "23505") {
                message.textContent = "This book is already in your wishlist.";
                message.style.color = "#b42318";
                return;
            }
            console.error(error);
            message.textContent = "Failed to add to wishlist: " + error.message;
            message.style.color = "#b42318";
            return;
        }

        // Also sync local
        const localFavs = JSON.parse(localStorage.getItem("booknest-home-favourites") || "[]");
        if (!localFavs.includes(BOOK.title.toLowerCase())) {
            localFavs.push(BOOK.title.toLowerCase());
            localStorage.setItem("booknest-home-favourites", JSON.stringify(localFavs));
        }

        message.textContent = "✓ Book added to your wishlist successfully!";
        message.style.color = "#247342";
    } catch (err) {
        console.error(err);
        message.textContent = "Something went wrong.";
        message.style.color = "#b42318";
    }
}

const wishlistButton = document.getElementById("wishlist-button");
if (wishlistButton) {
    wishlistButton.addEventListener("click", addToWishlist);
}

loadBookDetail();

// 4. DISPLAY & MANAGE WISHLIST (wishlist.html)
async function displayWishlist() {
    const list = document.getElementById("wishlist-list");
    const emptyState = document.getElementById("empty-state");
    const countBadge = document.getElementById("wishlist-count");

    if (!list) return;

    list.innerHTML = "<p style='padding: 20px; color: #5e6d64;'>Loading your saved books...</p>";

    const user = await getCurrentUser();
    const localFavs = JSON.parse(localStorage.getItem("booknest-home-favourites") || "[]");
    let savedKeys = new Set();

    // Add local favourites
    localFavs.forEach(item => savedKeys.add(item.toLowerCase()));

    // If logged in, fetch from Supabase
    if (user && window.supabaseClient) {
        try {
            const { data, error } = await window.supabaseClient
                .from("wishlist")
                .select("book_id")
                .eq("user_id", user.id);

            if (!error && data) {
                data.forEach(row => savedKeys.add(String(row.book_id).toLowerCase()));
            }
        } catch (e) {
            console.warn("Supabase wishlist query:", e);
        }
    }

    const savedArray = Array.from(savedKeys);

    if (countBadge) {
        countBadge.textContent = `${savedArray.length} ${savedArray.length === 1 ? 'Book' : 'Books'} Saved`;
    }

    if (savedArray.length === 0) {
        list.innerHTML = "";
        if (emptyState) emptyState.hidden = false;
        return;
    }

    if (emptyState) emptyState.hidden = true;
    list.innerHTML = "";

    savedArray.forEach(key => {
        // Look up book info from catalog or generate clean metadata
        const matched = WISHLIST_CATALOG[key] || WISHLIST_CATALOG[key.replace(/\s+/g, "-")] || null;

        const title = matched ? matched.title : key.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        const author = matched ? matched.author : "Curated Author";
        const category = matched ? matched.category : "Literature";
        const rating = matched ? matched.rating : 4.8;
        const coverUrl = matched ? matched.cover_url : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80";
        const readerId = matched ? matched.id : key.replace(/\s+/g, "-");

        const card = document.createElement("article");
        card.className = "wishlist-card";

        card.innerHTML = `
            <div class="wishlist-cover">
                <img src="${coverUrl}" alt="${title} cover" loading="lazy">
            </div>
            <div class="wishlist-details">
                <span class="wishlist-category">${category}</span>
                <h3>${title}</h3>
                <p class="wishlist-author">By ${author}</p>
                <div class="wishlist-rating">★ ${rating}</div>
                <div class="wishlist-actions">
                    <a href="reader/reader.html?id=${encodeURIComponent(readerId)}" class="btn-read-now">📖 Read Now</a>
                    <button type="button" class="btn-remove-item" data-key="${key}" title="Remove from wishlist">✕ Remove</button>
                </div>
            </div>
        `;

        card.querySelector(".btn-remove-item").addEventListener("click", () => {
            removeFromWishlist(key);
        });

        list.appendChild(card);
    });
}

async function removeFromWishlist(bookKey) {
    // Remove from local storage
    let localFavs = JSON.parse(localStorage.getItem("booknest-home-favourites") || "[]");
    localFavs = localFavs.filter(item => item.toLowerCase() !== bookKey.toLowerCase());
    localStorage.setItem("booknest-home-favourites", JSON.stringify(localFavs));

    // Remove from Supabase if logged in
    const user = await getCurrentUser();
    if (user && window.supabaseClient) {
        try {
            await window.supabaseClient
                .from("wishlist")
                .delete()
                .eq("user_id", user.id)
                .eq("book_id", bookKey);
        } catch (e) {
            console.warn("Supabase remove error:", e);
        }
    }

    displayWishlist();
}

async function clearAllWishlist() {
    if (!confirm("Are you sure you want to clear your entire wishlist?")) return;

    localStorage.removeItem("booknest-home-favourites");

    const user = await getCurrentUser();
    if (user && window.supabaseClient) {
        try {
            await window.supabaseClient
                .from("wishlist")
                .delete()
                .eq("user_id", user.id);
        } catch (e) {
            console.warn("Supabase clear error:", e);
        }
    }

    displayWishlist();
}

// 5. NAVBAR AUTH STATE CHECK
async function checkAuthNav() {
    try {
        if (!window.supabaseClient) return;
        const { data: { user } } = await window.supabaseClient.auth.getUser();
        const navActions = document.getElementById("navActions");
        if (user && navActions) {
            const username = user.user_metadata?.username || user.email?.split("@")[0] || "Profile";
            navActions.innerHTML = `
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

// 6. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    displayWishlist();
    checkAuthNav();

    const clearAllBtn = document.getElementById("clear-all-btn");
    if (clearAllBtn) {
        clearAllBtn.addEventListener("click", clearAllWishlist);
    }
});
