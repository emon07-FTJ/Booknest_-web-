const SUPABASE_URL = "https://aecmmfuurbrnqhpphwyr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Z8BP_ly5j7yijV3gw9Xweg_udqVoFlU";

if (typeof window.supabase !== "undefined") {
    window.supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
} else {
    console.error("Supabase CDN not loaded. Please ensure an active internet connection.");
}

// Configured Administrator Accounts
window.ADMIN_EMAILS = [
    "admin@booknest.com",
    "admin@gmail.com"
];

window.isAdminEmail = function (email) {
    if (!email) return false;
    const clean = String(email).trim().toLowerCase();
    return window.ADMIN_EMAILS.some(adm => adm.toLowerCase() === clean);
};

window.isAdminUser = function (user) {
    if (!user || !user.email) return false;
    return window.isAdminEmail(user.email);
};
