import '../styles/Header.css'

export default function Header({ bankroll }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <h1 className="logo">📊 SportsBook</h1>
          <p className="tagline">Live Betting Dashboard</p>
        </div>

        <nav className="header-nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#markets" className="nav-link">Markets</a>
          <a href="#help" className="nav-link">Help</a>
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