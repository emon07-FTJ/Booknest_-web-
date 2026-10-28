/* ========================================================
   BOOKNEST+ | ADMIN REVIEW PANEL JAVASCRIPT
   ======================================================== */

const getClient = () => window.supabaseClient || (typeof supabaseClient !== "undefined" ? supabaseClient : null);

// DOM Elements
const accessDeniedView = document.getElementById("access-denied-view");
const accessDeniedMessage = document.getElementById("access-denied-message");
const adminDashboardView = document.getElementById("admin-dashboard-view");
const adminUserBadge = document.getElementById("admin-user-badge");
const adminLogoutBtn = document.getElementById("admin-logout-btn");
const submissionList = document.getElementById("submission-list");

// Metrics
const metricTotal = document.getElementById("metric-total");
const metricPending = document.getElementById("metric-pending");
const metricAccepted = document.getElementById("metric-accepted");
const metricDeclined = document.getElementById("metric-declined");

// Tabs
const tabAllCount = document.getElementById("tab-all-count");
const tabPendingCount = document.getElementById("tab-pending-count");
const tabAcceptedCount = document.getElementById("tab-accepted-count");
const tabDeclinedCount = document.getElementById("tab-declined-count");
const tabButtons = document.querySelectorAll(".tab-btn");

let allSubmissions = [];
let currentFilter = "All";

// 1. VERIFY ADMIN PRIVILEGES
async function verifyAdmin() {
    const client = getClient();
    if (!client) {
        showDenied("Database connection could not be established. Please check your internet connection.");
        return null;
    }

    try {
        const { data: { user }, error } = await client.auth.getUser();

        if (error || !user) {
            showDenied("You are not currently logged in. Please sign in with an Administrator account.");
            return null;
        }

        const isAdmin = (typeof window.isAdminUser === "function" && window.isAdminUser(user)) ||
                        (typeof window.isAdminEmail === "function" && window.isAdminEmail(user.email)) ||
                        (user.email && (user.email.toLowerCase() === "admin@booknest.com" || user.email.toLowerCase() === "admin@gmail.com"));

        if (!isAdmin) {
            showDenied(`Access Denied: The account "${user.email}" does not have administrator privileges.`);
            return null;
        }

        // Access Granted
        if (accessDeniedView) accessDeniedView.hidden = true;
        if (adminDashboardView) adminDashboardView.hidden = false;
        if (adminUserBadge) adminUserBadge.textContent = `Admin: ${user.email}`;

        return user;
    } catch (e) {
        console.error("Auth check exception:", e);
        showDenied("Authentication verification failed.");
        return null;
    }
}

function showDenied(msg) {
    if (adminDashboardView) adminDashboardView.hidden = true;
    if (accessDeniedView) accessDeniedView.hidden = false;
    if (accessDeniedMessage && msg) accessDeniedMessage.textContent = msg;
}

// 2. LOAD SUBMISSIONS
async function loadSubmissions() {
    if (!submissionList) return;
    submissionList.innerHTML = "<p style='padding: 20px; color: #5e6d64;'>Loading all author submissions...</p>";

    const client = getClient();
    if (!client) return;

    try {
        const { data, error } = await client
            .from("submissions")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error loading submissions:", error);
            submissionList.innerHTML = `<p style="color:#b42318; padding: 20px;">Could not load submissions: ${error.message}</p>`;
            return;
        }

        allSubmissions = data || [];
        updateMetrics();
        renderSubmissions();
    } catch (err) {
        console.error("Submissions load error:", err);
        submissionList.innerHTML = `<p style="color:#b42318; padding: 20px;">Unexpected error: ${err.message || err}</p>`;
    }
}

// 3. UPDATE STATS & METRICS
function updateMetrics() {
    const total = allSubmissions.length;
    const pending = allSubmissions.filter(s => (s.status || "Pending") === "Pending").length;
    const accepted = allSubmissions.filter(s => s.status === "Accepted").length;
    const declined = allSubmissions.filter(s => s.status === "Declined").length;

    if (metricTotal) metricTotal.textContent = total;
    if (metricPending) metricPending.textContent = pending;
    if (metricAccepted) metricAccepted.textContent = accepted;
    if (metricDeclined) metricDeclined.textContent = declined;

    if (tabAllCount) tabAllCount.textContent = total;
    if (tabPendingCount) tabPendingCount.textContent = pending;
    if (tabAcceptedCount) tabAcceptedCount.textContent = accepted;
    if (tabDeclinedCount) tabDeclinedCount.textContent = declined;
}

