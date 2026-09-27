import MatchCard from './MatchCard'
import '../styles/MatchBoard.css'

export default function MatchBoard({ matches, onSelectOdds, selectedOdds }) {
  return (
    <section className="match-board">
      <div className="match-board-header">
        <h2>Live Markets</h2>
        <p className="match-count">{matches.length} matches available</p>
      </div>

      <div className="matches-grid">
        {matches.map(match => (
          <MatchCard
            key={match.id}
            match={match}
            onSelectOdds={onSelectOdds}
            isSelected={selectedOdds?.match.id === match.id}
            selectedOddType={selectedOdds?.match.id === match.id ? selectedOdds.oddType : null}
          />
        ))}
      </div>
    </section>
  )
}