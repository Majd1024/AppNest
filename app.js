const apps = [

  /* =========================
     REAL APP 1
  ========================= */

  {
    enabled: true,
    id: "family-ring",
    name: "Family Ring",
    developer: "AppNest",
    description: "A private family utility app.",
    version: "1.0",
    size: "10.4 MB",
    rating: null,
    reviews: "0",
    category: "Tools",

    icon: "F",
    iconImage: "image/FamilyRing.png",

    color: "linear-gradient(135deg, #2878ff, #063b9b)",

    apk: "apk/FamilyRing.apk"
  },


  /* =========================
     REAL APP 2
  ========================= */

  {
    enabled: true,
    id: "berlin-mobil",
    name: "Berlin Mobil",
    developer: "AppNest",
    description: "Live U-Bahn, S-Bahn, bus and tram information for Berlin.",
    version: "1.0",
    size: "2.8 MB",
    rating: null,
    reviews: "0",
    category: "Travel",

    icon: "B",
    iconImage: "image/Berlin-Mobile.png",

    color: "linear-gradient(135deg, #f5d28c, #d5a832)",

    apk: "apk/Berlin Mobil.apk"
  },


  /* =========================
     EMPTY APP SLOT 1
  ========================= */

  {
    enabled: true,
    id: "sparkassi",
    name: "Sparkassi",
    developer: "AppNest",
    description: "A social networking app for Sparkassi users.",
    version: "1.0",
    size: "5.2 MB",
    rating: null,
    reviews: "0",
    category: "Banking",

    icon: "€",
    iconImage: "image/sparkassi.png",

    color: "linear-gradient(135deg, #f5d28c, #d5a832)",

    apk: "apk/Sparkassi.apk"
  },


  /* =========================
     EMPTY APP SLOT 2
  ========================= */

  {
    enabled: false,
    id: "",
    name: "",
    developer: "",
    description: "",
    version: "",
    size: "",
    rating: null,
    reviews: "",
    category: "",

    icon: "",
    iconImage: null,

    color: "",

    apk: ""
  },


  /* =========================
     EMPTY APP SLOT 3
  ========================= */

  {
    enabled: false,
    id: "",
    name: "",
    developer: "",
    description: "",
    version: "",
    size: "",
    rating: null,
    reviews: "",
    category: "",

    icon: "",
    iconImage: null,

    color: "",

    apk: ""
  }

];


const appContainer =
  document.getElementById("app");


/* =========================
   ENABLED APPS
========================= */

function getVisibleApps() {

  return apps.filter(
    app => app.enabled === true
  );

}


/* =========================
   APP ICON
========================= */

function renderAppIcon(app, extraClass = "") {

  if (app.iconImage) {

    return `
      <div
        class="app-icon image-icon ${extraClass}"
      >
        <img
          src="${app.iconImage}"
          alt="${app.name}"
        >
      </div>
    `;

  }


  return `
    <div
      class="app-icon ${extraClass}"
      style="background:${app.color}"
    >
      ${app.icon}
    </div>
  `;

}


/* =========================
   FEATURED APP ROTATION
========================= */

function chooseFeaturedApp() {

  const visibleApps =
    getVisibleApps();


  if (visibleApps.length === 0) {
    return null;
  }


  if (visibleApps.length === 1) {
    return visibleApps[0];
  }


  const lastFeaturedId =
    localStorage.getItem(
      "appnest-last-featured"
    );


  const lastIndex =
    visibleApps.findIndex(
      app => app.id === lastFeaturedId
    );


  let nextIndex =
    lastIndex + 1;


  if (
    lastIndex === -1 ||
    nextIndex >= visibleApps.length
  ) {

    nextIndex = 0;

  }


  const featuredApp =
    visibleApps[nextIndex];


  localStorage.setItem(
    "appnest-last-featured",
    featuredApp.id
  );


  return featuredApp;

}


const featuredApp =
  chooseFeaturedApp();


/* =========================
   HOME PAGE
========================= */