// 4. RENDER SUBMISSIONS
function renderSubmissions() {
    submissionList.innerHTML = "";

    const filtered = allSubmissions.filter(s => {
        const status = s.status || "Pending";
        if (currentFilter === "All") return true;
        return status.toLowerCase() === currentFilter.toLowerCase();
    });

    if (filtered.length === 0) {
        submissionList.innerHTML = `
            <div class="empty-message">
                <p>No submissions found under "${currentFilter}".</p>
            </div>
        `;
        return;
    }

    filtered.forEach(submission => {
        const status = submission.status || "Pending";
        const statusLower = status.toLowerCase();
        const dateFormatted = submission.created_at ? new Date(submission.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) : 'Recent';

        const card = document.createElement("article");
        card.className = "submission-card";

        const authorInitial = (submission.author_name || "A").charAt(0).toUpperCase();

        card.innerHTML = `
            <div class="card-top">
                <div class="author-meta">
                    <div class="author-avatar">${authorInitial}</div>
                    <div class="author-info">
                        <strong>${escapeHtml(submission.author_name || "Unknown Author")}</strong>
                        <span>Submitted on ${dateFormatted}</span>
                    </div>
                </div>
                <span class="category-pill">${escapeHtml(submission.category || "Story")}</span>
            </div>

            <h3 class="submission-title">${escapeHtml(submission.title || "Untitled")}</h3>

            <div class="content-box">${escapeHtml(submission.content || "")}</div>

            <div class="card-footer">
                <span class="status-badge ${statusLower}">● ${status}</span>
                <div class="action-buttons" id="actions-${submission.id}"></div>
            </div>
        `;

        const actionsContainer = card.querySelector(`#actions-${submission.id}`);

        if (status === "Pending") {
            const acceptBtn = document.createElement("button");
            acceptBtn.className = "btn-accept";
            acceptBtn.innerHTML = "✓ Accept";
            acceptBtn.addEventListener("click", () => updateStatus(submission.id, "Accepted"));

            const declineBtn = document.createElement("button");
            declineBtn.className = "btn-decline";
            declineBtn.innerHTML = "✕ Decline";
            declineBtn.addEventListener("click", () => updateStatus(submission.id, "Declined"));

            actionsContainer.append(acceptBtn, declineBtn);
        } else {
            const resetBtn = document.createElement("button");
            resetBtn.className = "btn-reset";
            resetBtn.textContent = "↺ Re-evaluate (Pending)";
            resetBtn.addEventListener("click", () => updateStatus(submission.id, "Pending"));

            actionsContainer.appendChild(resetBtn);
        }

        submissionList.appendChild(card);
    });
}

// 5. UPDATE SUBMISSION STATUS
async function updateStatus(id, newStatus) {
    const client = getClient();
    if (!client) return;

    try {
        const { error } = await client
            .from("submissions")
            .update({ status: newStatus })
            .eq("id", id);

        if (error) {
            console.error("Update error:", error);
            alert("Could not update submission: " + error.message);
            return;
        }

        // Update local array for instantaneous feedback
        const target = allSubmissions.find(s => s.id === id);
        if (target) {
            target.status = newStatus;
            updateMetrics();
            renderSubmissions();
        }
    } catch (e) {
        console.error("Status update exception:", e);
    }
}

// 6. FILTER TAB HANDLERS
tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.status || "All";
        renderSubmissions();
    });
});

// 7. LOGOUT HANDLER
if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener("click", async () => {
        const client = getClient();
        if (client) {
            await client.auth.signOut();
            window.location.href = "../login.html";
        }
    });
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// INITIALIZE
document.addEventListener("DOMContentLoaded", async () => {
    const adminUser = await verifyAdmin();
    if (adminUser) {
        loadSubmissions();
    }
});
