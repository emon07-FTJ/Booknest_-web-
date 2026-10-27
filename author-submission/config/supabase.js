const SUPABASE_URL = "https://aecmmfuurbrnqhpphwyr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Z8BP_ly5j7yijV3gw9Xweg_udqVoFlU";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);