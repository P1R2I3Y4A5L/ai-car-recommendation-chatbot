/**
 * Client-Side Hash Router & Controller Coordinator
 */

import { store } from "./state/store.js";
import { carService } from "./services/carService.js";
import { chatService } from "./services/chatService.js";
import { recommendationService } from "./services/recommendationService.js";
import { authService } from "./services/authService.js";
import { adminService } from "./services/adminService.js";

// Pages
import { renderLandingPage } from "./pages/LandingPage.js";
import { renderAboutPage } from "./pages/AboutPage.js";
import { renderLoginPage } from "./pages/LoginPage.js";
import { renderSignupPage } from "./pages/SignupPage.js";
import { renderDashboardPage } from "./pages/DashboardPage.js";
import { renderChatbotPage } from "./pages/ChatbotPage.js";
import { renderResultsPage } from "./pages/ResultsPage.js";
import { renderCarDetailsPage } from "./pages/CarDetailsPage.js";
import { renderComparePage } from "./pages/ComparePage.js";
import { renderSavedCarsPage } from "./pages/SavedCarsPage.js";
import { renderHistoryPage } from "./pages/HistoryPage.js";
import { renderProfilePage } from "./pages/ProfilePage.js";
import { renderSettingsPage } from "./pages/SettingsPage.js";
import { renderAdminDashboardPage } from "./pages/AdminDashboardPage.js";
import { renderAdminCarsPage } from "./pages/AdminCarsPage.js";
import { renderAdminUsersPage } from "./pages/AdminUsersPage.js";
import { renderAdminAnalyticsPage } from "./pages/AdminAnalyticsPage.js";

import { renderToastContainer } from "./components/common/Toast.js";
import { renderPreferenceSidebar } from "./components/chat/PreferenceSidebar.js";
import { renderChatMessage } from "./components/chat/ChatMessage.js";

// Expose store globally for click handlers
window.appStore = store;
window.currentResultsFilters = {};
window.currentResultsSort = "match";
window.activeChatStepIndex = 0;
window.activeChatMessages = null;

export async function navigate() {
  const hash = window.location.hash || "#/";
  const appRoot = document.getElementById("app");
  if (!appRoot) return;

  // Show subtle loading pulse if transition takes a moment
  window.scrollTo({ top: 0, behavior: "instant" });

  try {
    if (hash === "#/" || hash === "") {
      appRoot.innerHTML = await renderLandingPage();
    } else if (hash === "#/about") {
      appRoot.innerHTML = renderAboutPage();
    } else if (hash === "#/login") {
      appRoot.innerHTML = renderLoginPage();
    } else if (hash === "#/signup") {
      appRoot.innerHTML = renderSignupPage();
    } else if (hash === "#/dashboard") {
      appRoot.innerHTML = await renderDashboardPage();
    } else if (hash === "#/chat") {
      if (!window.activeChatMessages) {
        window.activeChatMessages = chatService.getInitialState().messages;
        window.activeChatStepIndex = 0;
      }
      appRoot.innerHTML = renderChatbotPage();
    } else if (hash.startsWith("#/results")) {
      appRoot.innerHTML = await renderResultsPage();
    } else if (hash.startsWith("#/car/")) {
      const carId = hash.replace("#/car/", "");
      appRoot.innerHTML = await renderCarDetailsPage(carId);
    } else if (hash === "#/compare") {
      appRoot.innerHTML = await renderComparePage();
    } else if (hash === "#/saved") {
      appRoot.innerHTML = await renderSavedCarsPage();
    } else if (hash === "#/history") {
      appRoot.innerHTML = await renderHistoryPage();
    } else if (hash === "#/profile") {
      appRoot.innerHTML = renderProfilePage();
    } else if (hash === "#/settings") {
      appRoot.innerHTML = renderSettingsPage();
    } else if (hash === "#/admin") {
      appRoot.innerHTML = await renderAdminDashboardPage();
    } else if (hash === "#/admin/cars") {
      appRoot.innerHTML = await renderAdminCarsPage();
    } else if (hash === "#/admin/users") {
      appRoot.innerHTML = await renderAdminUsersPage();
    } else if (hash === "#/admin/analytics") {
      appRoot.innerHTML = await renderAdminAnalyticsPage();
    } else {
      // Fallback
      appRoot.innerHTML = await renderLandingPage();
    }

    // Always ensure Toast container is injected
    injectToastContainer();
  } catch (err) {
    console.error("Routing error:", err);
    appRoot.innerHTML = `
      <div class="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 class="text-2xl font-bold text-red-400 mb-2">Navigation Error</h2>
        <p class="text-slate-400 text-sm mb-6">${err.message}</p>
        <a href="#/" class="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm">Return Home</a>
      </div>
    `;
  }
}

