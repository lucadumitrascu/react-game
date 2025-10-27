import PlayerController from './components/PlayerController'
import Map from './components/Map'
import './App.css'
import EnemyController from './components/EnemyController'

function App() {
  return (
    <div>
      <Map />
      <PlayerController />
      <EnemyController />
    </div>
  )
}

export default App
