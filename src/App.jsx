import { useSelector } from 'react-redux'
import StatsSection from './components/StatsSection'
import EnemyController from './components/EnemyController'
import PlayerController from './components/PlayerController'
import Map from './components/Map'
import './App.css'


function App() {
  const playerEntity = useSelector((state) => state.player);
  const enemyEntity = useSelector((state) => state.enemy);
  return (
    <div className={"game-wrapper"}>
      <StatsSection entity={enemyEntity} isPlayer={false} />
      <div>
        <Map />
        <PlayerController />
        <EnemyController />
      </div>
      <StatsSection entity={playerEntity} isPlayer={true} />
    </div>
  )
}

export default App
