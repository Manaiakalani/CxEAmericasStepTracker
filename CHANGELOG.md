# Changelog

## [Unreleased]

### ✨ Added
- Complete User Merge functionality with preview and safety confirmations
- Smart Auto-Merge for automatic duplicate user resolution
- Enhanced duplicate detection with similarity algorithms
- Advanced User Actions section in admin dashboard
- Per-user merge buttons in user management table
- Comprehensive form validation and error handling

### 🔧 Fixed
- **CRITICAL**: Fixed broken "Edit Steps" functionality in admin dashboard
- Missing HTML form elements (manualStepsForm, stepUserId, etc.)
- Incorrect function references (addNewUser -> addUser)
- Form field naming inconsistencies

### 📋 Enhanced
- Improved admin dashboard UI organization
- Added multiple safety confirmations for destructive operations
- Enhanced user feedback with detailed success/error messages
- Better visual indicators and progress feedback
- Automatic data refresh after administrative operations

### 🛡️ Security
- Multiple confirmation dialogs for irreversible actions
- Merge preview functionality before execution
- Automatic data verification after operations
- Enhanced logging for audit trails

---

*This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.*