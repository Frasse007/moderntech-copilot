import '../styles/ActiveBets.css'

export default function ActiveBets({ bets, onRemoveBet }) {
  if (bets.length === 0) {
    return (
      <section className="active-bets">
        <h2>Active Bets</h2>
        <div className="empty-state">
          <p className="empty-icon">📋</p>
          <p className="empty-text">No active bets yet</p>
        </div>
      </section>
    )
  }

  return (
    <section className="active-bets">
      <h2>Active Bets ({bets.length})</h2>

      <div className="bets-list">
        {bets.map(bet => (
          <div key={bet.id} className={`bet-item status-${bet.status}`}>
            <div className="bet-main">
              <div className="bet-matchup">
                <p className="bet-teams">
                  {bet.match.homeTeam} vs {bet.match.awayTeam}
                </p>
                <p className="bet-selection">
                  {bet.selection.charAt(0).toUpperCase() + bet.selection.slice(1)} @ {bet.odds}
                </p>
              </div>

              <div className="bet-amounts">
                <div className="bet-amount-item">
                  <span className="amount-label">Stake</span>
                  <span className="amount-value">${bet.wager.toFixed(2)}</span>
                </div>
                <div className="bet-amount-item">
                  <span className="amount-label">To Win</span>
                  <span className="amount-value">${(bet.payout - bet.wager).toFixed(2)}</span>
                </div>
                <div className="bet-amount-item highlight">
                  <span className="amount-label">Payout</span>
                  <span className="amount-value">${bet.payout}</span>
                </div>
              </div>
            </div>

            <div className="bet-footer">
              <div className="bet-meta">
                <span className={`status-badge status-${bet.status}`}>
                  {bet.status === 'pending' ? '⏳ Pending' : '✓ Settled'}
                </span>
                <span className="placed-time">{bet.placedAt}</span>
              </div>

              {bet.status === 'pending' && (
                <button
                  className="remove-btn"
                  onClick={() => onRemoveBet(bet.id)}
                  title="Cancel bet"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}