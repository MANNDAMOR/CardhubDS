// CardHub - Login Screen + Supabase Auth

const SUPABASE_URL = "https://wrsqhsuktqldnyjrbuma.supabase.co";
const SUPABASE_KEY = "sb_publishable_1-wC9ij9iOkR0txvg6j5bA_i1XLPSj7";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const loginForm = document.getElementById("loginForm");
const showPassword = document.getElementById("showPassword");
const passwordInput = document.getElementById("password");
const registerButton = document.getElementById("registerButton");
const googleLoginButton = document.getElementById("googleLoginButton");
const guestDemoButton = document.getElementById("guestDemoButton");

// Show or hide the password
if (showPassword && passwordInput) {
    showPassword.addEventListener("click", () => {
        const showingPassword = passwordInput.type === "password";
        passwordInput.type = showingPassword ? "text" : "password";
        showPassword.textContent = showingPassword ? "Hide" : "Show";
    });
}

// Email and password login
if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const emailInput = document.getElementById("email");

        if (!emailInput || !passwordInput) {
            alert("The email or password field could not be found.");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        try {
            const { error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            // A real account login should not stay in guest mode.
            sessionStorage.removeItem("cardhub_guest_mode");
            window.location.href = "dashboard.html";
        } catch (error) {
            console.error("Email login error:", error);
            alert(error.message || "Could not log in. Please try again.");
        }
    });
}

// Continue with Google
if (googleLoginButton) {
    googleLoginButton.addEventListener("click", async () => {
        try {
            sessionStorage.removeItem("cardhub_guest_mode");

            const { error } = await supabaseClient.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: window.location.origin + "/dashboard.html"
                }
            });

            if (error) throw error;
        } catch (error) {
            console.error("Google login error:", error);
            alert(error.message || "Could not start Google login.");
        }
    });
}

// Explore with demo data
if (guestDemoButton) {
    guestDemoButton.addEventListener("click", () => {
        sessionStorage.setItem("cardhub_guest_mode", "true");
        window.location.href = "dashboard.html?guest=1";
    });
}

// Create account
if (registerButton) {
    registerButton.addEventListener("click", () => {
        sessionStorage.removeItem("cardhub_guest_mode");
        window.location.href = "register.html";
    });
}
