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