function injectToastContainer() {
  let toastRoot = document.getElementById("toast-root");
  if (!toastRoot) {
    const div = document.createElement("div");
    div.innerHTML = renderToastContainer(store.getState().toasts);
    if (div.firstElementChild) {
      document.body.appendChild(div.firstElementChild);
    }
  } else {
    toastRoot.outerHTML = renderToastContainer(store.getState().toasts);
  }
}

// Subscribe to store updates to keep Toasts updated
store.subscribe((state) => {
  injectToastContainer();
});

// Setup Global Interaction Handlers
window.toggleSaveCar = function (carId, title) {
  store.toggleSaveCar(carId, title);
  navigate(); // Re-render active view
};

window.toggleCompareCar = function (carId, title) {
  store.toggleCompareCar(carId, title);
  navigate();
};

window.addToCompareCar = function (carId) {
  store.toggleCompareCar(carId, "Car");
  navigate();
};

window.removeCompareCar = function (carId) {
  store.toggleCompareCar(carId, "Car");
  navigate();
};

window.clearAllComparisons = function () {
  store.clearComparison();
  navigate();
};

window.toggleHighlightDifferences = function (checked) {
  window.isHighlightDiffsActive = checked;
  navigate();
};

window.addAllSavedToCompare = function () {
  const saved = store.getState().savedCarIds;
  saved.slice(0, 4).forEach((id) => {
    if (!store.isCarInComparison(id)) {
      store.toggleCompareCar(id);
    }
  });
  window.location.hash = "#/compare";
};

// Chat Handlers
window.handleChatSubmit = async function (e) {
  e.preventDefault();
  const inputEl = document.getElementById("chat-user-input");
  if (!inputEl) return;
  const text = inputEl.value.trim();
  if (!text) return;

  inputEl.value = "";
  await processUserChat(text);
};

window.handleChipClick = async function (chip) {
  if (chip.category === "action") {
    if (chip.value === "VIEW_RESULTS") {
      window.executeRecommendationWithLiveVector();
      return;
    } else if (chip.value === "RESTART") {
      window.resetChatSession();
      return;
    }
  }
  await processUserChat(chip);
};

window.sendChatPrompt = async function (promptText) {
  await processUserChat(promptText);
};