function renderHome(
  filteredApps = getVisibleApps()
) {

  appContainer.innerHTML = `

    <header class="top-bar">

      <div class="brand">

        <div class="store-logo">
          <img
            src="image/AppNest.png"
            alt="AppNest"
          >
        </div>

        <div class="brand-text">

          <h1>
            AppNest
          </h1>

          <p>
            Your private app store
          </p>

        </div>

      </div>


      <div class="top-actions">

        <button
          class="icon-button"
          onclick="toggleSearch()"
        >
          ⌕
        </button>

        <div class="profile">
          A
        </div>

      </div>

    </header>


    <div
      class="search-box"
      id="searchBox"
      style="display:none;"
    >

      <input
        id="searchInput"
        type="text"
        placeholder="Search apps..."
        oninput="searchApps(this.value)"
      >

    </div>


    ${
      featuredApp
        ? `

          <section class="page-section">

            <div class="section-title">

              <h2>
                Featured
              </h2>

            </div>


            <div
              class="featured-card"
              onclick="openApp('${featuredApp.id}')"
              role="button"
              tabindex="0"

              onkeydown="
                if (
                  event.key === 'Enter' ||
                  event.key === ' '
                ) {
                  event.preventDefault();
                  openApp('${featuredApp.id}');
                }
              "

              style="
                background:
                  radial-gradient(
                    circle at 85% 30%,
                    rgba(255,255,255,0.20) 0,
                    transparent 28%
                  ),
                  ${featuredApp.color};
              "
            >

              <div class="featured-top">

                ${
                  featuredApp.iconImage
                    ? `
                      <div class="featured-app-icon">

                        <img
                          src="${featuredApp.iconImage}"
                          alt="${featuredApp.name}"
                        >

                      </div>
                    `
                    : ""
                }

                <small>
                  FEATURED
                </small>

              </div>


              <h2>
                ${featuredApp.name}
              </h2>


              <p>
                ${featuredApp.description}
              </p>


              <div class="featured-meta">

                v${featuredApp.version}
                ·
                ${featuredApp.size}

              </div>


              <button
                class="featured-button"

                onclick="
                  event.stopPropagation();
                  openApp('${featuredApp.id}');
                "
              >
                View
              </button>

            </div>

          </section>

        `
        : ""
    }


    <section class="page-section">

      <div class="section-title">

        <h2>
          All Apps
        </h2>

        <button>
          Filter
        </button>

      </div>


      <div class="apps-list">

        ${
          filteredApps.map(app => `

            <div
              class="app-card"
              onclick="openApp('${app.id}')"
            >

              ${renderAppIcon(app)}


              <div class="app-info">

                <h3>
                  ${app.name}
                </h3>

                <p>
                  ${app.description}
                </p>

                <div class="app-meta">

                  v${app.version}

                  ·

                  ${app.size}

                  ${
                    app.rating
                      ? `· ★ ${app.rating}`
                      : `· New`
                  }

                </div>

              </div>


              <button
                class="view-button"

                onclick="
                  event.stopPropagation();
                  openApp('${app.id}');
                "
              >
                View
              </button>

            </div>

          `).join("")
        }

      </div>

    </section>
  `;


  setActiveNav("home");

}


/* =========================
   APP DETAIL PAGE
========================= */

function openApp(id) {

  const selectedApp =
    apps.find(
      app =>
        app.id === id &&
        app.enabled === true
    );


  if (!selectedApp) {
    return;
  }


  window.location.hash =
    `app=${selectedApp.id}`;


  appContainer.innerHTML = `

    <section class="detail-header">


      <div class="detail-nav">

        <button
          class="back-button"
          onclick="goHome()"
        >
          ←
        </button>


        <button class="icon-button">
          ⋮
        </button>

      </div>


      <div class="detail-app-header">

        ${renderAppIcon(selectedApp, "detail-real-icon")}


        <div class="detail-title">

          <h1>
            ${selectedApp.name}
          </h1>

          <p>
            ${selectedApp.developer}
          </p>

          <div class="trusted">
            ✓ Trusted
          </div>

        </div>

      </div>


      <div class="stats">


        <div class="stat">

          <strong>

            ${
              selectedApp.rating
                ? `★ ${selectedApp.rating}`
                : `New`
            }

          </strong>


          <span>

            ${
              selectedApp.rating
                ? `${selectedApp.reviews} reviews`
                : `Private app`
            }

          </span>

        </div>


        <div class="stat">

          <strong>
            ${selectedApp.size}
          </strong>

          <span>
            Size
          </span>

        </div>


        <div class="stat">

          <strong>
            ${selectedApp.category}
          </strong>

          <span>
            Category
          </span>

        </div>


        <div class="stat">

          <strong>
            3+
          </strong>

          <span>
            Rating
          </span>

        </div>


      </div>

    </section>


    <div class="action-buttons">

      ${
        selectedApp.apk
          ? `

            <button
              class="primary-button"
              onclick="downloadApp('${selectedApp.id}')"
            >
              Download
            </button>

          `
          : `

            <button
              class="primary-button"
              disabled
            >
              Coming soon
            </button>

          `
      }

    </div>


    <section class="page-section">

      <div class="section-title">

        <h2>
          Screenshots
        </h2>

      </div>


      <div class="screenshots">

        ${createScreenshot(
          "Home",
          "Main screen",
          "⌂"
        )}

        ${createScreenshot(
          "Features",
          "App features",
          "≡"
        )}

        ${createScreenshot(
          "Tools",
          "Useful tools",
          "◇"
        )}

        ${createScreenshot(
          "Settings",
          "App settings",
          "⚙"
        )}

      </div>

    </section>


    <section class="page-section">

      <div class="info-card">

        <h3>
          About this app
        </h3>

        <p>
          ${selectedApp.description}
        </p>

      </div>

    </section>


    <section class="page-section">

      <div class="info-card">

        <h3>
          What's new
        </h3>

        <p>
          Version ${selectedApp.version}
        </p>

        <br>

        <p>
          • First release
          <br>
          • Initial app features
          <br>
          • Private testing version
        </p>

      </div>

    </section>


    ${
      selectedApp.rating
        ? `

          <section class="page-section">

            <div class="section-title">

              <h2>
                Ratings & reviews
              </h2>

              <button>
                See all
              </button>

            </div>


            <div class="rating-box">

              <div>

                <div class="rating-number">
                  ${selectedApp.rating}
                </div>

                <div class="stars">
                  ★★★★★
                </div>

              </div>


              <div>

                <strong>
                  ${selectedApp.reviews} reviews
                </strong>

              </div>

            </div>

          </section>

        `
        : `

          <section class="page-section">

            <div class="info-card">

              <h3>
                Ratings & reviews
              </h3>

              <p>
                No reviews yet.
              </p>

            </div>

          </section>

        `
    }


    <section
      class="page-section"
      style="padding-bottom:30px;"
    >

      <div class="info-card">

        <h3>
          App info
        </h3>


        <p>

          <strong>
            Version:
          </strong>

          ${selectedApp.version}

        </p>


        <p>

          <strong>
            Size:
          </strong>

          ${selectedApp.size}

        </p>


        <p>

          <strong>
            Category:
          </strong>

          ${selectedApp.category}

        </p>

      </div>

    </section>
  `;

}


