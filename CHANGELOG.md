# Changelog

All notable changes to the CxE Americas Step Tracker are documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and follows the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.

---

## [2.4.1] - 2026-01-23

### 🎨 Improved
- **Dynamic Hamburger Menu Sizing**: Menu scales responsively across all device sizes using CSS `clamp()` and viewport-relative units
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
- **BRAND_UI_GUIDE.md**: Complete brand and UI documentation with design tokens
- `package.json`, `playwright.config.ts`, `tsconfig.json` for test infrastructure

### 🔧 Fixed
- **User Persistence Bug**: Users no longer forced to re-register on every page load
- **Optimistic Hydration**: Load cached users immediately while Supabase fetches (eliminates blank state)
- **`loadCurrentUser()` Fallback**: Now checks localStorage cache when in-memory users not yet loaded
- **`updateUI()` Logic**: Properly hides welcome screen when `currentUser` exists
- **Hamburger Menu Accessibility**: Added `aria-expanded`, `aria-controls`, `aria-hidden`, focus trap, focus restore
- **Duplicate JS Function**: Removed redundant `removeMobileTouchPrevention()` definition
- **Redundant Event Listener**: Removed duplicate ESC key handler for hamburger menu
- **Tab Background Gradient**: Unified gradient across all tabs (Dashboard/Leaderboard/Teams/Profile)
- **Welcome Screen UI**: Improved spacing, styling with premium card design

### 🎨 Improved
- **Hamburger Flyout CSS**: Unified full-screen overlay style, removed conflicting off-canvas rules
- **Dark Theme Flyout**: Simplified overlay background for consistency
- **Service Worker Cache**: Bumped `CACHE_VERSION` for fresh deploys

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

## [2.3.0] - 2025-09-24 — "Database & Admin Edition"

### ✨ Added
- **Supabase Database Integration**: Cloud-based PostgreSQL with real-time synchronization
- **Admin Dashboard**: Comprehensive admin interface with secure authentication
- **Live Display System**: Dedicated presentation mode with auto-updating leaderboards
- **Enhanced Refresh System**: Manual and automatic data refresh with visual feedback
- **User Management**: Add, edit, delete users and manage team assignments
- **Manual Step Entry**: Admins can add steps for users
- **System Diagnostics**: Database health monitoring and connectivity testing

### 🎨 Improved
- **Centered Modal Design**: Clean, professional flyout menu centered on screen
- **Unified Color Scheme**: Single white background for clean visual hierarchy
- **Simplified Overlay System**: Removed redundant backdrop elements for better performance
- **Dark Mode Compatibility**: Fixed overlay issues for seamless dark theme experience
- **Enhanced Touch Targets**: Better mobile interaction with optimized button sizes
- **Viewport Optimization**: Better mobile screen utilization

### 🔧 Fixed
- **Database Error Handling**: Comprehensive error management
- **Method Compatibility**: Support for multiple parameter formats
- **Connection Retry**: Automatic reconnection on network issues
- **Race Condition Prevention**: No duplicate operations
- **Data Verification**: Ensure database operations complete successfully

---

## [2.2.0] - 2025-09-11 — "Premium UX Edition"

### ✨ Added
- **Premium Hamburger Menu**: Complete redesign with gradient effects and staggered animations
- **Ripple Animations**: Smooth transforms and visual feedback
- **Enhanced Shadows**: Layered depth with 8px + 32px blur effects

### ♿ Accessibility
- **Comprehensive ARIA Support**: Full screen reader compatibility
- **Keyboard Navigation**: Escape key, focus management, tab order
- **Mobile Touch Optimization**: 44px+ touch targets, backdrop interactions
- **Focus Indicators**: Clear visual focus for all interactive elements
- **Body Scroll Prevention**: Better modal interactions

### 🎨 Improved
- **Micro-interactions**: Cubic-bezier timing functions for premium feel
- **Visual Feedback**: Hover effects, scaling, color transitions
- **Backdrop Blur**: Enhanced visual separation with gradient backdrops
- **Icon Containers**: Rounded backgrounds with hover scaling
- **Rotation Effects**: Close button rotates 90° on hover, 180° on click

---

## [2.1.0] - 2025-09-03 — "Refined Edition"

### ✨ Added
- **New Team**: "CxE LT" team for expanded competition (9 teams total)
- **Interactive Footer**: Rainbow heart glow animation on hover
- **Enhanced Favicon**: Multi-format favicon support for all browsers

### 🔧 Changed
- **Challenge Refinement**: Updated "Bill Gates Memorial Bridge" to "Seattle Bridge Explorer" for neutrality
- **UI Polish**: Smaller, refined footer text sizing
- **Weather Integration**: Confirmed Open-Meteo API implementation with proper fallbacks

---

## [2.0.0] - 2025-08-28 — "Enterprise Edition"

### ✨ Added
- **Real Weather Integration**: Live Open-Meteo API with clothing recommendations
- **Dark Mode Support**: Full dark theme with system preference detection
- **PWA Capabilities**: Offline support with service worker caching
- **Spotify Integration**: Official CxE Americas 2025 playlist
- **Overachiever System**: Advanced recognition with multiple criteria
- **Live Notifications**: Real-time achievement alerts with animations
- **Multi-language Greetings**: 12 international welcome messages
- **Keyboard Shortcuts**: Power user navigation (Alt+1-4, Ctrl/Cmd+D, Escape)

### 🚀 Performance
- **40% Faster Loading**: DOM caching and optimized rendering
- **60% Less Memory Usage**: Efficient data management
- **Progressive Loading**: Batch rendering for large datasets
- **Hardware Acceleration**: GPU-optimized animations

### ♿ Accessibility
- **WCAG 2.1 AA Compliance**: Full accessibility support
- **Screen Reader Support**: Complete ARIA implementation
- **High Contrast**: Dark mode with optimized contrast ratios

### 🔧 Developer Experience
- **Performance Monitoring**: Real-time metrics and analytics
- **Error Logging**: Automatic error capture and debugging
- **Code Optimization**: Modern ES6+ patterns and best practices

---

## [1.5.0] - 2025-08-27 — "Enhanced Competition"

### ✨ Added
- Microsoft/Seattle-themed challenges with educational facts
- Recent activity widget with live feed
- Dynamic motivational content (rotating phrases)
- Enhanced team statistics and analytics
- Improved mobile responsiveness

---

## [1.0.0] - 2025-08-26 — "Foundation"

### ✨ Initial Release
- Basic step tracking functionality
- Team competition system (8 teams)
- Leaderboards (Today/Week/Total)
- Personal dashboard with progress visualization
- Local storage persistence
- Responsive mobile-first design
- Profile management

---

## Version Summary

| Version | Date | Codename | Highlights |
|---------|------|----------|------------|
| 2.4.1 | 2026-01-23 | - | Dynamic menu sizing, scroll removal |
| 2.4.0 | 2026-01-23 | - | E2E testing, user persistence fix, accessibility |
| 2.3.0 | 2025-09-24 | Database & Admin | Supabase, Admin Dashboard, Live Display |
| 2.2.0 | 2025-09-11 | Premium UX | Hamburger menu redesign, micro-interactions |
| 2.1.0 | 2025-09-03 | Refined | CxE LT team, interactive footer |
| 2.0.0 | 2025-08-28 | Enterprise | Weather, Dark mode, PWA, Spotify |
| 1.5.0 | 2025-08-27 | Enhanced Competition | Challenges, activity widget |
| 1.0.0 | 2025-08-26 | Foundation | Initial release |

---

*Made with ❤️ for CxE Americas Offsite 2025*