async function processUserChat(input) {
  if (!window.activeChatMessages) {
    window.activeChatMessages = chatService.getInitialState().messages;
  }

  // 1. Push user message
  const userText = typeof input === "object" ? input.label : String(input);
  const userMsg = {
    id: `msg-usr-${Date.now()}`,
    sender: "user",
    text: userText,
    timestamp: "Just now"
  };
  window.activeChatMessages.push(userMsg);

  // Update chat message list immediately
  const container = document.getElementById("chat-messages-container");
  const typingIndicator = document.getElementById("chat-typing-indicator");
  if (container) {
    const div = document.createElement("div");
    div.innerHTML = renderChatMessage(userMsg);
    if (typingIndicator) {
      container.insertBefore(div.firstElementChild, typingIndicator);
      typingIndicator.classList.remove("hidden");
    }
    container.scrollTop = container.scrollHeight;
  }

  // 2. Call chatService
  const currentPrefs = store.getState().currentPreferences;
  const result = await chatService.processMessage(input, window.activeChatStepIndex, currentPrefs);

  // 3. Update state & UI
  window.activeChatStepIndex = result.nextStepIndex;
  window.activeChatMessages.push(result.replyMessage);
  store.updatePreferences(result.updatedPreferences);

  if (typingIndicator) typingIndicator.classList.add("hidden");

  // Re-render conversation stream & live preference sidebar
  if (container) {
    const div = document.createElement("div");
    div.innerHTML = renderChatMessage(result.replyMessage);
    if (typingIndicator) {
      container.insertBefore(div.firstElementChild, typingIndicator);
    }
    container.scrollTop = container.scrollHeight;
  }

  const prefRoot = document.getElementById("preference-sidebar-root");
  if (prefRoot) {
    prefRoot.innerHTML = renderPreferenceSidebar(store.getState().currentPreferences);
  }
}

window.resetChatSession = function () {
  window.activeChatMessages = chatService.getInitialState().messages;
  window.activeChatStepIndex = 0;
  navigate();
};

window.resetChatPreferences = function () {
  store.setState({
    currentPreferences: {
      budgetMin: 0,
      budgetMax: 10000000,
      budgetFormatted: "",
      usage: "",
      fuelPreferences: [],
      bodyTypes: [],
      transmission: "Any",
      seatingCapacity: 5,
      brandPreferences: [],
      priorityFeatures: []
    }
  });
  window.resetChatSession();
};

window.executeRecommendationWithLiveVector = async function () {
  const prefs = store.getState().currentPreferences;
  store.showToast({
    title: "AI Synthesis Complete",
    message: "Generating ranked candidate shortlist...",
    type: "info"
  });

  const recResult = await recommendationService.generateRecommendations(prefs);
  store.setRecommendations(recResult);
  window.location.hash = "#/results";
};

// Filter & Sort Handlers
window.handleFilterChange = function (key, value) {
  window.currentResultsFilters[key] = value;
  navigate();
};

window.handleSortChange = function (val) {
  window.currentResultsSort = val;
  navigate();
};

window.resetCatalogFilters = function () {
  window.currentResultsFilters = {};
  window.currentResultsSort = "match";
  navigate();
};

// Global Live Search Handler
window.handleGlobalSearch = async function (q) {
  const resultsDropdown = document.getElementById("global-search-results");
  if (!resultsDropdown) return;

  if (!q || q.trim().length === 0) {
    resultsDropdown.classList.add("hidden");
    return;
  }

  const matches = await carService.searchCars(q);
  if (matches.length === 0) {
    resultsDropdown.innerHTML = `<div class="p-3 text-xs text-slate-400 text-center">No vehicles match "${q}"</div>`;
  } else {
    resultsDropdown.innerHTML = matches
      .map(
        (c) => `
        <a href="#/car/${c.id}" onclick="document.getElementById('global-search-results').classList.add('hidden')" class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition-colors">
          <img src="${c.primaryImage}" alt="${c.model}" class="w-10 h-7 rounded-lg object-cover" />
          <div class="flex-1 min-w-0 text-left">
            <div class="text-xs font-bold text-white truncate">${c.brand} ${c.model}</div>
            <div class="text-[10px] text-slate-400 truncate">${c.variant} • ${c.priceFormatted}</div>
          </div>
        </a>
      `
      )
      .join("");
  }
  resultsDropdown.classList.remove("hidden");
};

// UI Toggles
window.toggleNotificationsDropdown = function () {
  const el = document.getElementById("notifications-dropdown");
  if (el) el.classList.toggle("hidden");
};

window.toggleMobileDrawer = function () {
  const backdrop = document.getElementById("mobile-drawer-backdrop");
  if (backdrop) backdrop.classList.toggle("hidden");
};

