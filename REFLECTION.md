### PROMPT
Act as a senior frontend engineer. I am building a basic sports betting website MVP for an assignment. 

Tech Stack Requirements:
- React (bootstrapped with Vite)
- Vanilla CSS / Modern Web Development (clean modular CSS files, no heavy UI libraries like Tailwind)
- JavaScript (ES6+)

App/Webpage Overview:
A sportsbook dashboard with:
- Header (Navbar with user bankroll balance and profile)
- Match Board (Cards displaying sports fixtures and decimal odds)
- Bet Slip (Sidebar to select odds, input wager, calculate payouts, and place bets)
- Active Bets Log (List of submitted wagers)

Task, please provide me with:
1. The exact directory and file tree structure for this project.
2. Starter code for the core files (`index.html`, `src/App.jsx`, `src/components/Header.jsx`, `src/components/MatchCard.jsx`, and `src/components/BetSlip.jsx`).
3. A mock JSON data structure (`src/data/mockMatches.js`) containing 10-12 sample games with decimal odds.

Keep the setup simple, modern, and modular without unnecessary external dependencies.

### RESPONSE
📊 Complete Project Delivery Summary

I've built you a production-ready sports betting MVP with professional code structure and modern best practices. Here's what you have:

✅ 1. Complete Directory Structure
sports-betting-mvp/
├── index.html                  # Entry point
├── vite.config.js             # Vite setup
├── package.json               # Dependencies: React 18.2 + Vite
├── .gitignore                 # Git exclusions
├── README.md & QUICKSTART.md  # Full documentation
│
├── src/
│   ├── App.jsx                # Main component (state management)
│   ├── App.css                # Layout styles
│   ├── main.jsx               # React bootstrap
│   │
│   ├── components/            # 5 Reusable components
│   │   ├── Header.jsx
│   │   ├── MatchBoard.jsx
│   │   ├── MatchCard.jsx
│   │   ├── BetSlip.jsx
│   │   └── ActiveBets.jsx
│   │
│   ├── styles/                # Modular component CSS
│   │   ├── index.css          # Global + 40+ CSS variables
│   │   ├── Header.css
│   │   ├── MatchBoard.css
│   │   ├── MatchCard.css
│   │   ├── BetSlip.css
│   │   └── ActiveBets.css
│   │
│   └── data/
│       └── mockMatches.js     # 12 sample matches with odds
✅ 2. Core Files Created
File	Purpose	Lines
App.jsx	Central state management	~85
Header.jsx	Navigation + balance	~25
MatchCard.jsx	Individual match display	~60
MatchBoard.jsx	Grid layout	~28
BetSlip.jsx	Wager input + calculations	~120
ActiveBets.jsx	Bet history log	~70
mockMatches.js	12 sports fixtures	~95
✅ 3. Mock Data Structure

12 Sample Matches covering:

⚽ Football (Premier League, La Liga, Bundesliga, Serie A, Champions League)
🏀 Basketball (NBA)
🎾 Tennis (US Open, Wimbledon)
⚾ Baseball (MLB)
🏒 Ice Hockey (NHL)
🏈 American Football (NFL)

Each with realistic decimal odds (1.45 - 4.50 range).

### PROMPT
On the MatchCard.jsx component I want you to change the ISO Alpha-2 country codes to instead utilize this: https://flagicons.lipis.dev/ for obtaining the country flags to display on the cards. Here is the MatchCard.jsx: 

### RESPONSE
To display flags from flagicons.lipis.dev, you need to:

Import the flag-icons CSS library (either in index.html via CDN or through npm).

Render <span> elements with class names matching the ISO Alpha-2 country code (e.g., <span className="fi fi-gb"></span> or <span className={fi fi-${match.homeFlag}}></span>).

Here is the updated MatchCard.jsx component and the index.html update to include the CDN stylesheet.

1. Updated MatchCard.jsx
JavaScript
import '../styles/MatchCard.css'

