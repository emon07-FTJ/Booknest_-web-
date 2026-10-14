
document.addEventListener("DOMContentLoaded", () => {
  const TOTAL_PAGES = 40;

  const books = {
    "alchemist": {
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "THE ALCHEMIST",
      theme: "linear-gradient(145deg,#124f56,#267d78 65%,#d4a45b)",
      samples: [
        {
          title: "The Shepherd's Journey",
          paragraphs: [
            "Welcome to the reading preview of The Alchemist. Santiago is a young shepherd whose life is shaped by travel, curiosity and a dream that continues to return to him.",
            "As he moves through familiar landscapes, he begins to wonder whether there is more to life than the routine he already knows. His questions invite readers to reflect on dreams and the courage needed to pursue them.",
            "This page introduces the reader interface. It is original demonstration text, not a reproduction of the novel."
          ]
        },
        {
          title: "A Dream Revisited",
          paragraphs: [
            "Sometimes a question stays with us long after we first encounter it. Santiago's recurring dream encourages him to consider possibilities he had not taken seriously before.",
            "A dream alone does not complete a journey. Curiosity, careful decisions and a willingness to learn can help turn an idea into a meaningful goal."
          ]
        },
        {
          title: "The Journey Begins",
          paragraphs: [
            "Beginning something unfamiliar can feel uncomfortable. Leaving a routine behind means accepting that not every answer will be available at the start.",
            "This sample page is designed to demonstrate reading controls and page navigation. Use the contents panel to explore the remaining demo pages."
          ]
        }
      ]
    },

    "atomic-habits": {
      title: "Atomic Habits",
      author: "James Clear",
      cover: "ATOMIC HABITS",
      theme: "linear-gradient(145deg,#c7c0a9,#f0e9d8)",
      samples: [
        {
          title: "Small Changes, Big Results",
          paragraphs: [
            "Welcome to the Atomic Habits reading preview. Small, repeatable actions can be easier to maintain than a large change that demands too much effort at once.",
            "A useful habit often starts with a clear and manageable action. Repeating that action can help it become a familiar part of everyday life.",
            "This is original demonstration content for BookNest+, not the original text of the book."
          ]
        },
        {
          title: "Building Better Routines",
          paragraphs: [
            "A routine can become easier to remember when it is connected to something you already do each day. A consistent place and time can also make an action feel more natural.",
            "Start with a small step that fits your circumstances. You can adjust the routine as you learn what works for you."
          ]
        },
        {
          title: "Make Progress Visible",
          paragraphs: [
            "Tracking an action can help you notice your effort. A calendar, a checklist or a simple written note may be enough to make progress easier to see.",
            "This sample chapter demonstrates the reader layout and is not a replacement for the complete book."
          ]
        }
      ]
    },

    "pride-and-prejudice": {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "PRIDE & PREJUDICE",
      theme: "linear-gradient(145deg,#722d4e,#b55b72 60%,#e1b0a6)",
      samples: [
        {
          title: "An Introduction",
          paragraphs: [
            "Welcome to this reading preview of Pride and Prejudice. Jane Austen's celebrated novel explores relationships, social expectations and the assumptions people make about one another.",
            "The story offers readers opportunities to think about how conversations, reputation and first impressions influence personal decisions.",
            "This introductory passage is sample text created for the reader demo, not a transcription of the novel."
          ]
        },
        {
          title: "First Impressions",
          paragraphs: [
            "A first impression can shape our expectations, but it rarely tells the whole story. Learning more about a person may challenge an opinion formed too quickly.",
            "Consider how evidence, conversation and experience can help people reconsider what they thought they knew."
          ]
        },
        {
          title: "Understanding Others",
          paragraphs: [
            "Understanding another person often requires patience. Circumstances and motives can be more complicated than they first appear.",
            "This sample page lets you test the chapter list, reading theme and navigation. Add text from an appropriate edition for complete reading."
          ]
        }
      ]
    },

    "long-walk-to-freedom": {
      title: "Long Walk to Freedom",
      author: "Nelson Mandela",
      cover: "LONG WALK TO FREEDOM",
      theme: "linear-gradient(145deg,#193c38,#48745d 65%,#d3b47d)",
      samples: [
        {
          title: "A Life and Its Beginnings",
          paragraphs: [
            "Welcome to the reader preview of Long Walk to Freedom, Nelson Mandela's autobiography. The book recounts his life and his role in South Africa's struggle against apartheid.",
            "Autobiographies offer a personal perspective on history. They can help readers understand how an individual's experiences connect with wider social and political changes.",
            "This is original introductory sample text, not the complete autobiography."
          ]
        },
        {
          title: "Learning and Responsibility",
          paragraphs: [
            "Education, relationships and lived experience can influence how a person understands responsibility. Personal growth often happens through both difficult and encouraging experiences.",
            "While reading an autobiography, consider the historical setting and the challenges that shaped the author's decisions."
          ]
        },
        {
          title: "Hope for the Future",
          paragraphs: [
            "Stories of perseverance invite readers to think about justice, dignity and the possibility of change.",
            "This page is demonstration content. The complete autobiography is not included in this sample reader."
          ]
        }
      ]
    },

    "and-then-there-were-none": {
      title: "And Then There Were None",
      author: "Agatha Christie",
      cover: "AND THEN THERE WERE NONE",
      theme: "radial-gradient(circle at 50% 42%,#4d536c,#171c2c 72%)",
      samples: [
        {
          title: "A Mystery Begins",
          paragraphs: [
            "Welcome to this mystery reader preview. Agatha Christie's famous novel brings a group of strangers into a situation filled with uncertainty.",
            "Mystery stories invite readers to observe details, question assumptions and consider several possible explanations before reaching a conclusion.",
            "This sample was written to demonstrate BookNest+'s reader interface and does not reproduce the novel."
          ]
        },
        {
          title: "Questions and Clues",
          paragraphs: [
            "A detail that initially appears unimportant may become meaningful when new information emerges. Careful observation can help separate a useful clue from a misleading assumption.",
            "As you read a mystery, consider what is known, what is suspected and what still needs an explanation."
          ]
        },
        {
          title: "The Search for Answers",
          paragraphs: [
            "Mysteries become engaging when different explanations compete. Readers must reconsider their theories as each new detail changes the picture.",
            "This demonstration chapter is provided for testing navigation and reading controls, not as a replacement for the original novel."
          ]
        }
      ]
    }
  };

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("id") || "alchemist";
  const bookId = Object.prototype.hasOwnProperty.call(books, requestedId)
    ? requestedId
    : "alchemist";

  const book = books[bookId];

  const $ = id => document.getElementById(id);

  const elements = {
    headerBookTitle: $("headerBookTitle"),
    miniBook: $("miniBook"),
    miniBookTitle: $("miniBookTitle"),
    miniBookAuthor: $("miniBookAuthor"),
    sidebarTitle: $("sidebarTitle"),
    sidebarAuthor: $("sidebarAuthor"),
    chapterList: $("chapterList"),
    chapterSearch: $("chapterSearch"),
    chapterKicker: $("chapterKicker"),
    chapterHeading: $("chapterHeading"),
    chapterPosition: $("pagePosition"),
    paperBookTitle: $("paperBookTitle"),
    paperPageNumber: $("paperPageNumber"),
    paperHeading: $("paperHeading"),
    pageContent: $("pageContent"),
    readingNote: $("readingNote"),
    paperFooterPage: $("paperFooterPage"),
    previousPage: $("previousPage"),
    nextPage: $("nextPage"),
    currentPageNumber: $("currentPageNumber"),
    lastPageNumber: $("lastPageNumber"),
    progressFill: $("progressFill"),
    bottomProgressFill: $("bottomProgressFill"),
    bottomProgressLabel: $("bottomProgressLabel"),
    fontSizeLabel: $("fontSizeLabel"),
    bookmarkButton: $("bookmarkButton"),
    bookmarkTop: $("bookmarkTop"),
    themeToggle: $("themeToggle"),
    toast: $("toast")
  };

  const storagePrefix = `booknest-reader-${bookId}`;
  const safeRead = (key, fallback) => {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  };

  const safeWrite = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Reader continues to work if browser storage is unavailable.
    }
  };

  let currentPage = Number(safeRead(`${storagePrefix}-page`, 1));
  currentPage = Number.isFinite(currentPage)
    ? Math.max(1, Math.min(TOTAL_PAGES, Math.floor(currentPage)))
    : 1;

  let fontSize = Number(safeRead(`${storagePrefix}-font`, 18));
  fontSize = Number.isFinite(fontSize)
    ? Math.max(14, Math.min(30, fontSize))
    : 18;

  let bookmarks = safeRead(`${storagePrefix}-bookmarks`, []);
  if (!Array.isArray(bookmarks)) bookmarks = [];

  let toastTimer;

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      elements.toast.classList.remove("show");
    }, 2000);
  }

  function makePage(pageNumber) {
    if (pageNumber <= book.samples.length) {
      return book.samples[pageNumber - 1];
    }

    return {
      title: `Reading Page ${String(pageNumber).padStart(2, "0")}`,
      paragraphs: [
        `Welcome to page ${pageNumber} of ${book.title}. This demonstration page is part of the BookNest+ reader experience.`,
        "Use this space to test reading typography, page navigation, bookmarks and the reading progress indicator. The content here is placeholder text created for interface testing.",
        "For a complete reading edition, replace this sample with text that you are authorized to use. The demo pages are not chapters from the original book."
      ]
    };
  }

  function makeChapterButton(pageNumber) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chapter-item";
    button.dataset.page = String(pageNumber);

    const number = document.createElement("span");
    number.className = "chapter-number";
    number.textContent = String(pageNumber).padStart(2, "0");

    const title = document.createElement("span");
    title.textContent = makePage(pageNumber).title;

    button.append(number, title);

    button.addEventListener("click", () => {
      goToPage(pageNumber);
    });

    return button;
  }

  function buildChapterList() {
    const fragment = document.createDocumentFragment();

    for (let page = 1; page <= TOTAL_PAGES; page++) {
      fragment.appendChild(makeChapterButton(page));
    }

    elements.chapterList.replaceChildren(fragment);
  }

  function updateBookmarks() {
    const isBookmarked = bookmarks.includes(currentPage);

    [elements.bookmarkButton, elements.bookmarkTop].forEach(button => {
      button.classList.toggle("is-bookmarked", isBookmarked);
      button.textContent = isBookmarked ? "♥" : "♡";
      button.setAttribute(
        "aria-label",
        isBookmarked ? "Remove bookmark" : "Bookmark this page"
      );
      button.title = isBookmarked ? "Remove bookmark" : "Bookmark page";
    });
  }

  function toggleBookmark() {
    if (bookmarks.includes(currentPage)) {
      bookmarks = bookmarks.filter(page => page !== currentPage);
      showToast("Bookmark removed");
    } else {
      bookmarks.push(currentPage);
      bookmarks.sort((a, b) => a - b);
      showToast(`Page ${currentPage} bookmarked`);
    }

    safeWrite(`${storagePrefix}-bookmarks`, bookmarks);
    updateBookmarks();
  }

  function updateThemeButton() {
    const dark = document.body.classList.contains("dark");
    elements.themeToggle.textContent = dark ? "☀" : "☾";
    elements.themeToggle.setAttribute(
      "aria-label",
      dark ? "Switch to light mode" : "Switch to dark mode"
    );
    elements.themeToggle.title = dark ? "Light reading mode" : "Dark reading mode";
  }

  function applyFontSize() {
    elements.pageContent.style.fontSize = `${fontSize}px`;
    elements.fontSizeLabel.textContent = `${fontSize} px`;
    safeWrite(`${storagePrefix}-font`, fontSize);
  }

  function renderPage() {
    const page = makePage(currentPage);
    const pageLabel = String(currentPage).padStart(2, "0");
    const percent = Math.round((currentPage / TOTAL_PAGES) * 100);

    elements.headerBookTitle.textContent = book.title;
    elements.miniBookTitle.textContent = book.cover;
    elements.miniBookAuthor.textContent = book.author.toUpperCase();
    elements.sidebarTitle.textContent = book.title;
    elements.sidebarAuthor.textContent = book.author;
    elements.miniBook.style.background = book.theme;

    elements.chapterKicker.textContent = `PAGE ${pageLabel}`;
    elements.chapterHeading.textContent = page.title;
    elements.chapterPosition.textContent =
      `Page ${currentPage} of ${TOTAL_PAGES}`;

    elements.paperBookTitle.textContent = book.title.toUpperCase();
    elements.paperPageNumber.textContent = pageLabel;
    elements.paperHeading.textContent = page.title;
    elements.paperFooterPage.textContent = String(currentPage);

    const paragraphFragment = document.createDocumentFragment();

    page.paragraphs.forEach(text => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      paragraphFragment.appendChild(paragraph);
    });

    elements.pageContent.replaceChildren(paragraphFragment);

    const noteText = bookmarks.includes(currentPage)
      ? "This page is bookmarked. You can return to it later."
      : "Take a breath, settle in, and enjoy your reading journey.";

    elements.readingNote.querySelector("p").textContent = noteText;

    elements.currentPageNumber.textContent = pageLabel;
    elements.lastPageNumber.textContent = String(TOTAL_PAGES);
    elements.previousPage.disabled = currentPage === 1;
    elements.nextPage.disabled = currentPage === TOTAL_PAGES;

    elements.progressFill.style.width = `${percent}%`;
    elements.bottomProgressFill.style.width = `${percent}%`;
    elements.bottomProgressLabel.textContent =
      `${currentPage} of ${TOTAL_PAGES} pages · ${percent}%`;

    elements.chapterList.querySelectorAll(".chapter-item").forEach(button => {
      const active = Number(button.dataset.page) === currentPage;
      button.classList.toggle("active", active);

      if (active) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    updateBookmarks();
    applyFontSize();
    safeWrite(`${storagePrefix}-page`, currentPage);

    document.title = `${book.title} — Page ${currentPage} | BookNest+`;
  }

  function goToPage(pageNumber, shouldScroll = false) {
    if (pageNumber < 1 || pageNumber > TOTAL_PAGES) return;

    currentPage = pageNumber;
    renderPage();

    if (shouldScroll) {
      document.querySelector(".reader-heading").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  elements.previousPage.addEventListener("click", () => {
    goToPage(currentPage - 1, true);
  });

  elements.nextPage.addEventListener("click", () => {
    goToPage(currentPage + 1, true);
  });

  elements.bookmarkButton.addEventListener("click", toggleBookmark);
  elements.bookmarkTop.addEventListener("click", toggleBookmark);

  $("fontUp").addEventListener("click", () => {
    fontSize = Math.min(30, fontSize + 2);
    applyFontSize();
  });

  $("fontDown").addEventListener("click", () => {
    fontSize = Math.max(14, fontSize - 2);
    applyFontSize();
  });

  const savedTheme = safeRead("booknest-reader-theme", "light");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
  updateThemeButton();

  elements.themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    safeWrite("booknest-reader-theme", theme);
    updateThemeButton();
  });

  elements.chapterSearch.addEventListener("input", () => {
    const query = elements.chapterSearch.value.trim().toLowerCase();

    elements.chapterList.querySelectorAll(".chapter-item").forEach(button => {
      const page = Number(button.dataset.page);
      const title = makePage(page).title.toLowerCase();

      button.hidden = !title.includes(query) &&
        !String(page).includes(query);
    });
  });

  $("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("keydown", event => {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target.isContentEditable;

    if (isTyping || event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === "ArrowLeft") goToPage(currentPage - 1);
    if (event.key === "ArrowRight") goToPage(currentPage + 1);
  });

  buildChapterList();
  renderPage();
});
