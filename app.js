(function () {
  "use strict";

  const DATA = window.CENTRAL_STORE_DATA;
  if (!DATA) return;

  // =========================================================================
  // State
  // =========================================================================
  const state = {
    activeMood: "hazy",
    activeTab: "drafts", // 'drafts' | 'cooler' | 'spirits' | 'zeroproof'
    activeCategory: "All",
    searchQuery: "",
    sortBy: "default",
    galleryCategory: "All",
    lightboxIndex: 0,
    filteredGallery: [...DATA.gallery],
    activeSuite: "store", // 'store' | 'craft'
    wishlist: loadWishlist()
  };

  function loadWishlist() {
    try {
      const raw = localStorage.getItem("centralStoreMolineWishlist");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveWishlist() {
    try {
      localStorage.setItem("centralStoreMolineWishlist", JSON.stringify(state.wishlist));
    } catch {
      // Ignore storage quota errors
    }
  }

  // =========================================================================
  // Helpers
  // =========================================================================
  function esc(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  let toastTimer = null;
  function showToast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2600);
  }

  function isSaved(id) {
    return state.wishlist.some((w) => w.id === id);
  }

  function abvPercentWidth(abv) {
    const val = Number(abv) || 0;
    return Math.min(100, Math.max(14, Math.round((val / 17) * 100)));
  }

  // =========================================================================
  // Live Moline (America/Chicago) Open/Closed Status & Hours Table
  // =========================================================================
  function getMolineNow() {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false
    }).formatToParts(now);

    const map = {};
    parts.forEach((p) => { map[p.type] = p.value; });
    const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const day = dayMap[map.weekday] ?? now.getDay();
    const hour = Number(map.hour === "24" ? 0 : map.hour);
    const minute = Number(map.minute || 0);
    return { day, decimalHour: hour + minute / 60 };
  }

  function renderHoursAndStatus() {
    const { day, decimalHour } = getMolineNow();
    const todayRule = DATA.hours.find((h) => h.day === day);
    const prevDay = (day + 6) % 7;
    const prevRule = DATA.hours.find((h) => h.day === prevDay);

    let isOpen = false;
    let statusText = "Closed";

    if (prevRule && prevRule.close > 24 && decimalHour < (prevRule.close - 24)) {
      isOpen = true;
      statusText = "Open Now · Until 1:00 AM";
    } else if (todayRule && decimalHour >= todayRule.open && decimalHour < todayRule.close) {
      isOpen = true;
      const closeLabel = todayRule.close === 25 ? "1:00 AM" : "Midnight";
      statusText = `Open Now · Until ${closeLabel}`;
    } else if (todayRule) {
      statusText = `Closed · Opens ${todayRule.open}:00 AM`;
    }

    document.querySelectorAll("[data-live-status]").forEach((badge) => {
      badge.classList.toggle("live-status--closed", !isOpen);
      const label = badge.querySelector("[data-live-status-text]");
      if (label) label.textContent = statusText;
    });

    const hoursList = document.getElementById("hours-list");
    if (hoursList) {
      hoursList.innerHTML = DATA.hours
        .map((h) => {
          const isToday = h.day === day;
          return `
            <li class="hours-row ${isToday ? "is-today" : ""}">
              <span>${esc(h.label)}${isToday ? " (Today)" : ""}</span>
              <span class="hours-row__time">${esc(h.display)}</span>
            </li>
          `;
        })
        .join("");
    }
  }

  // =========================================================================
  // Brewery Marquee
  // =========================================================================
  function renderMarquee() {
    const track = document.getElementById("brewery-marquee");
    if (!track) return;
    const itemsHtml = DATA.breweries
      .map((b) => `<span class="marquee__item">${esc(b)}</span>`)
      .join("");
    track.innerHTML = itemsHtml + itemsHtml;
  }

  // =========================================================================
  // Interactive "Find Your Pour" Mood Matcher
  // =========================================================================
  function renderPourFinder() {
    const pillsWrap = document.getElementById("mood-pills");
    const summaryEl = document.getElementById("mood-summary");
    const picksEl = document.getElementById("mood-picks");
    if (!pillsWrap || !summaryEl || !picksEl || !DATA.pourMoods) return;

    pillsWrap.innerHTML = DATA.pourMoods
      .map(
        (m) => `
          <button
            type="button"
            class="mood-pill ${state.activeMood === m.id ? "is-active" : ""}"
            data-mood-id="${esc(m.id)}"
            aria-pressed="${state.activeMood === m.id}"
          >
            <span>${esc(m.label)}</span>
            <span class="mood-pill__tag">${esc(m.tag)}</span>
          </button>
        `
      )
      .join("");

    const mood = DATA.pourMoods.find((m) => m.id === state.activeMood) || DATA.pourMoods[0];
    summaryEl.textContent = mood.summary;

    picksEl.innerHTML = mood.picks
      .map((p) => {
        const saved = isSaved(p.id);
        return `
          <article class="mood-pick-card">
            <div>
              <span class="mood-pick-card__where">${esc(p.where)}</span>
              <h4>${esc(p.name)}</h4>
              <p class="mood-pick-card__maker">${esc(p.maker)}</p>
              <p class="mood-pick-card__note">${esc(p.note)}</p>
            </div>
            <div class="mood-pick-card__foot">
              <span>${esc(p.spec)}</span>
              <button
                type="button"
                class="save-btn save-btn--dark ${saved ? "is-saved" : ""}"
                data-save-id="${esc(p.id)}"
                aria-pressed="${saved}"
              >
                ${saved ? "✓ Saved" : "+ List"}
              </button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  // =========================================================================
  // Interactive Craft Beer, Cooler, Bourbon & Zero-Proof Board
  // =========================================================================
  function getActiveItems() {
    if (state.activeTab === "drafts") return DATA.drafts;
    if (state.activeTab === "cooler") return DATA.cooler;
    if (state.activeTab === "spirits") return DATA.spirits;
    return DATA.zeroproof;
  }

  function renderFilterChips() {
    const container = document.getElementById("board-filter-chips");
    if (!container) return;
    const items = getActiveItems();
    const cats = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
    if (!cats.includes(state.activeCategory)) {
      state.activeCategory = "All";
    }
    container.innerHTML = cats
      .map(
        (cat) => `
          <button
            type="button"
            class="chip ${state.activeCategory === cat ? "is-active" : ""}"
            data-board-cat="${esc(cat)}"
          >
            ${esc(cat)}
          </button>
        `
      )
      .join("");
  }

  function renderSortOptions() {
    const select = document.getElementById("board-sort");
    if (!select) return;
    if (state.activeTab === "drafts") {
      select.innerHTML = `
        <option value="default">Sort: Highest Untappd</option>
        <option value="abv-desc">ABV: High → Low</option>
        <option value="abv-asc">ABV: Low → High</option>
        <option value="price-asc">Price: Low → High</option>
      `;
    } else if (state.activeTab === "cooler") {
      select.innerHTML = `
        <option value="default">Sort: Featured Drops</option>
        <option value="abv-desc">ABV: High → Low</option>
        <option value="abv-asc">ABV: Low → High</option>
        <option value="name-asc">Name: A → Z</option>
      `;
    } else if (state.activeTab === "spirits") {
      select.innerHTML = `
        <option value="default">Sort: Featured Pours</option>
        <option value="price-asc">Price / oz: Low → High</option>
        <option value="name-asc">Name: A → Z</option>
      `;
    } else {
      select.innerHTML = `
        <option value="default">Sort: Featured Lineup</option>
        <option value="name-asc">Name: A → Z</option>
      `;
    }
    select.value = state.sortBy;
  }

  function renderBoard() {
    const grid = document.getElementById("beer-grid");
    const countLabel = document.getElementById("board-result-count");
    if (!grid) return;

    const q = state.searchQuery.trim().toLowerCase();
    let list = getActiveItems().filter((item) => {
      const matchesCat = state.activeCategory === "All" || item.category === state.activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      const hay = `${item.name} ${item.brewery || item.distillery || ""} ${item.style || ""} ${item.notes || ""} ${item.strength || ""} ${item.category}`.toLowerCase();
      return hay.includes(q);
    });

    if (state.sortBy === "abv-desc") {
      list = [...list].sort((a, b) => (b.abv || 0) - (a.abv || 0));
    } else if (state.sortBy === "abv-asc") {
      list = [...list].sort((a, b) => (a.abv || 0) - (b.abv || 0));
    } else if (state.sortBy === "price-asc") {
      list = [...list].sort((a, b) => (a.priceNum || 999) - (b.priceNum || 999));
    } else if (state.sortBy === "name-asc") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (countLabel) {
      const tabName =
        state.activeTab === "drafts"
          ? "draft pours at Central Craft (Suite F)"
          : state.activeTab === "cooler"
            ? "featured cooler drops (304+ cold cans in Suite D)"
            : state.activeTab === "spirits"
              ? "bourbon & whiskey selections"
              : "zero-proof & 21+ hemp-infused lines in Suite D";
      countLabel.textContent = `Showing ${list.length} ${tabName}`;
    }

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="beer-card" style="grid-column: 1 / -1; align-items: center; text-align: center; padding: 2.2rem;">
          <p style="margin:0; font-weight:700;">No matches found for "${esc(state.searchQuery)}"</p>
          <p style="margin:0.35rem 0 1rem; color:var(--text-dark-muted); font-size:0.9rem;">Try clearing your search or switching tabs between Drafts, Cooler, Bourbon, and Zero-Proof.</p>
          <button type="button" class="btn btn--dark btn--sm" id="reset-board-filters">Reset Filters</button>
        </div>
      `;
      return;
    }

    if (state.activeTab === "drafts") {
      grid.innerHTML = list
        .map((item) => {
          const saved = isSaved(item.id);
          return `
            <article class="beer-card">
              <div>
                <div class="beer-card__top">
                  <span class="tap-pill ${item.highlight ? "tap-pill--highlight" : ""}">
                    TAP #${String(item.tap).padStart(2, "0")}${item.highlight ? ` · ${esc(item.highlight)}` : ""}
                  </span>
                  <span class="rating-badge" title="Untappd Community Rating">★ ${item.rating.toFixed(2)}</span>
                </div>
                <h3 class="beer-card__name">${esc(item.name)}</h3>
                <p class="beer-card__brewery">${esc(item.brewery)}</p>
                <p class="beer-card__style">${esc(item.style)}</p>
                <div class="abv-meter" title="${item.abv.toFixed(1)}% ABV">
                  <div class="abv-meter__fill" style="width: ${abvPercentWidth(item.abv)}%;"></div>
                </div>
              </div>
              <div class="beer-card__footer">
                <div class="beer-card__specs">
                  <span>${item.abv.toFixed(1)}% ABV</span>
                  <span class="beer-card__price">${esc(item.price)}</span>
                </div>
                <button
                  type="button"
                  class="save-btn ${saved ? "is-saved" : ""}"
                  data-save-id="${esc(item.id)}"
                  aria-pressed="${saved}"
                >
                  ${saved ? "✓ Saved" : "+ List"}
                </button>
              </div>
            </article>
          `;
        })
        .join("");
    } else if (state.activeTab === "cooler") {
      grid.innerHTML = list
        .map((item) => {
          const saved = isSaved(item.id);
          return `
            <article class="beer-card">
              <div>
                <div class="beer-card__top">
                  <span class="tap-pill ${item.tag ? "tap-pill--highlight" : ""}">
                    ${esc(item.tag || item.category)}
                  </span>
                  <span class="rating-badge">${item.abv.toFixed(1)}% ABV</span>
                </div>
                <h3 class="beer-card__name">${esc(item.name)}</h3>
                <p class="beer-card__brewery">${esc(item.brewery)}</p>
                <p class="beer-card__style">${esc(item.style)}</p>
                <div class="abv-meter" title="${item.abv.toFixed(1)}% ABV">
                  <div class="abv-meter__fill" style="width: ${abvPercentWidth(item.abv)}%;"></div>
                </div>
              </div>
              <div class="beer-card__footer">
                <div class="beer-card__specs">
                  <span>${esc(item.format)}</span>
                </div>
                <button
                  type="button"
                  class="save-btn ${saved ? "is-saved" : ""}"
                  data-save-id="${esc(item.id)}"
                  aria-pressed="${saved}"
                >
                  ${saved ? "✓ Saved" : "+ List"}
                </button>
              </div>
            </article>
          `;
        })
        .join("");
    } else if (state.activeTab === "spirits") {
      grid.innerHTML = list
        .map((item) => {
          const saved = isSaved(item.id);
          return `
            <article class="beer-card">
              <div>
                <div class="beer-card__top">
                  <span class="tap-pill ${item.highlight ? "tap-pill--highlight" : ""}">
                    ${esc(item.highlight || item.category)}
                  </span>
                  <span class="rating-badge">${esc(item.price)}</span>
                </div>
                <h3 class="beer-card__name">${esc(item.name)}</h3>
                <p class="beer-card__brewery">${esc(item.distillery)}</p>
                <p class="beer-card__style">${esc(item.notes)}</p>
              </div>
              <div class="beer-card__footer">
                <div class="beer-card__specs">
                  <span>${esc(item.category)}</span>
                </div>
                <button
                  type="button"
                  class="save-btn ${saved ? "is-saved" : ""}"
                  data-save-id="${esc(item.id)}"
                  aria-pressed="${saved}"
                >
                  ${saved ? "✓ Saved" : "+ List"}
                </button>
              </div>
            </article>
          `;
        })
        .join("");
    } else {
      grid.innerHTML = list
        .map((item) => {
          const saved = isSaved(item.id);
          return `
            <article class="beer-card">
              <div>
                <div class="beer-card__top">
                  <span class="tap-pill ${item.tag ? "tap-pill--highlight" : ""}">
                    ${esc(item.tag || item.category)}
                  </span>
                  <span class="rating-badge">${esc(item.strength)}</span>
                </div>
                <h3 class="beer-card__name">${esc(item.name)}</h3>
                <p class="beer-card__brewery">${esc(item.brewery)}</p>
                <p class="beer-card__style">${esc(item.style)}</p>
              </div>
              <div class="beer-card__footer">
                <div class="beer-card__specs">
                  <span>${esc(item.format)}</span>
                </div>
                <button
                  type="button"
                  class="save-btn ${saved ? "is-saved" : ""}"
                  data-save-id="${esc(item.id)}"
                  aria-pressed="${saved}"
                >
                  ${saved ? "✓ Saved" : "+ List"}
                </button>
              </div>
            </article>
          `;
        })
        .join("");
    }
  }

  function toggleWishlistItem(id) {
    const existingIdx = state.wishlist.findIndex((item) => item.id === id);
    if (existingIdx >= 0) {
      const removed = state.wishlist.splice(existingIdx, 1)[0];
      showToast(`Removed "${removed.name}" from your list`);
    } else {
      const allItems = [
        ...DATA.drafts.map((d) => ({ id: d.id, name: d.name, sub: `${d.brewery} · Draft (${d.price})` })),
        ...DATA.cooler.map((c) => ({ id: c.id, name: c.name, sub: `${c.brewery} · Cooler (${c.abv}% ABV)` })),
        ...DATA.spirits.map((s) => ({ id: s.id, name: s.name, sub: `${s.distillery} · ${s.price}` })),
        ...DATA.zeroproof.map((z) => ({ id: z.id, name: z.name, sub: `${z.brewery} · ${z.strength}` }))
      ];
      const found = allItems.find((i) => i.id === id);
      if (found) {
        state.wishlist.push(found);
        showToast(`Added "${found.name}" to your visit list`);
      }
    }
    saveWishlist();
    renderBoard();
    renderPourFinder();
    renderWishlistUI();
  }

  function renderWishlistUI() {
    const fab = document.getElementById("wishlist-fab");
    const fabCount = document.getElementById("wishlist-count");
    const listEl = document.getElementById("drawer-list");

    if (fab && fabCount) {
      fabCount.textContent = String(state.wishlist.length);
      fab.hidden = state.wishlist.length === 0;
    }

    if (listEl) {
      if (state.wishlist.length === 0) {
        listEl.innerHTML = `<p style="color:var(--text-light-muted); font-size:0.9rem;">Your visit & tasting list is empty. Tap <strong>+ List</strong> on any draft beer, cooler drop, bourbon pour, or zero-proof pick to build your lineup before heading to 5th Ave.</p>`;
      } else {
        listEl.innerHTML = state.wishlist
          .map(
            (item) => `
              <div class="drawer-item">
                <div>
                  <h4>${esc(item.name)}</h4>
                  <p>${esc(item.sub)}</p>
                </div>
                <button
                  type="button"
                  class="icon-btn"
                  data-remove-wish="${esc(item.id)}"
                  aria-label="Remove ${esc(item.name)}"
                >&times;</button>
              </div>
            `
          )
          .join("");
      }
    }
  }

  // =========================================================================
  // Videos & Facebook Reels Showcase + Modal Player
  // =========================================================================
  function renderReels() {
    const grid = document.getElementById("reels-grid");
    if (!grid) return;

    grid.innerHTML = DATA.reels
      .map(
        (reel) => `
          <button type="button" class="reel-card" data-reel-id="${esc(reel.id)}">
            <div class="reel-card__thumb">
              <img src="${esc(reel.thumbnail)}" alt="${esc(reel.title)}" />
              <div class="reel-card__overlay">
                <span class="reel-play-btn" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v14l11-7-11-7z"/>
                  </svg>
                </span>
              </div>
              <div class="reel-card__badges">
                <span class="reel-pill reel-pill--amber">${esc(reel.badge)}</span>
                <span class="reel-pill">${esc(reel.views)}</span>
              </div>
            </div>
            <div class="reel-card__body">
              <h3>${esc(reel.title)}</h3>
              <p>${esc(reel.caption)}</p>
              <span class="reel-card__cta">
                Watch Facebook Reel
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </button>
        `
      )
      .join("");
  }

  function openReelModal(reelId) {
    const reel = DATA.reels.find((r) => r.id === reelId);
    const modal = document.getElementById("video-modal");
    if (!reel || !modal) return;

    document.getElementById("video-modal-title").textContent = reel.title;
    document.getElementById("video-modal-caption").textContent = reel.caption;
    document.getElementById("video-modal-fb-link").href = reel.url;

    const frameWrap = document.getElementById("video-modal-frame");
    frameWrap.innerHTML = `
      <iframe
        src="${esc(reel.embedUrl)}"
        title="${esc(reel.title)}"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;

    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeVideoModal() {
    const modal = document.getElementById("video-modal");
    if (!modal) return;
    modal.hidden = true;
    const frameWrap = document.getElementById("video-modal-frame");
    if (frameWrap) frameWrap.innerHTML = "";
    document.body.style.overflow = "";
  }

  // =========================================================================
  // Photo Gallery & Keyboard Lightbox
  // =========================================================================
  function renderGalleryFilters() {
    const wrap = document.getElementById("gallery-filters");
    if (!wrap) return;
    const cats = ["All", ...Array.from(new Set(DATA.gallery.map((g) => g.category)))];
    wrap.innerHTML = cats
      .map(
        (cat) => `
          <button
            type="button"
            class="chip ${state.galleryCategory === cat ? "is-active" : ""}"
            data-gallery-cat="${esc(cat)}"
          >
            ${esc(cat)}
          </button>
        `
      )
      .join("");
  }

  function renderGallery() {
    const grid = document.getElementById("gallery-grid");
    if (!grid) return;
    state.filteredGallery = DATA.gallery.filter(
      (g) => state.galleryCategory === "All" || g.category === state.galleryCategory
    );

    grid.innerHTML = state.filteredGallery
      .map(
        (photo, idx) => `
          <button type="button" class="gallery-card" data-photo-idx="${idx}">
            <div class="gallery-card__media">
              <img src="${esc(photo.src)}" alt="${esc(photo.title)}" loading="lazy" />
              <span class="gallery-card__cat">${esc(photo.category)}</span>
            </div>
            <div class="gallery-card__body">
              <h3>${esc(photo.title)}</h3>
              <p>${esc(photo.caption)}</p>
            </div>
          </button>
        `
      )
      .join("");
  }

  function openLightbox(idx) {
    const modal = document.getElementById("lightbox-modal");
    if (!modal || !state.filteredGallery.length) return;
    state.lightboxIndex = (idx + state.filteredGallery.length) % state.filteredGallery.length;
    const item = state.filteredGallery[state.lightboxIndex];

    document.getElementById("lightbox-title").textContent = item.title;
    const img = document.getElementById("lightbox-img");
    img.src = item.src;
    img.alt = item.title;
    document.getElementById("lightbox-caption").textContent = item.caption;
    document.getElementById("lightbox-counter").textContent =
      `${state.lightboxIndex + 1} / ${state.filteredGallery.length}`;

    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const modal = document.getElementById("lightbox-modal");
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  // =========================================================================
  // Suite Switcher in Visit Section
  // =========================================================================
  function renderSuiteFocus() {
    const descEl = document.getElementById("suite-focus-note");
    const callBtn = document.getElementById("suite-call-btn");
    document.querySelectorAll("[data-suite-switch]").forEach((btn) => {
      const active = btn.dataset.suiteSwitch === state.activeSuite;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    if (!descEl || !callBtn) return;
    if (state.activeSuite === "store") {
      descEl.textContent =
        "Suite D · Retail craft beer coolers (304+ cold), single-barrel bourbon bottles, hemp/zero-proof wall, Harvest Ridge coffee & downtown convenience essentials.";
      callBtn.href = DATA.business.phoneHref;
      callBtn.textContent = `Call Suite D · ${DATA.business.phone}`;
    } else {
      descEl.textContent =
        "Suite F (Right Next Door) · Boutique craft beer taproom & whiskey lounge with 16+ rotating drafts and 24+ allocated bourbon pours priced fairly by the ounce.";
      callBtn.href = DATA.business.craftPhoneHref;
      callBtn.textContent = `Call Suite F · ${DATA.business.craftPhone}`;
    }
  }

  // =========================================================================
  // Special Bottle Request / Drop Desk
  // =========================================================================
  function buildRequestPayload() {
    const topic = document.getElementById("req-topic")?.value || "Check Bottle Availability";
    const name = document.getElementById("req-name")?.value.trim() || "Quad Cities Customer";
    const phone = document.getElementById("req-phone")?.value.trim() || "Not provided";
    const note = document.getElementById("req-note")?.value.trim() || "";
    const subject = `[Central Store Moline] ${topic} — ${name}`;
    const body = [
      `Hi Hong & Central Store Team,`,
      ``,
      `Topic: ${topic}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      ``,
      `Request / Message:`,
      note || "(Checking availability on a craft beer or bourbon release)",
      ``,
      `Sent from Central Store Moline Website`
    ].join("\n");
    return { subject, body, note };
  }

  // =========================================================================
  // Scroll Reveal & Active Nav Scrollspy
  // =========================================================================
  function initScrollEffects() {
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
      );
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("is-visible"));
    }

    const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
    const sections = navLinks
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = `#${entry.target.id}`;
              navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
            }
          });
        },
        { rootMargin: "-30% 0px -55% 0px" }
      );
      sections.forEach((s) => spy.observe(s));
    }
  }

  // =========================================================================
  // Event Wiring
  // =========================================================================
  function bindEvents() {
    // Find Your Pour Mood Switcher
    document.getElementById("mood-pills")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-mood-id]");
      if (!btn) return;
      state.activeMood = btn.dataset.moodId;
      renderPourFinder();
    });

    document.getElementById("mood-picks")?.addEventListener("click", (e) => {
      const saveBtn = e.target.closest("[data-save-id]");
      if (saveBtn) toggleWishlistItem(saveBtn.dataset.saveId);
    });

    // Menu Tabs
    document.querySelectorAll("[data-board-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeTab = btn.dataset.boardTab;
        state.activeCategory = "All";
        state.sortBy = "default";
        document.querySelectorAll("[data-board-tab]").forEach((b) => {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-selected", String(b === btn));
        });
        renderFilterChips();
        renderSortOptions();
        renderBoard();
      });
    });

    // Category filter delegation
    document.getElementById("board-filter-chips")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-board-cat]");
      if (!btn) return;
      state.activeCategory = btn.dataset.boardCat;
      renderFilterChips();
      renderBoard();
    });

    // Search & Sort
    document.getElementById("board-search")?.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderBoard();
    });
    document.getElementById("board-sort")?.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderBoard();
    });

    // Board grid actions
    document.getElementById("beer-grid")?.addEventListener("click", (e) => {
      const saveBtn = e.target.closest("[data-save-id]");
      if (saveBtn) {
        toggleWishlistItem(saveBtn.dataset.saveId);
        return;
      }
      if (e.target.closest("#reset-board-filters")) {
        state.searchQuery = "";
        state.activeCategory = "All";
        const input = document.getElementById("board-search");
        if (input) input.value = "";
        renderFilterChips();
        renderBoard();
      }
    });

    // Wishlist Drawer
    const drawerBackdrop = document.getElementById("drawer-backdrop");
    document.getElementById("wishlist-fab")?.addEventListener("click", () => {
      if (drawerBackdrop) {
        document.getElementById("toast")?.classList.remove("is-visible");
        drawerBackdrop.hidden = false;
        document.body.style.overflow = "hidden";
      }
    });
    document.getElementById("drawer-close")?.addEventListener("click", () => {
      if (drawerBackdrop) {
        drawerBackdrop.hidden = true;
        document.body.style.overflow = "";
      }
    });
    drawerBackdrop?.addEventListener("click", (e) => {
      if (e.target === drawerBackdrop) {
        drawerBackdrop.hidden = true;
        document.body.style.overflow = "";
      }
    });
    document.getElementById("drawer-list")?.addEventListener("click", (e) => {
      const rem = e.target.closest("[data-remove-wish]");
      if (rem) toggleWishlistItem(rem.dataset.removeWish);
    });
    document.getElementById("drawer-clear")?.addEventListener("click", () => {
      state.wishlist = [];
      saveWishlist();
      renderBoard();
      renderPourFinder();
      renderWishlistUI();
      showToast("Visit list cleared");
    });
    document.getElementById("drawer-copy")?.addEventListener("click", async () => {
      if (!state.wishlist.length) return;
      const text =
        "My Central Store Moline List (1810 5th Ave, Suite D & F):\n" +
        state.wishlist.map((w, i) => `${i + 1}. ${w.name} — ${w.sub}`).join("\n");
      try {
        await navigator.clipboard.writeText(text);
        showToast("List copied! Ready to share or bring in-store.");
      } catch {
        showToast("Copy unavailable in this browser.");
      }
    });

    // Special Bottle Request Form
    document.getElementById("request-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const { subject, body, note } = buildRequestPayload();
      if (!note) {
        showToast("Tell us which beer, bourbon, or keg you're looking for!");
        document.getElementById("req-note")?.focus();
        return;
      }
      const mailto = `mailto:${DATA.business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      showToast("Opening email draft to centralstorellc@gmail.com");
    });

    document.getElementById("req-copy-btn")?.addEventListener("click", async () => {
      const { body } = buildRequestPayload();
      try {
        await navigator.clipboard.writeText(body);
        showToast("Inquiry copied! Call (309) 524-4054 or paste in Messenger.");
      } catch {
        showToast("Call Central Store directly at (309) 524-4054.");
      }
    });

    // Suite Switcher & Share Link
    document.querySelectorAll("[data-suite-switch]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeSuite = btn.dataset.suiteSwitch;
        renderSuiteFocus();
      });
    });

    document.getElementById("share-site-btn")?.addEventListener("click", async () => {
      const url = window.location.href.split("#")[0];
      try {
        if (navigator.share) {
          await navigator.share({
            title: "Central Store & Central Craft — Downtown Moline, IL",
            text: "Check out Central Store & Central Craft in Downtown Moline (1810 5th Ave) — 320+ craft beers, exclusive bourbons, and store reels!",
            url
          });
        } else {
          await navigator.clipboard.writeText(url);
          showToast("Website link copied! Ready to text or share.");
        }
      } catch {
        // User canceled native share
      }
    });

    // Reels
    document.getElementById("reels-grid")?.addEventListener("click", (e) => {
      const card = e.target.closest("[data-reel-id]");
      if (card) openReelModal(card.dataset.reelId);
    });
    document.getElementById("video-modal-close")?.addEventListener("click", closeVideoModal);
    document.getElementById("video-modal")?.addEventListener("click", (e) => {
      if (e.target.id === "video-modal") closeVideoModal();
    });

    // Gallery
    document.getElementById("gallery-filters")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-gallery-cat]");
      if (!btn) return;
      state.galleryCategory = btn.dataset.galleryCat;
      renderGalleryFilters();
      renderGallery();
    });
    document.getElementById("gallery-grid")?.addEventListener("click", (e) => {
      const card = e.target.closest("[data-photo-idx]");
      if (card) openLightbox(Number(card.dataset.photoIdx));
    });
    document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);
    document.getElementById("lightbox-prev")?.addEventListener("click", () => openLightbox(state.lightboxIndex - 1));
    document.getElementById("lightbox-next")?.addEventListener("click", () => openLightbox(state.lightboxIndex + 1));
    document.getElementById("lightbox-modal")?.addEventListener("click", (e) => {
      if (e.target.id === "lightbox-modal") closeLightbox();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      const lb = document.getElementById("lightbox-modal");
      const vm = document.getElementById("video-modal");
      if (lb && !lb.hidden) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") openLightbox(state.lightboxIndex - 1);
        if (e.key === "ArrowRight") openLightbox(state.lightboxIndex + 1);
      } else if (vm && !vm.hidden) {
        if (e.key === "Escape") closeVideoModal();
      } else if (drawerBackdrop && !drawerBackdrop.hidden && e.key === "Escape") {
        drawerBackdrop.hidden = true;
        document.body.style.overflow = "";
      }
    });

    // Mobile Nav Toggle
    const toggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    function setMobileNav(open) {
      if (!mobileNav) return;
      mobileNav.classList.toggle("is-open", open);
      toggle?.setAttribute("aria-expanded", String(open));
      if (open) {
        const headerRect = document.querySelector(".site-header")?.getBoundingClientRect();
        mobileNav.style.top = `${Math.max(0, Math.round(headerRect ? headerRect.bottom : 74))}px`;
      }
      document.body.style.overflow = open ? "hidden" : "";
    }
    toggle?.addEventListener("click", () => {
      setMobileNav(!mobileNav.classList.contains("is-open"));
    });
    mobileNav?.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setMobileNav(false));
    });
  }

  // =========================================================================
  // Boot
  // =========================================================================
  renderHoursAndStatus();
  renderMarquee();
  renderPourFinder();
  renderFilterChips();
  renderSortOptions();
  renderBoard();
  renderReels();
  renderGalleryFilters();
  renderGallery();
  renderSuiteFocus();
  renderWishlistUI();
  bindEvents();
  initScrollEffects();

  setInterval(renderHoursAndStatus, 60000);
})();