window.switchSettingsTab = function (tab) {
  window.currentSettingsTab = tab;
  navigate();
};

window.selectGalleryImage = function (src) {
  const imgEl = document.getElementById("main-detail-photo");
  if (imgEl) {
    imgEl.style.opacity = "0.4";
    setTimeout(() => {
      imgEl.src = src;
      imgEl.style.opacity = "1";
    }, 150);
  }
};

window.openEditProfileModal = function () {
  const newName = prompt("Enter full name:", store.getState().user.name);
  if (newName && newName.trim()) {
    store.setState({
      user: { ...store.getState().user, name: newName.trim() }
    });
    store.showToast({ title: "Profile Updated", message: "Name updated successfully", type: "success" });
    navigate();
  }
};

// Admin Handlers
window.handleAdminCarSearch = function (q) {
  window.adminCarsSearch = q;
  navigate();
};

window.handleAdminCarBodyFilter = function (type) {
  window.adminCarsBodyFilter = type;
  navigate();
};

window.handleAdminUserSearch = function (q) {
  window.adminUsersSearch = q;
  navigate();
};

window.openAddCarModal = function () {
  const modal = document.getElementById("car-form-modal");
  const form = document.getElementById("car-admin-form");
  const title = document.getElementById("car-modal-title");
  if (modal && form) {
    form.reset();
    document.getElementById("car-form-id").value = "";
    if (title) title.innerText = "Add New Vehicle to Catalog";
    modal.classList.remove("hidden");
    setTimeout(() => modal.classList.remove("opacity-0"), 10);
  }
};

window.editCarById = async function (id) {
  const car = await carService.getCarById(id);
  const modal = document.getElementById("car-form-modal");
  const title = document.getElementById("car-modal-title");
  if (modal && car) {
    document.getElementById("car-form-id").value = car.id;
    document.getElementById("car-form-brand").value = car.brand;
    document.getElementById("car-form-model").value = car.model;
    document.getElementById("car-form-variant").value = car.variant;
    document.getElementById("car-form-price").value = car.price;
    document.getElementById("car-form-body").value = car.bodyType;
    document.getElementById("car-form-fuel").value = car.specs.fuelType;
    document.getElementById("car-form-transmission").value = car.specs.transmission;
    document.getElementById("car-form-seating").value = car.specs.seating;
    document.getElementById("car-form-mileage").value = car.specs.mileage;
    document.getElementById("car-form-safety").value = car.specs.safetyRating.stars;
    document.getElementById("car-form-image").value = car.primaryImage;
    document.getElementById("car-form-overview").value = car.overview;

    if (title) title.innerText = `Edit ${car.brand} ${car.model}`;
    modal.classList.remove("hidden");
    setTimeout(() => modal.classList.remove("opacity-0"), 10);
  }
};

window.closeCarModal = function () {
  const modal = document.getElementById("car-form-modal");
  if (modal) {
    modal.classList.add("opacity-0");
    setTimeout(() => modal.classList.add("hidden"), 200);
  }
};

