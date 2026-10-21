// CardHub - Login Screen + Supabase Auth

const SUPABASE_URL = "https://wrsqhsuktqldnyjrbuma.supabase.co";

// Put your Supabase Publishable/Anon key here
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


// ================================
// SHOW / HIDE PASSWORD
// ================================

if (showPassword && passwordInput) {
    showPassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            showPassword.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            showPassword.textContent = "Show";
        }

    });
}


// ================================
// EMAIL + PASSWORD LOGIN
// ================================

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const emailInput = document.getElementById("email");

        if (!emailInput) {
            alert("Email field not found.");
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

        const { error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {

            console.error("Email login error:", error);

            alert(error.message);

            return;
        }

        // Login successful
        window.location.href = "dashboard.html";

    });

}


// ================================
// CONTINUE WITH GOOGLE
// ================================

if (googleLoginButton) {

    googleLoginButton.addEventListener("click", async function () {

        console.log("Google login button clicked.");

        const { error } =
            await supabaseClient.auth.signInWithOAuth({

                provider: "google",

                options: {
                    redirectTo:
                        window.location.origin + '/CORE/dashboard.html'
                }

            });

        if (error) {

            console.error("Google login error:", error);

            alert(error.message);

        }

    });

} else {

    console.error("Google login button not found.");

}


// ================================
// CREATE ACCOUNT
// ================================

if (registerButton) {

    registerButton.addEventListener("click", function () {

        window.location.href = "register.html";

    });

}