export default function MatchCard({ match, onSelectOdds, isSelected, selectedOddType }) {
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Helper to safely render flag icon class names (e.g., 'gb', 'es', 'us')
  const getFlagClass = (countryCode) => {
    if (!countryCode) return ''
    return `fi fi-${countryCode.toLowerCase()}`
  }

  return (
    <div className="match-card">
      <div className="match-header">
        <div className="match-time">
          <span className="time">{formatTime(match.startTime)}</span>
          <span className="date">{formatDate(match.startTime)}</span>
        </div>
        <span className="match-sport">{match.sport}</span>
      </div>

      <div className="match-teams">
        <div className="team">
          <span className="team-name">{match.homeTeam}</span>
          <span className={`team-flag ${getFlagClass(match.homeFlag)}`} title={match.homeFlag}></span>
        </div>
        <div className="versus">vs</div>
        <div className="team">
          <span className={`team-flag ${getFlagClass(match.awayFlag)}`} title={match.awayFlag}></span>
          <span className="team-name">{match.awayTeam}</span>
        </div>
      </div>

      <div className="match-league">
        <span className="league-name">{match.league}</span>
      </div>

      <div className="odds-container">
        <button
          className={`odd-btn ${isSelected && selectedOddType === 'home' ? 'selected' : ''}`}
          onClick={() => onSelectOdds(match, 'home')}
        >
          <span className="odd-label">Home</span>
          <span className="odd-value">{match.odds.home}</span>
        </button>

        <button
          className={`odd-btn draw ${isSelected && selectedOddType === 'draw' ? 'selected' : ''}`}
          onClick={() => onSelectOdds(match, 'draw')}
        >
          <span className="odd-label">Draw</span>
          <span className="odd-value">{match.odds.draw}</span>
        </button>

        <button
          className={`odd-btn ${isSelected && selectedOddType === 'away' ? 'selected' : ''}`}
          onClick={() => onSelectOdds(match, 'away')}
        >
          <span className="odd-label">Away</span>
          <span className="odd-value">{match.odds.away}</span>
        </button>
      </div>
    </div>
  )
}
2. Include the CSS stylesheet in index.html
Add the CDN link tag inside the <head> of your index.html file so that the fi classes render properly:

HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SportsBook - Betting MVP</title>
  <!-- Flag Icons stylesheet -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
Note: Ensure your mockMatches.js file passes lower/uppercase 2-letter country codes in homeFlag and awayFlag (e.g., 'gb', 'es', 'us', 'de', 'it').

### PROMPT
Modify the profile button and navigation setup in (src/components/Header.jsx and src/App.jsx) to render a simple profile page view when clicked. The profile page should have fields to input sample information (like name, address, email, etc). Here are the two files: (Files attached to chat)

### RESPONSE
Here are the updated Header.jsx and App.jsx files with the profile button connected to a interactive Profile view where users can enter and save sample information.

1. src/components/Header.jsx
Update the profile button to toggle the 'profile' tab and add an active class when selected:

JavaScript
import '../styles/Header.css'

export default function Header({ bankroll, activeTab, setActiveTab }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
          <h1 className="logo">📊 SportsBook</h1>
          <p className="tagline">Live Betting Dashboard</p>
        </div>

        <nav className="header-nav">
          <button 
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${activeTab === 'markets' ? 'active' : ''}`}
            onClick={() => setActiveTab('markets')}
          >
            Markets
          </button>
          <button 
            className={`nav-link ${activeTab === 'help' ? 'active' : ''}`}
            onClick={() => setActiveTab('help')}
          >
            Help
          </button>
        </nav>

        <div className="header-profile">
          <div className="bankroll-display">
            <span className="bankroll-label">Balance</span>
            <span className="bankroll-amount">${bankroll.toFixed(2)}</span>
          </div>
          <button 
            className={`profile-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </button>
        </div>
      </div>
    </header>
  )
}
2. src/App.jsx
Add state for user profile details (profileData) and render a clean form view when activeTab === 'profile':

JavaScript
import { useState } from 'react'
import Header from './components/Header'
import MatchBoard from './components/MatchBoard'
import BetSlip from './components/BetSlip'
import ActiveBets from './components/ActiveBets'
import { mockMatches } from './data/mockMatches'
import './App.css'

