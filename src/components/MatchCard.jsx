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