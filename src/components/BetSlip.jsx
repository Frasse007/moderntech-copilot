import { useState } from 'react'
import '../styles/BetSlip.css'

export default function BetSlip({ 
  selectedOdds, 
  bankroll, 
  wager, 
  onWagerChange, 
  onPlaceBet, 
  onClear 
}) {
  const [error, setError] = useState('')

  const calculatePayout = () => {
    if (!selectedOdds || !wager) return 0
    return (parseFloat(wager) * selectedOdds.odds).toFixed(2)
  }

  const calculateProfit = () => {
    const payout = calculatePayout()
    return (payout - parseFloat(wager)).toFixed(2)
  }

  const handleWagerChange = (e) => {
    const value = e.target.value
    onWagerChange(value)
    setError('')

    if (value && parseFloat(value) > bankroll) {
      setError('Exceeds available balance')
    }
  }

  const handleBetClick = () => {
    if (!selectedOdds) {
      setError('Select odds first')
      return
    }
    if (!wager || parseFloat(wager) <= 0) {
      setError('Enter valid wager amount')
      return
    }
    if (parseFloat(wager) > bankroll) {
      setError('Insufficient balance')
      return
    }

    onPlaceBet(wager)
    setError('')
  }

  const handleQuickBet = (amount) => {
    if (amount > bankroll) return
    onWagerChange(amount.toString())
    setError('')
  }

  const isEmpty = !selectedOdds

  return (
    <div className="bet-slip">
      <div className="bet-slip-header">
        <h3>Bet Slip</h3>
        {!isEmpty && (
          <button className="clear-btn" onClick={onClear} title="Clear selection">
            ✕
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="bet-slip-empty">
          <p className="empty-icon">🎯</p>
          <p className="empty-text">Select odds to get started</p>
        </div>
      ) : (
        <div className="bet-slip-content">
          {/* Match Details */}
          <div className="selection-card">
            <div className="match-info">
              <p className="match-teams">
                {selectedOdds.match.homeTeam} vs {selectedOdds.match.awayTeam}
              </p>
              <p className="match-league">{selectedOdds.match.league}</p>
            </div>

            <div className="selection-info">
              <span className="selection-label">
                {selectedOdds.oddType.charAt(0).toUpperCase() + selectedOdds.oddType.slice(1)}
              </span>
              <span className="selection-odds">{selectedOdds.odds}</span>
            </div>
          </div>

          {/* Wager Input */}
          <div className="wager-section">
            <label htmlFor="wager" className="wager-label">Stake</label>
            <div className="wager-input-group">
              <span className="currency">$</span>
              <input
                id="wager"
                type="number"
                min="0"
                step="0.01"
                max={bankroll}
                placeholder="0.00"
                value={wager}
                onChange={handleWagerChange}
                className="wager-input"
              />
            </div>

            {error && <span className="error-message">{error}</span>}
          </div>

          {/* Quick Bet Buttons */}
          <div className="quick-bet-buttons">
            {[10, 25, 50, 100].map(amount => (
              <button
                key={amount}
                className={`quick-btn ${amount > bankroll ? 'disabled' : ''}`}
                onClick={() => handleQuickBet(amount)}
                disabled={amount > bankroll}
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* Calculations */}
          <div className="bet-calculations">
            <div className="calc-row">
              <span className="calc-label">Potential Payout</span>
              <span className="calc-value">${calculatePayout()}</span>
            </div>
            <div className="calc-row profit">
              <span className="calc-label">Profit</span>
              <span className="calc-value">${calculateProfit()}</span>
            </div>
          </div>

          {/* Place Bet Button */}
          <button
            className="place-bet-btn"
            onClick={handleBetClick}
            disabled={!wager || parseFloat(wager) <= 0}
          >
            Place Bet
          </button>

          {/* Balance Info */}
          <div className="balance-info">
            <span className="balance-label">Available Balance</span>
            <span className="balance-amount">${bankroll.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  )
}