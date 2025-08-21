// Step Tracker Application
class StepTracker {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('stepTrackerUsers') || '[]');
        this.teams = [
            'Azure Champions',
            'Microsoft 365 Mavericks', 
            'Surface Squad',
            'Power Platform Pioneers',
            'Teams Titans',
            'Dynamics Dynamos'
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
            }
        ];
        this.currentTab = 'dashboard';
        this.leaderboardPeriod = 'today';
        
        this.init();
    }

    init() {
        this.loadCurrentUser();
        this.setupEventListeners();
        this.updateUI();
        this.loadWeather();
        
        if (!this.currentUser) {
            this.showWelcomeScreen();
        } else {
            this.hideWelcomeScreen();
            this.updateDashboard();
            this.updateLeaderboard();
            this.updateTeamStats();
            this.updateProfile();
        }
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
        
        // Check if goal is reached
        if (this.currentUser.steps[today] >= this.currentUser.dailyGoal) {
            const isFirstTime = this.currentUser.steps[today] - steps < this.currentUser.dailyGoal;
            if (isFirstTime) {
                this.showMessage(`🎉 Daily goal achieved! You're crushing it!`, 'success');
            }
        }
    }

    updateDashboard() {
        if (!this.currentUser) return;

        const today = this.getToday();
        const todaySteps = this.currentUser.steps[today] || 0;
        const dailyGoal = this.currentUser.dailyGoal;
        
        // Update user name
        document.getElementById('userDisplayName').textContent = this.currentUser.name;
        
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
            
            item.innerHTML = `
                <div class="leaderboard-rank ${rankClass}">${rank}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${user.name}</div>
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
            // Using a mock weather API for demonstration
            // In production, you'd use a real weather service like OpenWeatherMap
            const weatherData = await this.getMockWeatherData();
            this.updateWeatherDisplay(weatherData);
        } catch (error) {
            console.error('Failed to load weather:', error);
            this.updateWeatherDisplay(null);
        }
    }

    async getMockWeatherData() {
        // Simulate API call with realistic Redmond weather data
        return new Promise((resolve) => {
            setTimeout(() => {
                // Generate realistic weather for Redmond, WA in August
                const temps = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27]; // Celsius
                const conditions = ['partly cloudy', 'sunny', 'overcast', 'light rain'];
                
                const tempC = temps[Math.floor(Math.random() * temps.length)];
                const tempF = Math.round((tempC * 9/5) + 32);
                const condition = conditions[Math.floor(Math.random() * conditions.length)];
                
                resolve({
                    tempC,
                    tempF,
                    condition,
                    humidity: Math.floor(Math.random() * 30) + 50 // 50-80%
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
        
        // Provide jacket advice based on temperature
        let advice = '';
        if (weatherData.tempC < 15) {
            advice = '🧥 Jacket recommended';
        } else if (weatherData.tempC < 20) {
            advice = '🧥 Light jacket suggested';
        } else if (weatherData.tempC < 25) {
            advice = '👕 Perfect for walking';
        } else {
            advice = '☀️ Great weather!';
        }
        
        if (weatherData.condition.includes('rain')) {
            advice += ' ☔ Bring umbrella';
        }
        
        adviceElement.textContent = advice;
    }

    saveData() {
        localStorage.setItem('stepTrackerUsers', JSON.stringify(this.users));
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.stepTracker = new StepTracker();
    
    // Add some demo data for testing
    if (localStorage.getItem('stepTrackerUsers') === null) {
        window.stepTracker.addDemoData();
    }
});

// Add demo data method
StepTracker.prototype.addDemoData = function() {
    const today = this.getToday();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const demoUsers = [
        { name: 'Sarah Johnson', team: 'Innovation Squad', dailyGoal: 10000, todaySteps: 12500, yesterdaySteps: 9800, totalSteps: 45600 },
        { name: 'Mike Chen', team: 'Tech Titans', dailyGoal: 8000, todaySteps: 11200, yesterdaySteps: 8500, totalSteps: 42300 },
        { name: 'Emily Rodriguez', team: 'Creative Crusaders', dailyGoal: 10000, todaySteps: 9800, yesterdaySteps: 11200, totalSteps: 38900 },
        { name: 'David Thompson', team: 'Growth Warriors', dailyGoal: 8000, todaySteps: 8900, yesterdaySteps: 7600, totalSteps: 36800 },
        { name: 'Lisa Wang', team: 'Strategy Stars', dailyGoal: 12000, todaySteps: 13400, yesterdaySteps: 12800, totalSteps: 52100 },
        { name: 'Alex Turner', team: 'Operations Optimizers', dailyGoal: 8000, todaySteps: 7200, yesterdaySteps: 8900, totalSteps: 34500 }
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
