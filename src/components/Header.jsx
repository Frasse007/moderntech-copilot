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
          <button className="profile-btn">👤 Profile</button>
        </div>
      </div>
    </header>
  )
}