/* CardHub shared left sidebar.
   Add this ONE line at the very end of <body> on every app page
   (after the Supabase <script> line):
       <script src="js/nav.js"></script>
   It hides each page's old menu and shows one common sidebar. */
(function () {

    var SUPABASE_URL = "https://wrsqhsuktqldnyjrbuma.supabase.co";
    var SUPABASE_KEY = "sb_publishable_1-wC9ij9iOkR0txvg6j5bA_i1XLPSj7";
    var TOKEN_KEY = "sb-wrsqhsuktqldnyjrbuma-auth-token";

    var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    var activeMap = {
        "dashboard.html": "dashboard",
        "cards.html": "cards",
        "card-details.html": "cards",
        "add-card.html": "cards",
        "edit-card.html": "cards",
        "transactions.html": "transactions",
        "add-transaction.html": "transactions",
        "edit-transaction.html": "transactions",
        "explore.html": "explore",
        "explore-card-details.html": "explore",
        "profile.html": "profile"
    };
    var active = activeMap[page] || "";

    var main = [
        ["dashboard", "dashboard.html", "▦", "Dashboard"],
        ["cards", "cards.html", "▱", "Cards"],
        ["transactions", "transactions.html", "⇄", "Transactions"],
        ["explore", "explore.html", "◎", "Explore"]
    ];

    var account = [
        ["profile", "profile.html", "⚙", "Settings & Profile"],
        ["add-card", "add-card.html", "⊕", "Add Card"],
        ["add-transaction", "add-transaction.html", "⊕", "Add Transaction"]
    ];

    function link(item) {
        var cls = item[0] === active ? ' class="chnav-active"' : "";
        return '<a href="' + item[1] + '"' + cls + '><span class="chnav-icon">' +
            item[2] + '</span><span>' + item[3] + '</span></a>';
    }

    /* Name of the logged-in user (read from the saved login, no extra request) */
    function getUserName() {
        try {
            var saved = JSON.parse(localStorage.getItem(TOKEN_KEY));
            var user = saved && (saved.user || (saved.currentSession && saved.currentSession.user));
            if (user) {
                var meta = user.user_metadata || {};
                return meta.full_name || meta.name ||
                    (user.email ? user.email.split("@")[0] : "") || "My CardHub";
            }
        } catch (e) {}
        return "My CardHub";
    }

    var css = [
        /* hide every old menu */
        "nav.bottom-navigation,.cardhub-sidebar,#cardhubSidebar,aside.sidebar,.sidebar,.desktop-sidebar,.sidebar-navigation,#cardhubSidebarToggle,.ch-mobile-menu,.menu-btn,.ch-sidebar-overlay,.mobile-overlay{display:none!important}",
        /* make room for the new sidebar */
        "html body{padding:0 0 0 250px!important;margin:0!important}",
        "html body main.dashboard,html body .main{margin-left:0!important;width:auto!important;max-width:none!important}",
        /* sidebar */
        "#chSidebar{position:fixed;inset:0 auto 0 0;width:250px;height:100vh;background:#191443;color:#e8e5ff;z-index:1000;padding:28px 18px 16px;display:flex;flex-direction:column;font-family:Inter,Arial,sans-serif;overflow-y:auto;box-sizing:border-box}",
        "#chSidebar .chnav-brand{display:flex;align-items:center;gap:12px;padding:0 12px 36px;font-size:23px;font-weight:800;color:#fff;letter-spacing:-.5px}",
        "#chSidebar .chnav-logo{width:42px;height:42px;border-radius:13px;background:linear-gradient(145deg,#9670ff,#5d31d7);display:grid;place-items:center;font-size:22px}",
        "#chSidebar .chnav-label{font-size:10px;font-weight:800;letter-spacing:2px;color:#aaa1e3;padding:0 12px 14px}",
        "#chSidebar .chnav-list{display:flex;flex-direction:column;gap:5px}",
        "#chSidebar a,#chSidebar button.chnav-logout{height:46px;display:flex;align-items:center;gap:14px;padding:0 14px;border-radius:12px;text-decoration:none;color:#d9d5f3;font-size:14px;font-weight:500;border:0;background:transparent;width:100%;font-family:inherit;cursor:pointer;text-align:left;box-sizing:border-box}",
        "#chSidebar a:hover,#chSidebar button.chnav-logout:hover{background:#ffffff12}",
        "#chSidebar a.chnav-active{background:#5b35d5;color:#fff;box-shadow:0 7px 20px #3e20a544}",
        "#chSidebar .chnav-icon{width:18px;text-align:center;font-size:19px;color:#c9c0ff}",
        "#chSidebar .chnav-account{margin-top:auto;padding-top:24px}",
        "#chSidebar .chnav-user{margin-top:14px;border-top:1px solid #ffffff18;padding:16px 10px 0;display:flex;align-items:center;gap:11px}",
        "#chSidebar .chnav-avatar{width:39px;height:39px;border-radius:50%;background:#e8ddff;color:#4c2bb4;display:grid;place-items:center;font-weight:800;flex-shrink:0}",
        "#chSidebar .chnav-user strong{display:block;font-size:13px;color:#fff}",
        "#chSidebar .chnav-user small{display:block;font-size:11px;color:#aaa1d8;margin-top:4px}",
        /* phone */
        "#chMenuBtn{display:none}",
        "#chOverlay{display:none}",
        "@media(max-width:760px){",
        "html body{padding-left:0!important}",
        "#chSidebar{width:230px;transform:translateX(-100%);transition:transform .2s}",
        "#chSidebar.chnav-open{transform:translateX(0)}",
        "#chOverlay.chnav-show{display:block;position:fixed;inset:0;background:#100b3577;z-index:999}",
        "#chMenuBtn{display:grid;place-items:center;position:fixed;top:12px;left:12px;z-index:998;width:42px;height:42px;border:1px solid #e1def1;border-radius:11px;background:#fff;font-size:20px;color:#191443;cursor:pointer}",
        "html body main.dashboard,html body .main{padding-top:64px!important}",
        "}"
    ].join("\n");

    var style = document.createElement("style");
    style.id = "cardhub-shared-nav-style";
    style.textContent = css;
    document.head.appendChild(style);

    var name = getUserName();
    var initials = name.split(/\s+/).filter(Boolean).slice(0, 2)
        .map(function (x) { return x[0]; }).join("").toUpperCase() || "C";

    var side = document.createElement("aside");
    side.id = "chSidebar";
    side.innerHTML =
        '<div class="chnav-brand"><span class="chnav-logo">▱</span><span>CardHub</span></div>' +
        '<div class="chnav-label">WORKSPACE</div>' +
        '<nav class="chnav-list">' + main.map(link).join("") + '</nav>' +
        '<div class="chnav-account">' +
        '<div class="chnav-label">ACCOUNT</div>' +
        '<div class="chnav-list">' + account.map(link).join("") +
        '<button type="button" class="chnav-logout" id="chLogout"><span class="chnav-icon">⎋</span><span>Log out</span></button>' +
        '</div>' +
        '<div class="chnav-user"><div class="chnav-avatar"></div><div><strong></strong><small>Personal account</small></div></div>' +
        '</div>';

    var overlay = document.createElement("div");
    overlay.id = "chOverlay";

    var menuBtn = document.createElement("button");
    menuBtn.id = "chMenuBtn";
    menuBtn.type = "button";
    menuBtn.setAttribute("aria-label", "Open menu");
    menuBtn.textContent = "☰";

    document.body.appendChild(side);
    document.body.appendChild(overlay);
    document.body.appendChild(menuBtn);

    side.querySelector(".chnav-avatar").textContent = initials;
    side.querySelector(".chnav-user strong").textContent = name;

    function openMenu() { side.classList.add("chnav-open"); overlay.classList.add("chnav-show"); }
    function closeMenu() { side.classList.remove("chnav-open"); overlay.classList.remove("chnav-show"); }
    menuBtn.addEventListener("click", openMenu);
    overlay.addEventListener("click", closeMenu);

    /* Log out */
    document.getElementById("chLogout").addEventListener("click", async function () {
        try {
            if (window.supabase) {
                var client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                await client.auth.signOut();
            }
        } catch (e) {
            console.error("Log out error:", e);
        }
        /* remove cards saved in this browser so the next person cannot see them */
        try { localStorage.removeItem("cardhubCards"); } catch (e) {}
        window.location.href = "index.html";
    });

})();
