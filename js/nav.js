(function () {
  const oldSidebar = document.querySelector(".cardhub-sidebar");
  if (oldSidebar) oldSidebar.remove();

  const currentPage = location.pathname.split("/").pop().toLowerCase();
  const items = [
    ["Dashboard", " 📊 ", "dashboard.html"],
    ["Cards", " 💳 ", "cards.html"],
    ["Transactions", " ⇄ ", "transactions.html"],
    ["Explore", " ◈ ", "explore.html"]
  ];

  const sidebar = document.createElement("aside");
  sidebar.className = "cardhub-sidebar";
  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <div class="sidebar-logo">▱</div>
      <span>CardHub</span>
      <button class="sidebar-toggle" type="button"
        aria-label="Expand sidebar" aria-expanded="true">‹</button>
    </div>
    <div class="sidebar-section-title">WORKSPACE</div>
    <nav class="sidebar-navigation">
      ${items.map(([name, icon, link]) => `
        <a href="${link}" class="sidebar-link ${currentPage === link ? "active" : ""}">
          <span class="sidebar-icon">${icon}</span>
          <span>${name}</span>
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

  const toggle = sidebar.querySelector(".sidebar-toggle");
  const mobile = window.matchMedia("(max-width: 800px)").matches;
  document.body.classList.toggle("ch-sidebar-collapsed", mobile);
  document.body.classList.toggle("ch-sidebar-expanded", !mobile);

  function updateToggle() {
    const collapsed = document.body.classList.contains("ch-sidebar-collapsed");
    sidebar.classList.toggle("is-collapsed", collapsed);
    toggle.textContent = collapsed ? "›" : "‹";
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
  }

  toggle.addEventListener("click", () => {
    const collapsed = document.body.classList.toggle("ch-sidebar-collapsed");
    document.body.classList.toggle("ch-sidebar-expanded", !collapsed);
    updateToggle();
  });

  updateToggle();
})();
