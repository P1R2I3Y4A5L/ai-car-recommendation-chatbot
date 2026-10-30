/**
 * Auth Service - Frontend Authentication Simulation
 * Ready for Phase 4 real JWT / OAuth backend endpoints.
 */

import { mockCurrentUser, mockAdminUser } from "../data/users.js";

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));
const SESSION_KEY = "agy_auth_session";

export const authService = {
  /**
   * Check current logged-in session
   */
  async getCurrentSession() {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
    // Default to active mock session for smooth exploration
    return {
      isAuthenticated: true,
      user: mockCurrentUser,
      token: "demo-jwt-token-998"
    };
  },

  /**
   * Simulate user login
   */
  async login(email, password) {
    await delay(300);

    if (!email || !password) {
      throw new Error("Please enter both email and password.");
    }

    if (email.includes("admin")) {
      const session = {
        isAuthenticated: true,
        user: mockAdminUser,
        token: "admin-jwt-token-001"
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }

    const session = {
      isAuthenticated: true,
      user: {
        ...mockCurrentUser,
        email: email
      },
      token: "user-jwt-token-777"
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  /**
   * Simulate user signup
   */
  async signup(name, email, password) {
    await delay(350);

    if (!name || !email || !password) {
      throw new Error("All fields are required to create an account.");
    }

    const session = {
      isAuthenticated: true,
      user: {
        ...mockCurrentUser,
        name: name,
        email: email,
        joinedDate: "Today"
      },
      token: "new-user-jwt-token-444"
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  /**
   * Simulate logout
   */
  async logout() {
    await delay(100);
    localStorage.removeItem(SESSION_KEY);
    return { isAuthenticated: false, user: null };
  }
};
