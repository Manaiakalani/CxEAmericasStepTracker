// Step Tracker Application
class StepTracker {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('stepTrackerUsers') || '[]');
        this.teams = [
            'CARE',
            'CCP',
            'IDNA',
            'Management',
            'Purview/CES',
            'Scale Enablement',
            'Shared Services',
            'Threat Protection'
        ];
        this.challenges = [
            {
                id: 'space-needle',
                title: 'Space Needle Steps',
                description: 'Climb the equivalent of the Space Needle height!',
                icon: 'fas fa-broadcast-tower',
                target: 10000,
                fact: 'The Space Needle is 605 feet tall and was built for the 1962 World\'s Fair.'
            },
            {
                id: 'pike-place',
                title: 'Pike Place Power Walk',
                description: 'Walk the length of Pike Place Market 5 times',
                icon: 'fas fa-store',
                target: 8000,
                fact: 'Pike Place Market opened in 1907 and is one of the oldest continuously operated public farmers\' markets in the US.'
            },
            {
                id: 'microsoft-campus',
                title: 'Microsoft Campus Trek',
                description: 'Walk the perimeter of Microsoft\'s Redmond campus',
                icon: 'fas fa-building',
                target: 12000,
                fact: 'Microsoft\'s main campus in Redmond spans over 500 acres and has more than 125 buildings.'
            },
            {
                id: 'puget-sound',
                title: 'Puget Sound Shoreline',
                description: 'Match the steps to walk along Puget Sound waterfront',
                icon: 'fas fa-water',
                target: 15000,
                fact: 'Puget Sound is a complex estuarine system of interconnected marine waterways and basins.'
            },
            {
                id: 'clippy-quest',
                title: 'Clippy\'s Assistant Quest',
                description: 'Help Clippy by taking as many steps as Office 97 had features!',
                icon: 'fas fa-paperclip',
                target: 9700,
                fact: 'Clippy debuted in Office 97 and became one of Microsoft\'s most memorable (and controversial) features!'
            },
            {
                id: 'windows-95-launch',
                title: 'Windows 95 Launch Walk',
                description: 'Match the steps to Windows 95\'s August 24, 1995 launch celebration',
                icon: 'fab fa-windows',
                target: 19950,
                fact: 'Windows 95 launched on August 24, 1995, with a $300 million marketing campaign featuring the Rolling Stones!'
            },
            {
                id: 'master-chief-march',
                title: 'Master Chief\'s March',
                description: 'Walk like the legendary Spartan-117 through the Halo universe',
                icon: 'fas fa-rocket',
                target: 11700,
                fact: 'Master Chief (Spartan-117) first appeared in Halo: Combat Evolved in 2001, revolutionizing console gaming!'
            },
            {
                id: 'bill-gates-bridge',
                title: 'Bill Gates Memorial Bridge',
                description: 'Cross the equivalent of all bridges in the greater Seattle area',
                icon: 'fas fa-road',
                target: 14000,
                fact: 'The Seattle area has over 400 bridges, and Bill Gates grew up just south of the city in the Eastside region!'
            }
        ];
        this.currentTab = 'dashboard';
        this.leaderboardPeriod = 'today';
        this.recentActivities = JSON.parse(localStorage.getItem('stepTrackerActivities') || '[]');
        
        // Performance optimizations - cache frequently used DOM elements
        this.domCache = {};
        this.debounceTimers = {};
        this.intersectionObserver = null;
        
        // Initialize Intersection Observer for lazy loading
        this.initIntersectionObserver();
        
        // Dynamic content arrays
        this.greetings = [
            { text: 'Hello', lang: 'English' },
            { text: 'Hola', lang: 'Spanish' },
            { text: 'Bonjour', lang: 'French' },
            { text: 'Guten Tag', lang: 'German' },
            { text: 'Ciao', lang: 'Italian' },
            { text: 'Olá', lang: 'Portuguese' },
            { text: 'こんにちは', lang: 'Japanese' },
            { text: '안녕하세요', lang: 'Korean' },
            { text: '你好', lang: 'Chinese' },
            { text: 'Привет', lang: 'Russian' },
            { text: 'नमस्ते', lang: 'Hindi' },
            { text: 'مرحبا', lang: 'Arabic' }
        ];

        this.motivationalPhrases = [
            "Let's make today count with every step!",
            "Every step brings you closer to your goals!",
            "Your journey to greatness starts with a single step!",
            "Make every step an achievement!",
            "Step by step, you're building a healthier you!",
            "Today's steps are tomorrow's strength!",
            "Walk your way to victory!",
            "Each step is a small win worth celebrating!",
            "Keep moving forward, one step at a time!",
            "Your steps today shape your future self!",
            "Step into greatness!",
            "Progress is measured in steps, not leaps!",
            "Every step counts toward your success!",
            "Walk with purpose, step with pride!",
            "Transform your day, one step at a time!"
        ];
        
        this.init();
    }

    init() {
        const startTime = performance.now();
        
        try {
            this.loadCurrentUser();
            this.setupEventListeners();
            this.updateUI();
            this.loadWeather();
            this.initDarkMode();
            this.initDynamicContent();
            
            if (!this.currentUser) {
                this.showWelcomeScreen();
            } else {
                this.hideWelcomeScreen();
                this.updateDashboard();
                this.updateLeaderboard();
                this.updateTeamStats();
                this.updateProfile();
            }

            // Performance monitoring
            const endTime = performance.now();
            console.log(`App initialization completed in ${Math.round(endTime - startTime)}ms`);
            
            // Check for localStorage quota issues
            this.checkStorageQuota();
            
            // Track performance metrics
            this.trackPerformanceMetrics();
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showMessage('Failed to load the application. Please refresh the page.', 'error');
        }
    }

    // Performance monitoring
    trackPerformanceMetrics() {
        if ('performance' in window) {
            // Track Core Web Vitals
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'measure' && entry.name === 'step-tracker-init') {
                        console.log(`App initialization: ${entry.duration.toFixed(2)}ms`);
                    }
                }
            });
            observer.observe({ entryTypes: ['measure'] });
            
            // Track memory usage (if available)
            if ('memory' in performance) {
                const memory = performance.memory;
                console.log(`Memory usage: ${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB`);
                
                // Warn if memory usage is high
                if (memory.usedJSHeapSize > 50 * 1048576) { // 50MB
                    console.warn('High memory usage detected');
                }
            }
            
            // Track user interactions
            this.trackUserInteractions();
            
            // Force favicon refresh if needed
            this.ensureFaviconLoads();
        }
    }

    // Ensure favicon loads properly across all browsers
    ensureFaviconLoads() {
        try {
            // Force favicon refresh by adding timestamp
            const favicon = document.querySelector("link[rel*='icon']");
            if (favicon) {
                const faviconUrl = favicon.href;
                favicon.href = faviconUrl + '?v=' + Date.now();
            }
            
            // Fallback for browsers that don't support SVG favicons
            const supportsSVGFavicon = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
            if (!supportsSVGFavicon) {
                console.log('SVG favicon not supported, using fallback');
                // The HTML already includes PNG fallbacks via data URIs
            }
        } catch (error) {
            console.error('Favicon loading error:', error);
        }
    }

    // Track user interactions for analytics
    trackUserInteractions() {
        let interactionCount = 0;
        const trackInteraction = (type) => {
            interactionCount++;
            console.log(`User interaction #${interactionCount}: ${type}`);
        };

        // Track tab switches
        const originalSwitchTab = this.switchTab.bind(this);
        this.switchTab = (tabName) => {
            trackInteraction(`tab-switch-${tabName}`);
            return originalSwitchTab(tabName);
        };

        // Track step additions
        const originalAddSteps = this.addSteps.bind(this);
        this.addSteps = () => {
            trackInteraction('add-steps');
            return originalAddSteps();
        };
    }

    // Check localStorage quota and warn if approaching limit
    checkStorageQuota() {
        try {
            const used = JSON.stringify(localStorage).length;
            const limit = 5 * 1024 * 1024; // 5MB typical limit
            const usagePercent = (used / limit) * 100;
            
            if (usagePercent > 80) {
                console.warn(`localStorage usage: ${usagePercent.toFixed(1)}%`);
                if (usagePercent > 90) {
                    this.showMessage('Storage nearly full. Consider resetting data.', 'error');
                }
            }
        } catch (error) {
            console.error('Could not check storage quota:', error);
        }
    }

    // Global error handler
    handleError(error, context = 'Unknown') {
        console.error(`Error in ${context}:`, error);
        
        // Log error details
        const errorDetails = {
            message: error.message,
            stack: error.stack,
            context: context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // Store error for debugging (limit to last 10 errors)
        const errors = JSON.parse(localStorage.getItem('stepTrackerErrors') || '[]');
        errors.unshift(errorDetails);
        if (errors.length > 10) {
            errors.splice(10);
        }
        
        try {
            localStorage.setItem('stepTrackerErrors', JSON.stringify(errors));
        } catch (storageError) {
            console.error('Could not save error log:', storageError);
        }
        
        // Show user-friendly error message
        this.showMessage('An error occurred. The issue has been logged.', 'error');
    }

    // Get error logs for debugging
    getErrorLogs() {
        return JSON.parse(localStorage.getItem('stepTrackerErrors') || '[]');
    }

    // Clear error logs
    clearErrorLogs() {
        localStorage.removeItem('stepTrackerErrors');
        console.log('Error logs cleared');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.closest('.nav-btn').dataset.tab);
            });
        });

        // Registration form
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.registerUser();
        });

        // Add steps
        document.getElementById('addStepsBtn').addEventListener('click', () => {
            this.addSteps();
        });

        document.getElementById('stepsInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addSteps();
            }
        });

        // Leaderboard tabs
        document.querySelectorAll('.leaderboard-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLeaderboardPeriod(e.target.dataset.period);
            });
        });

        // Profile actions
        document.getElementById('editGoalBtn').addEventListener('click', () => {
            this.editDailyGoal();
        });

        document.getElementById('resetDataBtn').addEventListener('click', () => {
            this.resetData();
        });

        // Hamburger menu
        document.getElementById('hamburgerMenu').addEventListener('click', () => {
            this.toggleHamburgerMenu();
        });

        document.getElementById('closeFlyout').addEventListener('click', () => {
            this.closeHamburgerMenu();
        });

        document.getElementById('toggleDarkModeMenu').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        document.getElementById('showFAQ').addEventListener('click', () => {
            this.showFAQModal();
        });

        document.getElementById('fileFeedback').addEventListener('click', () => {
            this.openGitHubIssue('bug');
        });

        document.getElementById('fileFeature').addEventListener('click', () => {
            this.openGitHubIssue('feature');
        });

        document.getElementById('viewGitHub').addEventListener('click', () => {
            window.open('https://github.com/Manaiakalani/CxEAmericasStepTracker', '_blank');
        });

        // FAQ Modal
        document.getElementById('closeFAQ').addEventListener('click', () => {
            this.closeFAQModal();
        });

        // Spotify Widget
        document.getElementById('spotifyWidget').addEventListener('click', () => {
            this.openSpotifyPlaylist();
        });

        // Close flyout when clicking outside
        document.addEventListener('click', (e) => {
            const flyout = document.getElementById('hamburgerFlyout');
            const hamburgerBtn = document.getElementById('hamburgerMenu');
            const modal = document.getElementById('faqModal');
            
            if (flyout.classList.contains('open') && 
                !flyout.contains(e.target) && 
                !hamburgerBtn.contains(e.target)) {
                this.closeHamburgerMenu();
            }

            // Close FAQ modal when clicking outside
            if (modal.classList.contains('show') && e.target === modal) {
                this.closeFAQModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when not typing in inputs
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            // Alt/Option + number for tab switching
            if (e.altKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.switchTab('dashboard');
                        break;
                    case '2':
                        e.preventDefault();
                        this.switchTab('leaderboard');
                        break;
                    case '3':
                        e.preventDefault();
                        this.switchTab('teams');
                        break;
                    case '4':
                        e.preventDefault();
                        this.switchTab('profile');
                        break;
                }
            }

            // Escape key to close modals/flyouts
            if (e.key === 'Escape') {
                const flyout = this.getElement('hamburgerFlyout');
                const modal = this.getElement('faqModal');
                
                if (flyout && flyout.classList.contains('open')) {
                    this.closeHamburgerMenu();
                } else if (modal && modal.classList.contains('show')) {
                    this.closeFAQModal();
                }
            }

            // Ctrl/Cmd + D for dark mode toggle
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                this.toggleDarkMode();
            }
        });
    }

    loadCurrentUser() {
        const userId = localStorage.getItem('currentStepTrackerUser');
        if (userId) {
            this.currentUser = this.users.find(user => user.id === userId);
        }
    }

    registerUser() {
        const name = document.getElementById('userName').value.trim();
        const team = document.getElementById('userTeam').value;
        const dailyGoal = parseInt(document.getElementById('dailyGoal').value);

        if (!name || !team) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        const user = {
            id: this.generateId(),
            name,
            team,
            dailyGoal,
            steps: {},
            joinedDate: new Date().toISOString(),
            totalSteps: 0
        };

        this.users.push(user);
        this.currentUser = user;
        
        this.saveData();
        localStorage.setItem('currentStepTrackerUser', user.id);
        
        this.showMessage(`Welcome ${name}! Let's start tracking those steps! 🚀`, 'success');
        this.hideWelcomeScreen();
        this.updateUI();
    }

    addSteps() {
        if (!this.currentUser) return;

        const stepsInput = document.getElementById('stepsInput');
        const steps = parseInt(stepsInput.value);

        if (!steps || steps < 0 || steps > 50000) {
            this.showMessage('Please enter a valid number of steps (0-50,000)', 'error');
            return;
        }

        const today = this.getToday();
        
        // Reset daily overachiever flag if it's a new day
        if (!this.currentUser.lastActiveDate || this.currentUser.lastActiveDate !== today) {
            this.currentUser.dailyOverachieverNotified = false;
            this.currentUser.lastActiveDate = today;
        }
        
        if (!this.currentUser.steps[today]) {
            this.currentUser.steps[today] = 0;
        }
        
        this.currentUser.steps[today] += steps;
        this.currentUser.totalSteps += steps;
        
        stepsInput.value = '';
        this.saveData();
        this.updateUI();
        
        const formatSteps = this.formatNumber(steps);
        this.showMessage(`Added ${formatSteps} steps! Great job! 👏`, 'success');
        
        // Add to recent activities
        this.addRecentActivity('steps', `${this.currentUser.name} added ${formatSteps} steps`, new Date());
        
        // Show live notification
        this.showLiveNotification('steps', `${this.currentUser.name} added ${formatSteps} steps!`, 'fas fa-walking');
        
        // Check if goal is reached
        if (this.currentUser.steps[today] >= this.currentUser.dailyGoal) {
            const isFirstTime = this.currentUser.steps[today] - steps < this.currentUser.dailyGoal;
            if (isFirstTime) {
                this.showMessage(`🎉 Daily goal achieved! You're crushing it!`, 'success');
                this.addRecentActivity('achievement', `${this.currentUser.name} reached their daily goal!`, new Date());
                this.showLiveNotification('achievement', `🎉 ${this.currentUser.name} reached their daily goal!`, 'fas fa-trophy');
            }
        }

        // Check for challenge completions
        this.checkChallengeCompletions(this.currentUser.totalSteps - steps, this.currentUser.totalSteps);
        
        // Check for overachiever status
        this.checkOverachieverStatus(steps);
    }

    updateDashboard() {
        if (!this.currentUser) return;

        const today = this.getToday();
        const todaySteps = this.currentUser.steps[today] || 0;
        const dailyGoal = this.currentUser.dailyGoal;
        
        // Update user name and dynamic content
        document.getElementById('userDisplayName').textContent = this.currentUser.name;
        this.setRandomGreeting();
        this.setRandomMotivationalPhrase();
        
        // Update current date
        document.getElementById('currentDate').textContent = this.formatDate(new Date());
        
        // Update today's steps
        document.getElementById('todaySteps').textContent = this.formatNumber(todaySteps);
        document.getElementById('dailyGoalDisplay').textContent = this.formatNumber(dailyGoal);
        
        // Update remaining steps
        const remaining = Math.max(0, dailyGoal - todaySteps);
        document.getElementById('remainingSteps').textContent = this.formatNumber(remaining);
        
        // Update progress percentage
        const percentage = Math.min(100, Math.round((todaySteps / dailyGoal) * 100));
        document.getElementById('progressPercentage').textContent = `${percentage}%`;
        
        // Update progress circle
        const circumference = 2 * Math.PI * 50; // radius = 50
        const offset = circumference - (percentage / 100 * circumference);
        document.getElementById('progressCircle').style.strokeDashoffset = offset;
        
        // Update total steps in header
        document.getElementById('totalSteps').textContent = this.formatNumber(this.currentUser.totalSteps);
        
        // Update weekly chart
        this.updateWeeklyChart();
        
        // Update challenges
        this.updateChallenges();
        
        // Update recent activities
        this.updateRecentActivities();
    }

    updateWeeklyChart() {
        const weeklyChart = document.getElementById('weeklyChart');
        const last7Days = this.getLast7Days();
        let maxSteps = 1000; // minimum scale
        
        // Find max steps for scaling
        last7Days.forEach(day => {
            const steps = this.currentUser.steps[day.date] || 0;
            maxSteps = Math.max(maxSteps, steps);
        });
        
        weeklyChart.innerHTML = '';
        
        last7Days.forEach(day => {
            const steps = this.currentUser.steps[day.date] || 0;
            const height = Math.max(20, (steps / maxSteps) * 120);
            
            const barContainer = document.createElement('div');
            barContainer.className = 'day-bar';
            barContainer.style.height = `${height}px`;
            
            const label = document.createElement('div');
            label.className = 'day-label';
            label.textContent = day.label;
            
            const value = document.createElement('div');
            value.className = 'day-value';
            value.textContent = this.formatNumber(steps);
            
            barContainer.appendChild(label);
            barContainer.appendChild(value);
            weeklyChart.appendChild(barContainer);
        });
    }

    updateChallenges() {
        if (!this.currentUser) return;
        
        const challengesContainer = document.getElementById('challengesContainer');
        challengesContainer.innerHTML = '';
        
        this.challenges.forEach(challenge => {
            const userProgress = this.currentUser.totalSteps;
            const progressPercentage = Math.min(100, (userProgress / challenge.target) * 100);
            const isCompleted = userProgress >= challenge.target;
            
            const challengeElement = document.createElement('div');
            challengeElement.className = `challenge-item ${isCompleted ? 'challenge-completed' : ''}`;
            challengeElement.innerHTML = `
                <div class="challenge-header">
                    <div class="challenge-info">
                        <div class="challenge-title">
                            <i class="${challenge.icon}"></i>
                            <span>${challenge.title}</span>
                            ${isCompleted ? '<i class="fas fa-check-circle challenge-completed-icon"></i>' : ''}
                        </div>
                        <div class="challenge-description">${challenge.description}</div>
                    </div>
                    <div class="challenge-progress-info">${this.formatNumber(userProgress)} / ${this.formatNumber(challenge.target)}</div>
                </div>
                <div class="challenge-progress-bar">
                    <div class="challenge-progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
                <div class="challenge-fact">${challenge.fact}</div>
            `;
            
            challengesContainer.appendChild(challengeElement);
        });
    }

    updateLeaderboard() {
        const leaderboardList = document.getElementById('leaderboardList');
        let sortedUsers = [...this.users];
        
        // Sort based on selected period
        switch (this.leaderboardPeriod) {
            case 'today':
                const today = this.getToday();
                sortedUsers.sort((a, b) => {
                    const aSteps = a.steps[today] || 0;
                    const bSteps = b.steps[today] || 0;
                    return bSteps - aSteps;
                });
                break;
            case 'week':
                const last7Days = this.getLast7Days().map(d => d.date);
                sortedUsers.sort((a, b) => {
                    const aWeekSteps = last7Days.reduce((sum, date) => sum + (a.steps[date] || 0), 0);
                    const bWeekSteps = last7Days.reduce((sum, date) => sum + (b.steps[date] || 0), 0);
                    return bWeekSteps - aWeekSteps;
                });
                break;
            case 'total':
                sortedUsers.sort((a, b) => b.totalSteps - a.totalSteps);
                break;
        }
        
        leaderboardList.innerHTML = '';
        
        sortedUsers.forEach((user, index) => {
            let steps;
            
            switch (this.leaderboardPeriod) {
                case 'today':
                    steps = user.steps[this.getToday()] || 0;
                    break;
                case 'week':
                    const last7Days = this.getLast7Days().map(d => d.date);
                    steps = last7Days.reduce((sum, date) => sum + (user.steps[date] || 0), 0);
                    break;
                case 'total':
                    steps = user.totalSteps;
                    break;
            }
            
            const item = document.createElement('div');
            item.className = `leaderboard-item ${this.currentUser && user.id === this.currentUser.id ? 'current-user' : ''}`;
            
            const rank = index + 1;
            let rankClass = '';
            if (rank === 1) rankClass = 'gold';
            else if (rank === 2) rankClass = 'silver';
            else if (rank === 3) rankClass = 'bronze';
            
            // Check if user is an overachiever
            let overachieverBadge = '';
            if (this.isOverachiever(user, steps)) {
                overachieverBadge = '<span class="overachiever-badge" title="Overachiever!">⭐</span>';
            }
            
            item.innerHTML = `
                <div class="leaderboard-rank ${rankClass}">${rank}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${user.name} ${overachieverBadge}</div>
                    <div class="leaderboard-team">${user.team}</div>
                </div>
                <div class="leaderboard-steps">${this.formatNumber(steps)}</div>
            `;
            
            leaderboardList.appendChild(item);
        });
    }

    updateTeamStats() {
        const teamLeaderboard = document.getElementById('teamLeaderboard');
        const teamStats = {};
        
        // Calculate team statistics
        this.teams.forEach(teamName => {
            teamStats[teamName] = {
                name: teamName,
                members: 0,
                totalSteps: 0,
                avgSteps: 0
            };
        });
        
        this.users.forEach(user => {
            if (teamStats[user.team]) {
                teamStats[user.team].members++;
                teamStats[user.team].totalSteps += user.totalSteps;
            }
        });
        
        // Calculate averages and sort
        const sortedTeams = Object.values(teamStats)
            .filter(team => team.members > 0)
            .map(team => ({
                ...team,
                avgSteps: Math.round(team.totalSteps / team.members)
            }))
            .sort((a, b) => b.totalSteps - a.totalSteps);
        
        teamLeaderboard.innerHTML = '';
        
        sortedTeams.forEach((team, index) => {
            const item = document.createElement('div');
            item.className = `team-item ${this.currentUser && team.name === this.currentUser.team ? 'current-team' : ''}`;
            
            item.innerHTML = `
                <div class="team-rank">${index + 1}</div>
                <div class="team-info">
                    <div class="team-name">${team.name}</div>
                    <div class="team-members">${team.members} member${team.members !== 1 ? 's' : ''}</div>
                </div>
                <div class="team-stats">
                    <div class="team-steps">${this.formatNumber(team.totalSteps)}</div>
                    <div class="team-avg">${this.formatNumber(team.avgSteps)} avg</div>
                </div>
            `;
            
            teamLeaderboard.appendChild(item);
        });
    }

    updateProfile() {
        if (!this.currentUser) return;
        
        document.getElementById('profileName').textContent = this.currentUser.name;
        document.getElementById('profileTeam').textContent = this.currentUser.team;
        document.getElementById('profileTotalSteps').textContent = this.formatNumber(this.currentUser.totalSteps);
        
        // Calculate average steps per day
        const daysActive = Object.keys(this.currentUser.steps).length;
        const avgSteps = daysActive > 0 ? Math.round(this.currentUser.totalSteps / daysActive) : 0;
        document.getElementById('profileAvgSteps').textContent = this.formatNumber(avgSteps);
        
        // Calculate rank
        const sortedUsers = [...this.users].sort((a, b) => b.totalSteps - a.totalSteps);
        const rank = sortedUsers.findIndex(user => user.id === this.currentUser.id) + 1;
        document.getElementById('profileRank').textContent = `#${rank}`;
    }

    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        document.getElementById(`${tabName}Tab`).style.display = 'flex';
        this.currentTab = tabName;
        
        // Update content based on tab
        switch (tabName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'leaderboard':
                this.updateLeaderboard();
                break;
            case 'teams':
                this.updateTeamStats();
                break;
            case 'profile':
                this.updateProfile();
                break;
        }
    }

    switchLeaderboardPeriod(period) {
        this.leaderboardPeriod = period;
        
        document.querySelectorAll('.leaderboard-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.period === period);
        });
        
        this.updateLeaderboard();
    }

    editDailyGoal() {
        const newGoal = prompt('Enter your new daily step goal:', this.currentUser.dailyGoal);
        
        if (newGoal !== null) {
            const goal = parseInt(newGoal);
            if (goal > 0 && goal <= 50000) {
                this.currentUser.dailyGoal = goal;
                this.saveData();
                this.updateDashboard();
                this.showMessage(`Daily goal updated to ${this.formatNumber(goal)} steps!`, 'success');
            } else {
                this.showMessage('Please enter a valid goal (1-50,000 steps)', 'error');
            }
        }
    }

    resetData() {
        if (confirm('Are you sure you want to reset all your step data? This cannot be undone.')) {
            this.currentUser.steps = {};
            this.currentUser.totalSteps = 0;
            this.saveData();
            this.updateUI();
            this.showMessage('All step data has been reset.', 'success');
        }
    }

    showWelcomeScreen() {
        document.getElementById('welcomeScreen').style.display = 'flex';
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
    }

    hideWelcomeScreen() {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('dashboardTab').style.display = 'flex';
    }

    updateUI() {
        if (this.currentUser) {
            this.updateDashboard();
            this.updateLeaderboard();
            this.updateTeamStats();
            this.updateProfile();
        }
    }

    showMessage(text, type = 'success') {
        const container = document.getElementById('messageContainer');
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        
        container.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    // Utility functions
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Performance optimization: DOM element caching
    getElement(id) {
        if (!this.domCache[id]) {
            this.domCache[id] = document.getElementById(id);
        }
        return this.domCache[id];
    }

    // Debounced function execution to prevent excessive calls
    debounce(func, delay, key) {
        return (...args) => {
            clearTimeout(this.debounceTimers[key]);
            this.debounceTimers[key] = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Optimized batch DOM updates
    batchDOMUpdates(updates) {
        requestAnimationFrame(() => {
            updates.forEach(update => update());
        });
    }

    // Intersection Observer for lazy loading
    initIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            this.intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        if (element.dataset.lazyLoad) {
                            this.loadLazyContent(element);
                            this.intersectionObserver.unobserve(element);
                        }
                    }
                });
            }, { threshold: 0.1 });
        }
    }

    loadLazyContent(element) {
        // Lazy load heavy content like charts or images
        const type = element.dataset.lazyLoad;
        switch (type) {
            case 'weekly-chart':
                this.updateWeeklyChart();
                break;
            case 'challenges':
                this.updateChallenges();
                break;
        }
        element.removeAttribute('data-lazy-load');
    }

    getToday() {
        return new Date().toISOString().split('T')[0];
    }

    getLast7Days() {
        const days = [];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push({
                date: date.toISOString().split('T')[0],
                label: dayNames[date.getDay()]
            });
        }
        
        return days;
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatNumber(num) {
        return num.toLocaleString();
    }

    async loadWeather() {
        try {
            const weatherData = await this.getLiveWeatherData();
            this.updateWeatherDisplay(weatherData);
        } catch (error) {
            console.error('Failed to load live weather:', error);
            try {
                // Try fallback weather data
                const fallbackData = await this.getAlternativeWeatherData();
                this.updateWeatherDisplay(fallbackData);
            } catch (fallbackError) {
                console.error('All weather sources failed:', fallbackError);
                // Final fallback to mock data
                const mockWeatherData = await this.getMockWeatherData();
                this.updateWeatherDisplay(mockWeatherData);
            }
        }
    }

    async getLiveWeatherData() {
        // Using Open-Meteo API for real weather data - free, no API key required
        try {
            // Get coordinates for Redmond, WA (approximate)
            const latitude = 47.6740;
            const longitude = -122.1215;
            
            // Fetch weather data from Open-Meteo
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m&timezone=America/Los_Angeles`);
            
            if (!response.ok) {
                throw new Error('Open-Meteo API failed');
            }
            
            const data = await response.json();
            
            // Parse weather data
            const currentWeather = data.current_weather;
            const tempC = Math.round(currentWeather.temperature * 10) / 10;
            const tempF = Math.round((tempC * 9/5 + 32) * 10) / 10;
            
            // Map weather codes to conditions
            const weatherCondition = this.getWeatherCondition(currentWeather.weathercode);
            
            // Get current hour humidity
            const currentHour = new Date().getHours();
            const humidity = data.hourly.relativehumidity_2m[currentHour] || 70;
            
            return {
                tempC: tempC,
                tempF: tempF,
                condition: weatherCondition,
                humidity: humidity
            };
        } catch (error) {
            console.error('Open-Meteo API failed:', error);
            throw error;
        }
    }

    // Map Open-Meteo weather codes to readable conditions
    getWeatherCondition(weatherCode) {
        const weatherCodes = {
            0: 'clear sky',
            1: 'mainly clear',
            2: 'partly cloudy',
            3: 'overcast',
            45: 'fog',
            48: 'depositing rime fog',
            51: 'light drizzle',
            53: 'moderate drizzle',
            55: 'dense drizzle',
            56: 'light freezing drizzle',
            57: 'dense freezing drizzle',
            61: 'slight rain',
            63: 'moderate rain',
            65: 'heavy rain',
            66: 'light freezing rain',
            67: 'heavy freezing rain',
            71: 'slight snow fall',
            73: 'moderate snow fall',
            75: 'heavy snow fall',
            77: 'snow grains',
            80: 'slight rain showers',
            81: 'moderate rain showers',
            82: 'violent rain showers',
            85: 'slight snow showers',
            86: 'heavy snow showers',
            95: 'thunderstorm',
            96: 'thunderstorm with slight hail',
            99: 'thunderstorm with heavy hail'
        };
        
        return weatherCodes[weatherCode] || 'unknown';
    }

    async getAlternativeWeatherData() {
        console.log('Using fallback weather data');
        
        // Fallback to simulated Seattle-like weather
        const conditions = ['partly cloudy', 'light rain', 'overcast', 'clear sky', 'moderate rain'];
        const baseTemp = 15; // Celsius, typical Seattle winter
        
        return {
            tempC: Math.round((baseTemp + (Math.random() * 10 - 5)) * 10) / 10,
            tempF: Math.round(((baseTemp + (Math.random() * 10 - 5)) * 9/5 + 32) * 10) / 10,
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            humidity: Math.floor(Math.random() * 30) + 60 // 60-90%
        };
    }

    async getMockWeatherData() {
        // Simulate API call with realistic Redmond weather data for August
        return new Promise((resolve) => {
            setTimeout(() => {
                // More realistic August weather for Redmond, WA
                const currentHour = new Date().getHours();
                const isEvening = currentHour >= 18 || currentHour <= 6;
                
                // August temperatures in Redmond typically range from 15-26°C
                let baseTemp;
                if (currentHour >= 6 && currentHour <= 10) {
                    baseTemp = 16 + Math.random() * 4; // Morning: 16-20°C
                } else if (currentHour >= 11 && currentHour <= 16) {
                    baseTemp = 22 + Math.random() * 4; // Afternoon: 22-26°C
                } else if (currentHour >= 17 && currentHour <= 21) {
                    baseTemp = 20 + Math.random() * 3; // Evening: 20-23°C
                } else {
                    baseTemp = 15 + Math.random() * 3; // Night: 15-18°C
                }
                
                const tempC = Math.round(baseTemp * 10) / 10; // Round to 1 decimal
                const tempF = Math.round((tempC * 9/5 + 32) * 10) / 10;
                
                // More realistic weather conditions for August in Seattle area
                const weatherOptions = [
                    { condition: 'partly cloudy', weight: 30 },
                    { condition: 'sunny', weight: 25 },
                    { condition: 'overcast', weight: 20 },
                    { condition: 'light rain', weight: 15 },
                    { condition: 'mostly sunny', weight: 10 }
                ];
                
                // Weighted random selection
                const random = Math.random() * 100;
                let cumulativeWeight = 0;
                let condition = 'partly cloudy';
                
                for (const option of weatherOptions) {
                    cumulativeWeight += option.weight;
                    if (random <= cumulativeWeight) {
                        condition = option.condition;
                        break;
                    }
                }
                
                // Realistic humidity for August (typically 60-85% in Seattle area)
                const humidity = Math.floor(Math.random() * 25) + 60;
                
                resolve({
                    tempC,
                    tempF,
                    condition,
                    humidity
                });
            }, 1000);
        });
    }

    updateWeatherDisplay(weatherData) {
        const tempElement = document.getElementById('weatherTemp');
        const adviceElement = document.getElementById('weatherAdvice');
        
        if (!weatherData) {
            tempElement.textContent = 'Weather unavailable';
            adviceElement.textContent = 'Check local forecast';
            return;
        }

        tempElement.textContent = `${weatherData.tempC}°C / ${weatherData.tempF}°F`;
        
        // More accurate clothing advice based on temperature and conditions
        let advice = '';
        
        // Temperature-based clothing advice
        if (weatherData.tempC < 5) {
            advice = '🧥 Heavy jacket needed';
        } else if (weatherData.tempC < 10) {
            advice = '🧥 Warm jacket recommended';
        } else if (weatherData.tempC < 15) {
            advice = '🧥 Light jacket suggested';
        } else if (weatherData.tempC < 20) {
            advice = '👕 Light layers ideal';
        } else if (weatherData.tempC < 25) {
            advice = '👕 Perfect for walking';
        } else if (weatherData.tempC < 30) {
            advice = '☀️ Great weather, stay cool';
        } else {
            advice = '🌡️ Very warm, stay hydrated';
        }
        
        // Weather condition adjustments
        if (weatherData.condition.includes('rain') || weatherData.condition.includes('shower')) {
            advice += ' ☔ Umbrella essential';
        } else if (weatherData.condition.includes('drizzle')) {
            advice += ' ☔ Light rain gear';
        } else if (weatherData.condition.includes('snow')) {
            advice += ' ❄️ Winter gear needed';
        } else if (weatherData.condition.includes('wind')) {
            advice += ' 💨 Windbreaker helpful';
        } else if (weatherData.condition.includes('sunny') && weatherData.tempC > 20) {
            advice += ' 🕶️ Sunglasses recommended';
        }
        
        // Humidity adjustments
        if (weatherData.humidity > 80) {
            advice += ' 💧 High humidity';
        } else if (weatherData.humidity < 30) {
            advice += ' 🏜️ Low humidity';
        }
        
        adviceElement.textContent = advice;
    }

    saveData() {
        // Debounced save to prevent excessive localStorage writes
        this.debouncedSave = this.debouncedSave || this.debounce(() => {
            try {
                localStorage.setItem('stepTrackerUsers', JSON.stringify(this.users));
                localStorage.setItem('stepTrackerActivities', JSON.stringify(this.recentActivities));
            } catch (error) {
                console.error('Failed to save data to localStorage:', error);
                this.showMessage('Failed to save data. Storage may be full.', 'error');
            }
        }, 500, 'save');
        
        this.debouncedSave();
    }

    // Dynamic Content Initialization
    initDynamicContent() {
        this.setRandomGreeting();
        this.setRandomMotivationalPhrase();
    }

    setRandomGreeting() {
        const randomGreeting = this.greetings[Math.floor(Math.random() * this.greetings.length)];
        const greetingElement = document.getElementById('dynamicGreeting');
        if (greetingElement) {
            greetingElement.textContent = randomGreeting.text;
            greetingElement.title = `${randomGreeting.text} (${randomGreeting.lang})`;
        }
    }

    setRandomMotivationalPhrase() {
        const randomPhrase = this.motivationalPhrases[Math.floor(Math.random() * this.motivationalPhrases.length)];
        const phraseElement = document.getElementById('motivationalPhrase');
        if (phraseElement) {
            phraseElement.textContent = randomPhrase;
        }
    }

    // Recent Activities Management
    addRecentActivity(type, message, timestamp) {
        const activity = {
            id: this.generateId(),
            type,
            message,
            timestamp: timestamp.toISOString(),
            user: this.currentUser ? this.currentUser.name : 'Unknown'
        };

        this.recentActivities.unshift(activity);
        
        // Keep only the last 20 activities
        if (this.recentActivities.length > 20) {
            this.recentActivities = this.recentActivities.slice(0, 20);
        }

        this.saveData();
        this.updateRecentActivities();
    }

    updateRecentActivities() {
        const container = document.getElementById('recentActivityList');
        if (!container) return;

        if (this.recentActivities.length === 0) {
            container.innerHTML = `
                <div class="no-activity">
                    <i class="fas fa-clock"></i>
                    <span>No recent activity</span>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        
        const recent = this.recentActivities.slice(0, 10);
        recent.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            
            const icon = activity.type === 'achievement' ? 'fas fa-trophy' : 'fas fa-walking';
            const timeAgo = this.formatTimeAgo(new Date(activity.timestamp));
            
            item.innerHTML = `
                <i class="${icon}"></i>
                <span>${activity.message}</span>
                <span class="activity-time">${timeAgo}</span>
            `;
            
            container.appendChild(item);
        });
    }

    // Live Notifications
    showLiveNotification(type, message, icon) {
        const container = document.getElementById('liveNotifications');
        const notification = document.createElement('div');
        
        notification.className = `live-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="${icon}"></i>
                </div>
                <div class="notification-text">${message}</div>
                <div class="notification-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;
        
        container.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutLeft 0.3s ease forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // Challenge completion checking
    checkChallengeCompletions(previousTotal, currentTotal) {
        this.challenges.forEach(challenge => {
            const wasCompleted = previousTotal >= challenge.target;
            const isNowCompleted = currentTotal >= challenge.target;
            
            if (!wasCompleted && isNowCompleted) {
                this.addRecentActivity('achievement', `${this.currentUser.name} completed "${challenge.title}"!`, new Date());
                this.showLiveNotification('achievement', `🏆 ${this.currentUser.name} completed "${challenge.title}"!`, challenge.icon);
                
                // Check if they're an overachiever (significantly exceeded the target)
                const overachievementThreshold = challenge.target * 1.5; // 150% of target
                if (currentTotal >= overachievementThreshold) {
                    setTimeout(() => {
                        this.showOverachieverNotification(challenge, currentTotal);
                    }, 2000); // Show after the completion notification
                }
            }
        });
    }

    // Overachiever detection
    checkOverachieverStatus(stepsAdded) {
        const today = this.getToday();
        const todaySteps = this.currentUser.steps[today] || 0;
        const dailyGoal = this.currentUser.dailyGoal;
        
        // Daily goal overachiever (200% of daily goal)
        const dailyOverachieverThreshold = dailyGoal * 2;
        if (todaySteps >= dailyOverachieverThreshold && !this.currentUser.dailyOverachieverNotified) {
            this.currentUser.dailyOverachieverNotified = true;
            this.addRecentActivity('overachiever', `${this.currentUser.name} is a daily overachiever with ${this.formatNumber(todaySteps)} steps!`, new Date());
            this.showLiveNotification('overachiever', `🌟 ${this.currentUser.name} is a daily overachiever! ${this.formatNumber(todaySteps)} steps!`, 'fas fa-star');
        }
        
        // Single session overachiever (10,000+ steps in one entry)
        if (stepsAdded >= 10000) {
            this.addRecentActivity('overachiever', `${this.currentUser.name} added ${this.formatNumber(stepsAdded)} steps in one go! Overachiever!`, new Date());
            this.showLiveNotification('overachiever', `🚀 ${this.currentUser.name} added ${this.formatNumber(stepsAdded)} steps! Amazing!`, 'fas fa-fire');
        }
        
        // Total steps milestones
        const totalSteps = this.currentUser.totalSteps;
        const milestones = [50000, 100000, 150000, 200000, 250000];
        
        milestones.forEach(milestone => {
            if (totalSteps >= milestone && totalSteps - stepsAdded < milestone) {
                this.addRecentActivity('milestone', `${this.currentUser.name} reached ${this.formatNumber(milestone)} total steps! Incredible dedication!`, new Date());
                this.showLiveNotification('milestone', `🎯 ${this.currentUser.name} reached ${this.formatNumber(milestone)} total steps!`, 'fas fa-mountain');
            }
        });
        
        this.saveData();
    }

    showOverachieverNotification(challenge, currentSteps) {
        const percentage = Math.round((currentSteps / challenge.target) * 100);
        this.addRecentActivity('overachiever', `${this.currentUser.name} is an overachiever! ${percentage}% of "${challenge.title}" target!`, new Date());
        this.showLiveNotification('overachiever', `🌟 ${this.currentUser.name} crushed "${challenge.title}" at ${percentage}%!`, 'fas fa-crown');
    }

    // Helper method to determine if user is an overachiever
    isOverachiever(user, steps) {
        // Check if user has exceeded their daily goal by 150%
        const today = this.getToday();
        const todaySteps = user.steps[today] || 0;
        const dailyGoalThreshold = user.dailyGoal * 1.5;
        
        if (todaySteps >= dailyGoalThreshold) return true;
        
        // Check if user has completed any challenge with 150%+ performance
        const overachieverChallengeThreshold = 1.5;
        for (const challenge of this.challenges) {
            if (user.totalSteps >= challenge.target * overachieverChallengeThreshold) {
                return true;
            }
        }
        
        // Check total step milestones (50k+)
        if (user.totalSteps >= 50000) return true;
        
        return false;
    }

    // Hamburger Menu Functions
    toggleHamburgerMenu() {
        const flyout = document.getElementById('hamburgerFlyout');
        flyout.classList.toggle('open');
    }

    closeHamburgerMenu() {
        const flyout = document.getElementById('hamburgerFlyout');
        flyout.classList.remove('open');
    }

    // FAQ Modal Functions
    showFAQModal() {
        const modal = document.getElementById('faqModal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        this.closeHamburgerMenu();
    }

    closeFAQModal() {
        const modal = document.getElementById('faqModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Spotify Playlist Function
    openSpotifyPlaylist() {
        // CxE Americas Offsite 2025 official playlist
        const playlistUrl = 'https://open.spotify.com/playlist/5ajf3ykIGO6jPqHNx6moOC?si=89f9bc7157424c6a';
        window.open(playlistUrl, '_blank');
        this.showMessage('🎵 Opening CxE Americas 2025 playlist on Spotify!', 'success');
    }

    openGitHubIssue(type) {
        const repoUrl = 'https://github.com/Manaiakalani/CxEAmericasStepTracker';
        let templateParam = '';
        let title = '';

        if (type === 'bug') {
            title = encodeURIComponent('Bug Report: ');
            templateParam = '?template=bug_report.md';
        } else {
            title = encodeURIComponent('Feature Request: ');
            templateParam = '?template=feature_request.md';
        }

        const url = `${repoUrl}/issues/new${templateParam}&title=${title}`;
        window.open(url, '_blank');
        this.closeHamburgerMenu();
    }

    // Utility function for time formatting
    formatTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    }

    // Dark mode functionality
    initDarkMode() {
        const savedTheme = localStorage.getItem('stepTrackerTheme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('stepTrackerTheme', theme);
        
        const menuIcon = document.getElementById('darkModeMenuIcon');
        
        if (theme === 'dark') {
            if (menuIcon) {
                menuIcon.className = 'fas fa-sun';
            }
        } else {
            if (menuIcon) {
                menuIcon.className = 'fas fa-moon';
            }
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.stepTracker = new StepTracker();
    
    // Add some demo data for testing
    if (localStorage.getItem('stepTrackerUsers') === null) {
        window.stepTracker.addDemoData();
    }

    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('Service Worker registered successfully:', registration.scope);
                })
                .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }
});

// Add demo data method
StepTracker.prototype.addDemoData = function() {
    const today = this.getToday();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const demoUsers = [
        { name: 'Sarah Johnson', team: 'Management', dailyGoal: 10000, todaySteps: 12500, yesterdaySteps: 9800, totalSteps: 45600 },
        { name: 'Mike Chen', team: 'Threat Protection', dailyGoal: 8000, todaySteps: 11200, yesterdaySteps: 8500, totalSteps: 42300 },
        { name: 'Emily Rodriguez', team: 'IDNA', dailyGoal: 10000, todaySteps: 9800, yesterdaySteps: 11200, totalSteps: 38900 },
        { name: 'David Thompson', team: 'Purview/CES', dailyGoal: 8000, todaySteps: 8900, yesterdaySteps: 7600, totalSteps: 36800 },
        { name: 'Lisa Wang', team: 'CCP', dailyGoal: 12000, todaySteps: 13400, yesterdaySteps: 12800, totalSteps: 52100 },
        { name: 'Alex Turner', team: 'CARE', dailyGoal: 8000, todaySteps: 7200, yesterdaySteps: 8900, totalSteps: 34500 }
    ];
    
    demoUsers.forEach(userData => {
        const user = {
            id: this.generateId(),
            name: userData.name,
            team: userData.team,
            dailyGoal: userData.dailyGoal,
            steps: {
                [today]: userData.todaySteps,
                [yesterdayStr]: userData.yesterdaySteps
            },
            joinedDate: new Date().toISOString(),
            totalSteps: userData.totalSteps
        };
        
        // Add some random historical data
        for (let i = 2; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            user.steps[dateStr] = Math.floor(Math.random() * 15000) + 3000;
        }
        
        this.users.push(user);
    });
    
    this.saveData();
};
