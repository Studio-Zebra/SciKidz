import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const MenuContext = createContext(null);

export function MenuProvider({ children, user }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      openMenu: () => setIsOpen(true),
      closeMenu: () => setIsOpen(false),
      toggleMenu: () => setIsOpen((v) => !v),
    }),
    [isOpen]
  );

  return (
    <MenuContext.Provider value={value}>
      {children}
      <MenuOverlayModal
        isOpen={isOpen}
        onClose={value.closeMenu}
        user={user}
      />
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within <MenuProvider />");
  return ctx;
}

function MenuOverlayModal({ isOpen, onClose, user }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu on route change (nice UX)
  useEffect(() => {
    if (isOpen) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // ESC key closes
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Focus first actionable item when opened
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      const el = document.querySelector('[data-menu-first-focus="true"]');
      el?.focus?.();
    }, 0);
    return () => clearTimeout(t);
  }, [isOpen]);

  const items = [
    { label: "Progress Tracker", icon: "📈", to: "/progress" },
    { label: "Module Store", icon: "🛒", to: "/store" },
    { label: "Account Settings", icon: "⚙️", to: "/account" },
    { label: "Module Center", icon: "🏠", to: "/modules" },
  ];

  const handleLogout = () => {
    // Replace with your auth logic:
    // await auth.signOut(); or clear tokens, etc.
    navigate("/login");
  };

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <div className="sk-menu-root" aria-hidden={!isOpen}>
          {/* Backdrop */}
          <motion.button
            type="button"
            className="sk-menu-backdrop"
            aria-label="Close menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.aside
            className="sk-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 420, damping: 36 }}
          >
            <header className="sk-menu-header">
              <div className="sk-menu-title">Menu</div>

              <button
                type="button"
                className="sk-menu-close"
                onClick={onClose}
                aria-label="Close menu"
                data-menu-first-focus="true"
              >
                ←
              </button>
            </header>

            <div className="sk-menu-profile">
              <div className="sk-menu-avatar" aria-hidden="true">
                {getInitials(user?.name ?? "SciKidz")}
              </div>
              <div className="sk-menu-profile-text">
                <div className="sk-menu-name">{user?.name ?? "SciKidz Learner"}</div>
                <div className="sk-menu-username">{user?.username ?? "Example123"}</div>
              </div>
            </div>

            <nav className="sk-menu-nav" aria-label="Primary">
              {items.map((it) => (
                <button
                  key={it.label}
                  type="button"
                  className="sk-menu-item"
                  onClick={() => navigate(it.to)}
                >
                  <span className="sk-menu-item-left">
                    <span className="sk-menu-item-icon" aria-hidden="true">
                      {it.icon}
                    </span>
                    <span>{it.label}</span>
                  </span>
                  <span className="sk-menu-chevron" aria-hidden="true">›</span>
                </button>
              ))}
            </nav>

            <div className="sk-menu-footer">
              <button type="button" className="sk-menu-logout" onClick={handleLogout}>
                Logout <span aria-hidden="true">⎋</span>
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}

function getInitials(name) {
  const parts = String(name).trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("") || "SK";
}
