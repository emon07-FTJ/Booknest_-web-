const BOOK = {
    id: "secret-garden",
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    category: "Classic Fiction",
    year: "1911"
};

const STORAGE_KEY = "booknest-wishlist";

function getWishlist() {
    try {
        const savedBooks = localStorage.getItem(STORAGE_KEY);
        return savedBooks ? JSON.parse(savedBooks) : [];
    } catch (error) {
        return [];
    }
}

function saveWishlist(books) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function addToWishlist() {
    const wishlist = getWishlist();
    const message = document.getElementById("details-message");

    const alreadyAdded = wishlist.some(function (book) {
        return book.id === BOOK.id;
    });

    if (alreadyAdded) {
        message.textContent = "This book is already in your wishlist.";
        return;
    }

    wishlist.push(BOOK);
    saveWishlist(wishlist);

    message.textContent = "Book added to your wishlist successfully.";
}

function removeFromWishlist(bookId) {
    const wishlist = getWishlist();

    const updatedWishlist = wishlist.filter(function (book) {
        return book.id !== bookId;
    });

    saveWishlist(updatedWishlist);
    displayWishlist();
}

function displayWishlist() {
    const list = document.getElementById("wishlist-list");
    const emptyMessage = document.getElementById("empty-message");

    if (!list || !emptyMessage) {
        return;
    }

    const wishlist = getWishlist();

    list.innerHTML = "";

    emptyMessage.hidden = wishlist.length > 0;

    wishlist.forEach(function (book) {
        const item = document.createElement("article");
        item.className = "wishlist-item";

        const information = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        const category = document.createElement("p");
        category.textContent = "Category: " + book.category;

        information.appendChild(title);
        information.appendChild(author);
        information.appendChild(category);

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-btn";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {
            removeFromWishlist(book.id);
        });

        item.appendChild(information);
        item.appendChild(removeButton);

        list.appendChild(item);
    });
}

const wishlistButton = document.getElementById("wishlist-button");

if (wishlistButton) {
    wishlistButton.addEventListener("click", addToWishlist);
}

displayWishlist();