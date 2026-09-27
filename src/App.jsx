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

  return (
    <div className="app-container">
      <Header bankroll={bankroll} />
      
      <div className="app-layout">
        <main className="main-content">
          <MatchBoard 
            matches={mockMatches}
            onSelectOdds={handleSelectOdds}
            selectedOdds={selectedOdds}
          />
          
          <ActiveBets 
            bets={activeBets}
            onRemoveBet={handleRemoveBet}
          />
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