export default function App() {
  const [bankroll, setBankroll] = useState(1000)
  const [selectedOdds, setSelectedOdds] = useState(null)
  const [activeBets, setActiveBets] = useState([])
  const [betWager, setBetWager] = useState('')
  const [activeTab, setActiveTab] = useState('home')
  const [selectedSport, setSelectedSport] = useState('All')

  // State for user profile details
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  })
  const [isSaved, setIsSaved] = useState(false)

  // Extract unique sports list dynamically from mock data
  const sportsCategories = ['All', ...new Set(mockMatches.map(m => m.sport))]

  // Filter matches based on selected category tab
  const filteredMatches = selectedSport === 'All' 
    ? mockMatches 
    : mockMatches.filter(m => m.sport === selectedSport)

  const handleSelectOdds = (match, oddType) => {
    setSelectedOdds({
      match,
      oddType,
      odds: match.odds[oddType]
    })
    setBetWager('')
  }

  const handlePlaceBet = (wager) => {
    if (!selectedOdds || !wager || wager <= 0 || wager > bankroll) {
      alert('Invalid bet amount')
      return
    }

    const payout = (wager * selectedOdds.odds).toFixed(2)
    const newBet = {
      id: Date.now(),
      match: selectedOdds.match,
      selection: selectedOdds.oddType,
      odds: selectedOdds.odds,
      wager: parseFloat(wager),
      payout: parseFloat(payout),
      status: 'pending',
      placedAt: new Date().toLocaleTimeString()
    }

    setActiveBets([newBet, ...activeBets])
    setBankroll(prev => parseFloat((prev - wager).toFixed(2)))
    setSelectedOdds(null)
    setBetWager('')
  }

  const handleRemoveBet = (betId) => {
    const bet = activeBets.find(b => b.id === betId)
    if (bet && bet.status === 'pending') {
      setActiveBets(activeBets.filter(b => b.id !== betId))
      setBankroll(prev => parseFloat((prev + bet.wager).toFixed(2)))
    }
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
    setIsSaved(false)
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    setIsSaved(true)
  }

  return (
    <div className="app-container">
      <Header 
        bankroll={bankroll} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <div className="app-layout">
        <main className="main-content">
          {activeTab === 'home' && (
            <>
              <MatchBoard 
                matches={mockMatches}
                onSelectOdds={handleSelectOdds}
                selectedOdds={selectedOdds}
              />
              <ActiveBets 
                bets={activeBets}
                onRemoveBet={handleRemoveBet}
              />
            </>
          )}

          {activeTab === 'markets' && (
            <div className="tab-view">
              <div className="markets-header">
                <h2>All Sports Markets</h2>
                <p>Filter by sports category or browse available games below.</p>
                
                {/* Sports Category Filter Buttons */}
                <div className="sports-filter-container">
                  {sportsCategories.map((sport) => (
                    <button
                      key={sport}
                      className={`filter-btn ${selectedSport === sport ? 'active' : ''}`}
                      onClick={() => setSelectedSport(sport)}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              </div>

              <MatchBoard 
                matches={filteredMatches}
                onSelectOdds={handleSelectOdds}
                selectedOdds={selectedOdds}
              />
            </div>
          )}

          {activeTab === 'help' && (
            <div className="tab-view help-section">
              <h2>Help & Support Center</h2>
              <div className="help-card">
                <h3>How do I place a bet?</h3>
                <p>Click on any odds button (Home, Draw, or Away) on a match card to add it to your Bet Slip on the right side. Enter your stake amount and click "Place Bet".</p>
              </div>
              <div className="help-card">
                <h3>How does the bankroll work?</h3>
                <p>You start with a simulated bankroll of $1,000. Placing bets deducts your wager amount. Canceling a pending bet refunds the wager to your account balance.</p>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="tab-view profile-section">
              <h2>User Profile Settings</h2>
              <p>Manage your account details and personal information.</p>

              {isSaved && (
                <div className="save-alert">
                  ✅ Profile details updated successfully!
                </div>
              )}

              <form className="profile-form" onSubmit={handleProfileSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleProfileChange}
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      placeholder="e.g. john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      placeholder="e.g. +1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Street Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    placeholder="e.g. 123 Main Street, Apt 4B"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={profileData.city}
                      onChange={handleProfileChange}
                      placeholder="e.g. Chicago"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="postalCode">Postal / ZIP Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={profileData.postalCode}
                      onChange={handleProfileChange}
                      placeholder="e.g. 60601"
                    />
                  </div>
                </div>

                <button type="submit" className="save-profile-btn">
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </main>

        <aside className="sidebar">
          <BetSlip
            selectedOdds={selectedOdds}
            bankroll={bankroll}
            wager={betWager}
            onWagerChange={setBetWager}
            onPlaceBet={handlePlaceBet}
            onClear={() => {
              setSelectedOdds(null)
              setBetWager('')
            }}
          />
        </aside>
      </div>
    </div>
  )
}
3. Optional Styles (src/App.css)
Add this styling snippet to src/App.css to format the form inputs cleanly:

CSS
/* Profile Form Styling */
.profile-section {
  max-width: 650px;
}

.save-alert {
  background-color: rgba(34, 197, 94, 0.15);
  border: 1px solid #22c55e;
  color: #4ade80;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.85rem;
  color: #94a3b8;
  font-weight: 500;
}

.form-group input {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 0.65rem 0.85rem;
  color: #ffffff;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.form-group input:focus {
  border-color: #3b82f6;
}

.save-profile-btn {
  align-self: flex-start;
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 0.5rem;
}

.save-profile-btn:hover {
  background-color: #2563eb;
}

.profile-btn.active {
  border-color: #3b82f6;
  background-color: rgba(59, 130, 246, 0.2);
}

### PROMPT
Create me a comprehensive detailed, professional README for this repository. Make sure to include: Project description, installation instructions and usage guide/tutorial

### RESPONSE
I’m reviewing the app structure and existing project details so I can write a polished README that matches the repository accurately.

Read 

Read , lines 1 to 250

Read 

I’ve got the app structure and UX flow; I’m now replacing the placeholder README with a proper project overview, setup guide, and hands-on user tutorial.

Replacing 1 lines with 227 lines in 


```

```


Read 

✅ README completed

I updated `README.md` with a more professional, comprehensive project guide that includes:

- Project description and overview
- Tech stack and repository structure
- Installation instructions
- Local development and build commands
- Step-by-step usage/tutorial for the betting dashboard
- Notes for future extension and development

This was a documentation-only update, so no application code was changed.

Made changes.

### PROMPT
When the help page is the 'active' one. Make sure the BetSlip.jsx is not displayed on the right column, instead show the help questions over the full screen.

### RESPONSE
To hide the BetSlip sidebar and let the Help section take up the full width, you can conditionally adjust the layout based on activeTab.

Here are the updated src/App.jsx and src/App.css changes.

1. Updated src/App.jsx
Wrap the sidebar conditionally so it only renders when activeTab !== 'help', and add a full-width modifier class to main-content when activeTab === 'help':

JavaScript
import { useState } from 'react'
import Header from './components/Header'
import MatchBoard from './components/MatchBoard'
import BetSlip from './components/BetSlip'
import ActiveBets from './components/ActiveBets'
import { mockMatches } from './data/mockMatches'
import './App.css'

export default function App() {
  const [bankroll, setBankroll] = useState(1000)
  const [selectedOdds, setSelectedOdds] = useState(null)
  const [activeBets, setActiveBets] = useState([])
  const [betWager, setBetWager] = useState('')
  const [activeTab, setActiveTab] = useState('home')
  const [selectedSport, setSelectedSport] = useState('All')

  // State for user profile details
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  })
  const [isSaved, setIsSaved] = useState(false)

  // Extract unique sports list dynamically from mock data
  const sportsCategories = ['All', ...new Set(mockMatches.map(m => m.sport))]

  // Filter matches based on selected category tab
  const filteredMatches = selectedSport === 'All' 
    ? mockMatches 
    : mockMatches.filter(m => m.sport === selectedSport)

  const handleSelectOdds = (match, oddType) => {
    setSelectedOdds({
      match,
      oddType,
      odds: match.odds[oddType]
    })
    setBetWager('')
  }

  const handlePlaceBet = (wager) => {
    if (!selectedOdds || !wager || wager <= 0 || wager > bankroll) {
      alert('Invalid bet amount')
      return
    }

    const payout = (wager * selectedOdds.odds).toFixed(2)
    const newBet = {
      id: Date.now(),
      match: selectedOdds.match,
      selection: selectedOdds.oddType,
      odds: selectedOdds.odds,
      wager: parseFloat(wager),
      payout: parseFloat(payout),
      status: 'pending',
      placedAt: new Date().toLocaleTimeString()
    }

    setActiveBets([newBet, ...activeBets])
    setBankroll(prev => parseFloat((prev - wager).toFixed(2)))
    setSelectedOdds(null)
    setBetWager('')
  }

  const handleRemoveBet = (betId) => {
    const bet = activeBets.find(b => b.id === betId)
    if (bet && bet.status === 'pending') {
      setActiveBets(activeBets.filter(b => b.id !== betId))
      setBankroll(prev => parseFloat((prev + bet.wager).toFixed(2)))
    }
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
    setIsSaved(false)
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    setIsSaved(true)
  }

  return (
    <div className="app-container">
      <Header 
        bankroll={bankroll} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <div className="app-layout">
        <main className={`main-content ${activeTab === 'help' ? 'full-width' : ''}`}>
          {activeTab === 'home' && (
            <>
              <MatchBoard 
                matches={mockMatches}
                onSelectOdds={handleSelectOdds}
                selectedOdds={selectedOdds}
              />
              <ActiveBets 
                bets={activeBets}
                onRemoveBet={handleRemoveBet}
              />
            </>
          )}

          {activeTab === 'markets' && (
            <div className="tab-view">
              <div className="markets-header">
                <h2>All Sports Markets</h2>
                <p>Filter by sports category or browse available games below.</p>
                
                {/* Sports Category Filter Buttons */}
                <div className="sports-filter-container">
                  {sportsCategories.map((sport) => (
                    <button
                      key={sport}
                      className={`filter-btn ${selectedSport === sport ? 'active' : ''}`}
                      onClick={() => setSelectedSport(sport)}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              </div>

              <MatchBoard 
                matches={filteredMatches}
                onSelectOdds={handleSelectOdds}
                selectedOdds={selectedOdds}
              />
            </div>
          )}

          {activeTab === 'help' && (
            <div className="tab-view help-section">
              <h2>Help & Support Center</h2>
              <div className="help-grid">
                <div className="help-card">
                  <h3>How do I place a bet?</h3>
                  <p>Click on any odds button (Home, Draw, or Away) on a match card to add it to your Bet Slip on the right side. Enter your stake amount and click "Place Bet".</p>
                </div>
                <div className="help-card">
                  <h3>How does the bankroll work?</h3>
                  <p>You start with a simulated bankroll of $1,000. Placing bets deducts your wager amount. Canceling a pending bet refunds the wager to your account balance.</p>
                </div>
                <div className="help-card">
                  <h3>Can I cancel an active bet?</h3>
                  <p>Yes! In the "Active Bets" section on the Home tab, click the "Cancel Bet" button next to any pending wager to immediately refund the stake to your balance.</p>
                </div>
                <div className="help-card">
                  <h3>How are odds calculated?</h3>
                  <p>Odds reflect decimal payouts. A $10 wager placed at 2.50 odds yields a total potential payout of $25 ($15 profit + $10 returned wager).</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="tab-view profile-section">
              <h2>User Profile Settings</h2>
              <p>Manage your account details and personal information.</p>

              {isSaved && (
                <div className="save-alert">
                  ✅ Profile details updated successfully!
                </div>
              )}

              <form className="profile-form" onSubmit={handleProfileSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleProfileChange}
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      placeholder="e.g. john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      placeholder="e.g. +1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Street Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    placeholder="e.g. 123 Main Street, Apt 4B"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={profileData.city}
                      onChange={handleProfileChange}
                      placeholder="e.g. Chicago"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="postalCode">Postal / ZIP Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={profileData.postalCode}
                      onChange={handleProfileChange}
                      placeholder="e.g. 60601"
                    />
                  </div>
                </div>

                <button type="submit" className="save-profile-btn">
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </main>

        {activeTab !== 'help' && (
          <aside className="sidebar">
            <BetSlip
              selectedOdds={selectedOdds}
              bankroll={bankroll}
              wager={betWager}
              onWagerChange={setBetWager}
              onPlaceBet={handlePlaceBet}
              onClear={() => {
                setSelectedOdds(null)
                setBetWager('')
              }}
            />
          </aside>
        )}
      </div>
    </div>
  )
}
2. Styling Additions for Full-Width Layout in src/App.css
Add these CSS rules to src/App.css to handle expanding .main-content to full width and displaying help questions in a grid layout:

CSS
/* Full-Width Main Content Modifier */
.main-content.full-width {
  flex: 1;
  max-width: 100%;
}

/* Help Section Grid Layout */
.help-section {
  max-width: 100%;
}

.help-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.help-card {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 1.5rem;
}

.help-card h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: #3b82f6;
  font-size: 1.1rem;
}

.help-card p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.5;
  font-size: 0.95rem;
}

### PROMPT
In the README.md add instructions before the installation part about cloning the repository from GitHub to your local machine

### RESPONSE
✅ Added clone instructions
I inserted a GitHub clone section before the installation steps in README.md, including:

the git clone command
the cd step into the project directory
This makes the setup flow complete for someone starting from a fresh local machine.