/* =========================
   APK DOWNLOAD
========================= */

function downloadApp(id) {

  const selectedApp =
    apps.find(
      app =>
        app.id === id &&
        app.enabled === true
    );


  if (!selectedApp) {
    return;
  }


  if (!selectedApp.apk) {
    return;
  }


  const link =
    document.createElement("a");


  link.href =
    selectedApp.apk;


  link.download =
    selectedApp.apk
      .split("/")
      .pop();


  document.body.appendChild(link);


  link.click();


  document.body.removeChild(link);

}


/* =========================
   SCREENSHOT PLACEHOLDERS
========================= */

function createScreenshot(
  title,
  subtitle,
  icon
) {

  return `

    <div class="screenshot">

      <div class="screenshot-title">
        ${title}
      </div>


      <div class="screenshot-subtitle">
        ${subtitle}
      </div>


      <div class="fake-phone-screen">
        ${icon}
      </div>

    </div>

  `;

}


/* =========================
   SEARCH
========================= */

function toggleSearch() {

  const searchBox =
    document.getElementById(
      "searchBox"
    );


  if (!searchBox) {
    return;
  }


  if (
    searchBox.style.display === "none"
  ) {

    searchBox.style.display =
      "block";


    document
      .getElementById(
        "searchInput"
      )
      .focus();

  } else {

    searchBox.style.display =
      "none";

  }

}


function searchApps(value) {

  const query =
    value
      .toLowerCase()
      .trim();


  const results =
    getVisibleApps().filter(app =>

      app.name
        .toLowerCase()
        .includes(query)

      ||

      app.description
        .toLowerCase()
        .includes(query)

    );


  renderHome(results);


  const searchBox =
    document.getElementById(
      "searchBox"
    );


  searchBox.style.display =
    "block";


  const input =
    document.getElementById(
      "searchInput"
    );


  input.value =
    value;


  input.focus();

}


/* =========================
   NAVIGATION
========================= */

function goHome() {

  window.location.hash =
    "";


  renderHome();

}


function setActiveNav(page) {

  document
    .querySelectorAll(
      ".nav-item"
    )
    .forEach(button => {

      button
        .classList
        .remove("active");


      if (
        button.dataset.page === page
      ) {

        button
          .classList
          .add("active");

      }

    });

}


document
  .querySelectorAll(
    ".nav-item"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        if (
          button.dataset.page ===
          "home"
        ) {

          goHome();

        }

      }
    );

  });


/* =========================
   START APP
========================= */

function loadPage() {

  const hash =
    window.location.hash;


  if (
    hash.startsWith("#app=")
  ) {

    const id =
      hash.replace(
        "#app=",
        ""
      );


    openApp(id);

  } else {

    renderHome();

  }

}


window.addEventListener(
  "hashchange",
  loadPage
);


loadPage();