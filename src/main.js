/**
 * Application Entry Point
 * Initializes theme, session, global error boundary, and router.
 */

import { navigate } from "./router.js";
import { store } from "./state/store.js";
import { authService } from "./services/authService.js";

async function init() {
  console.log("%c🚗 AutoMind AI Car Recommendation Chatbot Initialized", "color: #22d3ee; font-weight: bold; font-size: 14px;");

  // Verify auth session
  try {
    const session = await authService.getCurrentSession();
    if (session && session.user) {
      store.setState({ isAuthenticated: true, user: session.user });
    }
  } catch (e) {
    console.warn("Session check fallback:", e);
  }

  // Trigger initial route
  await navigate();
}

window.addEventListener("DOMContentLoaded", init);