window.handleCarFormSubmit = async function (e) {
  e.preventDefault();
  const id = document.getElementById("car-form-id").value;
  const brand = document.getElementById("car-form-brand").value;
  const model = document.getElementById("car-form-model").value;
  const variant = document.getElementById("car-form-variant").value;
  const price = Number(document.getElementById("car-form-price").value);
  const bodyType = document.getElementById("car-form-body").value;
  const fuelType = document.getElementById("car-form-fuel").value;
  const transmission = document.getElementById("car-form-transmission").value;
  const seating = Number(document.getElementById("car-form-seating").value);
  const mileage = document.getElementById("car-form-mileage").value;
  const stars = Number(document.getElementById("car-form-safety").value);
  const primaryImage =
    document.getElementById("car-form-image").value ||
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80";
  const overview = document.getElementById("car-form-overview").value || "Premium automotive selection.";

  const priceFormatted = price >= 10000000 ? `₹${(price / 10000000).toFixed(2)} Cr` : `₹${(price / 100000).toFixed(2)} Lakh`;

  const carPayload = {
    brand,
    model,
    variant,
    year: 2024,
    price,
    priceFormatted,
    priceCategory: price > 3000000 ? "premium" : "mid-range",
    bodyType,
    primaryImage,
    gallery: [primaryImage],
    specs: {
      engine: "2.0L Turbo",
      power: "150 bhp",
      torque: "250 Nm",
      mileage,
      acceleration: "8.5s (0-100 km/h)",
      bootSpace: "450 Litres",
      groundClearance: "190 mm",
      seating,
      fuelType,
      transmission,
      safetyRating: { stars, agency: "Bharat NCAP", airbags: 6 }
    },
    keyFeatures: ["Touchscreen Infotainment", "Dual Airbags", "Rear Camera", "ABS with EBD"],
    overview
  };

  if (id) {
    await adminService.updateCar(id, carPayload);
    store.showToast({ title: "Car Updated", message: `${brand} ${model} updated in catalog`, type: "success" });
  } else {
    await adminService.addCar(carPayload);
    store.showToast({ title: "Car Added", message: `${brand} ${model} added to live catalog`, type: "success" });
  }

  window.closeCarModal();
  navigate();
};

window.deleteCarById = async function (id, title) {
  if (confirm(`Are you sure you want to remove ${title} from the catalog?`)) {
    await adminService.deleteCar(id);
    store.showToast({ title: "Car Removed", message: `${title} deleted from catalog`, type: "info" });
    navigate();
  }
};

// Auth Handlers
window.quickFillDemoLogin = function () {
  const emailInput = document.getElementById("login-email");
  const passInput = document.getElementById("login-password");
  if (emailInput && passInput) {
    emailInput.value = "arjun.sharma@example.com";
    passInput.value = "SecurePassword123!";
  }
};

window.handleLoginSubmit = async function (e) {
  e.preventDefault();
  const email = document.getElementById("login-email")?.value;
  const pass = document.getElementById("login-password")?.value;

  try {
    const session = await authService.login(email, pass);
    store.setState({ isAuthenticated: true, user: session.user });
    store.showToast({
      title: "Welcome Back",
      message: `Signed in as ${session.user.name}`,
      type: "success"
    });
    window.location.hash = "#/dashboard";
  } catch (err) {
    store.showToast({ title: "Sign In Failed", message: err.message, type: "error" });
  }
};

window.handleSignupSubmit = async function (e) {
  e.preventDefault();
  const name = document.getElementById("signup-name")?.value;
  const email = document.getElementById("signup-email")?.value;
  const pass = document.getElementById("signup-password")?.value;
  const confirmPass = document.getElementById("signup-confirm-password")?.value;

  if (pass !== confirmPass) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const session = await authService.signup(name, email, pass);
    store.setState({ isAuthenticated: true, user: session.user });
    store.showToast({
      title: "Account Created",
      message: `Welcome to AutoMind AI, ${name}!`,
      type: "success"
    });
    window.location.hash = "#/dashboard";
  } catch (err) {
    store.showToast({ title: "Registration Failed", message: err.message, type: "error" });
  }
};

// Close dropdowns on outside click
document.addEventListener("click", (e) => {
  const notifDropdown = document.getElementById("notifications-dropdown");
  const searchDropdown = document.getElementById("global-search-results");
  if (notifDropdown && !e.target.closest("#notifications-dropdown") && !e.target.closest("button[onclick*='toggleNotificationsDropdown']")) {
    notifDropdown.classList.add("hidden");
  }
  if (searchDropdown && !e.target.closest("#global-search-results") && !e.target.closest("#global-search-input")) {
    searchDropdown.classList.add("hidden");
  }
});

// Listen to Hash Change
window.addEventListener("hashchange", navigate);
