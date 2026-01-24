# Changelog

## [2.4.1] - 2026-01-23

### 🎨 Improved
- **Dynamic Hamburger Menu Sizing**: Menu now scales responsively across all device sizes using CSS `clamp()` and viewport-relative units
- **Removed Menu Scroll**: Flyout no longer has internal scroll - content fits naturally
- **Hamburger Button Polish**: Matched button styling to FAQ & Info menu items (white card background, soft shadow, blue icon)
- **Breakpoint Refinements**: Added large desktop (1440px+) and tablet (1024px) specific sizing

### 🔧 Fixed
- **Menu Overflow**: Removed `max-height` constraints and `overflow-y: auto` that caused unnecessary scrollbars
- **Mobile Menu Sizing**: Better dynamic sizing with `calc(100vw - 1rem)` on small screens

---

## [2.4.0] - 2026-01-23

### ✨ Added
- **Playwright E2E Testing**: Full test harness with cross-browser support (Chromium, Firefox, WebKit, Mobile Safari, Mobile Chrome)
- **Hamburger Menu Tests**: Automated tests for aria states, focus trap, overlay click, ESC key, scroll lock
- **Session Persistence Tests**: E2E tests verifying user login state survives page reload
- **TESTING.md**: Comprehensive manual + automated testing documentation
- `package.json`, `playwright.config.ts`, `tsconfig.json` for test infrastructure

### 🔧 Fixed
- **User Persistence Bug**: Users no longer forced to re-register on every page load
- **Optimistic Hydration**: Load cached users immediately while Supabase fetches (eliminates blank state)
- **`loadCurrentUser()` Fallback**: Now checks localStorage cache when in-memory users not yet loaded
- **`updateUI()` Logic**: Properly hides welcome screen when `currentUser` exists
- **Hamburger Menu Accessibility**: Added `aria-expanded`, `aria-controls`, `aria-hidden`, focus trap, focus restore
- **Duplicate JS Function**: Removed redundant `removeMobileTouchPrevention()` definition
- **Redundant Event Listener**: Removed duplicate ESC key handler for hamburger menu

### 🎨 Improved
- **Hamburger Flyout CSS**: Unified full-screen overlay style, removed conflicting off-canvas rules
- **Dark Theme Flyout**: Simplified overlay background for consistency
- **Service Worker Cache**: Bumped `CACHE_VERSION` to `2026-01-23-001` for fresh deploys

### 📋 Enhanced
- Complete User Merge functionality with preview and safety confirmations
- Smart Auto-Merge for automatic duplicate user resolution
- Enhanced duplicate detection with similarity algorithms
- Advanced User Actions section in admin dashboard
- Per-user merge buttons in user management table
- Comprehensive form validation and error handling

### 🛡️ Security
- Multiple confirmation dialogs for irreversible actions
- Merge preview functionality before execution
- Automatic data verification after operations
- Enhanced logging for audit trails

---

## [2.3.0] - 2025-09-24

### Added
- Supabase Database Integration with real-time synchronization
- Admin Dashboard with user and data management
- Live Display system with auto-updating leaderboards
- Enhanced refresh system with manual and automatic options

---

*This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.*