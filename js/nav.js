// ==========================================
// CARDHUB - SHARED SIDEBAR NAVIGATION
// ==========================================

(function () {

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const navigationItems = [
        {
            name: "Dashboard",
            icon: "▦",
            link: "dashboard.html"
        },
        {
            name: "Cards",
            icon: "▱",
            link: "cards.html"
        },
        {
            name: "Transactions",
            icon: "⇄",
            link: "transactions.html"
        },
        {
            name: "Explore",
            icon: "◎",
            link: "explore.html"
        }
    ];

    const sidebar = document.createElement("aside");

    sidebar.className = "cardhub-sidebar";

    sidebar.innerHTML = `

        <div class="sidebar-brand">
            <div class="sidebar-logo">▱</div>
            <span>CardHub</span>
        </div>

        <div class="sidebar-section-title">
            WORKSPACE
        </div>

        <nav class="sidebar-navigation">

            ${navigationItems.map(item => `
                <a
                    href="${item.link}"
                    class="sidebar-link ${
                        currentPage === item.link ? "active" : ""
                    }"
                >
                    <span class="sidebar-icon">${item.icon}</span>
                    <span>${item.name}</span>
                </a>
            `).join("")}

        </nav>

        <a href="profile.html" class="sidebar-profile">

            <div class="profile-avatar">CH</div>

            <div class="profile-details">
                <strong>My CardHub</strong>
                <span>Personal account</span>
            </div>

        </a>

    `;

    document.body.prepend(sidebar);

})();
