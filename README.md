# CxE Steps - Company Step Tracker 🚶‍♀️👟

A modern, mobile-first step tracking web application designed for company offsites and team building events. Perfect for 80-400 participants with beautiful UI, team competition, and gamification features.

![Step Tracker Preview](https://img.shields.io/badge/Mobile%20First-Responsive-blue) ![Team Competition](https://img.shields.io/badge/Team-Competition-green) ![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-yellow)

## ✨ Features

### 🏆 **Team Competition**
- **6 Pre-configured Teams**: Innovation Squad, Growth Warriors, Tech Titans, Creative Crusaders, Strategy Stars, Operations Optimizers
- **Team Leaderboards**: See how your team ranks against others
- **Team Statistics**: Total steps, average per member, and team rankings

### 📱 **Mobile-First Design**
- **Responsive Layout**: Perfect on phones, tablets, and desktops
- **Touch-Friendly**: Large buttons and intuitive gestures
- **Progressive Enhancement**: Works on all modern browsers

### 🎯 **Personal Tracking**
- **Customizable Daily Goals**: Choose from 5K, 8K, 10K, or 12K steps
- **Progress Visualization**: Beautiful circular progress indicators
- **Weekly Charts**: Visual representation of your weekly activity
- **Achievement Celebrations**: Get encouraged when you hit your goals!

### 🏅 **Leaderboards**
- **Multiple Time Periods**: Today, This Week, All Time
- **Individual Rankings**: See where you stand among colleagues
- **Real-time Updates**: Instant updates when steps are added

### 📊 **Analytics & Stats**
- **Personal Dashboard**: Your daily progress at a glance
- **Weekly Overview**: 7-day activity visualization
- **Profile Statistics**: Total steps, daily averages, and current rank

## 🚀 Getting Started

### Quick Setup
1. **Clone or Download** this repository
2. **Open `index.html`** in any modern web browser
3. **Register** with your name and team
4. **Start Tracking** your daily steps!

### No Installation Required
This is a pure HTML/CSS/JavaScript application that runs directly in the browser. No server setup, no build process, no dependencies to install.

## 📱 How to Use

### First Time Setup
1. **Welcome Screen**: Enter your name, select your team, and choose a daily step goal
2. **Get Started**: Click the "Get Started!" button to begin tracking

### Daily Usage
1. **Add Steps**: Use the step input field or quick-add buttons (+1K, +2.5K, +5K, +10K)
2. **View Progress**: Check your circular progress indicator and daily stats
3. **Check Leaderboards**: See how you and your team are performing
4. **Monitor Team Competition**: Visit the Teams tab to see team rankings

### Navigation
- **Dashboard**: Your personal progress and daily step entry
- **Leaderboard**: Individual participant rankings (Today/Week/All Time)
- **Teams**: Team-based competition and statistics
- **Profile**: Your personal stats and settings

## 🛠 Technical Details

### Technology Stack
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Mobile-first responsive design with CSS Grid/Flexbox
- **Vanilla JavaScript**: ES6+ with classes and modern features
- **Local Storage**: Client-side data persistence
- **Font Awesome**: Modern iconography
- **Google Fonts**: Inter typeface for clean readability

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Graceful degradation for older browsers

### Data Storage
- **Local Storage**: All data is stored locally in your browser
- **Privacy First**: No external servers, no data collection
- **Backup**: Export/import functionality can be added if needed

## 🎨 Customization

### Team Names
Edit the `teams` array in `script.js` to customize team names:
```javascript
this.teams = [
    'Your Custom Team 1',
    'Your Custom Team 2',
    // Add more teams as needed
];
```

### Daily Goals
Modify the goal options in the registration form (`index.html`):
```html
<option value="5000">5,000 steps (Light)</option>
<option value="8000" selected>8,000 steps (Moderate)</option>
<!-- Add more goal options -->
```

### Branding & Colors
Update CSS custom properties in `styles.css` for company branding:
```css
:root {
    --primary-color: #10b981;
    --secondary-color: #3b82f6;
    --company-gradient: linear-gradient(135deg, #10b981, #3b82f6);
}
```

## 🔧 Development

### File Structure
```
CxE Steps/
├── index.html          # Main application structure
├── styles.css          # Complete styling and responsive design
├── script.js           # Application logic and functionality
├── README.md          # This file
└── .github/
    └── copilot-instructions.md
```

### Key Classes and Functions
- **StepTracker**: Main application class
- **registerUser()**: User registration and setup
- **addSteps()**: Step tracking functionality
- **updateDashboard()**: Dashboard UI updates
- **updateLeaderboard()**: Leaderboard calculations and display
- **updateTeamStats()**: Team competition statistics

### Demo Data
The application includes demo data for testing purposes. Remove the `addDemoData()` call in the initialization to start with a clean slate.

## 📈 Scaling for Large Groups

### For 80-400 Participants
- **Performance**: Optimized for large datasets with efficient sorting algorithms
- **Storage**: Local storage can handle hundreds of users efficiently
- **UI**: Virtualized lists for large leaderboards (can be implemented if needed)
- **Teams**: Easily expandable to more teams as needed

### Potential Enhancements
- **Export Data**: CSV export for final results
- **Admin Dashboard**: Aggregate statistics and management
- **Real-time Sync**: Server integration for live updates across devices
- **Achievements System**: Badges and milestones
- **Photo Challenges**: Step verification with photos

## 🎯 Perfect For

- **Company Offsites**: Team building during corporate retreats
- **Health & Wellness Programs**: Encouraging workplace fitness
- **Competitions**: Friendly rivalry between departments/teams
- **Events**: Walking challenges during conferences or meetups

## 🤝 Contributing

Feel free to customize and enhance this application for your specific needs! The code is clean, well-commented, and designed to be easily modifiable.

## 📄 License

This project is open source and available under the MIT License.

---

**Ready to get your team moving? Open `index.html` and start your step tracking journey today!** 🏃‍♂️💨
