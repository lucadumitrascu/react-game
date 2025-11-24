import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import StatsSection from "./components/StatsSection";
import QuestsSection from "./components/QuestsSection";
import EnemyController from "./components/EnemyController";
import PlayerController from "./components/PlayerController";
import Map from "./components/Map";
import "./App.css";

function App() {
  const playerEntity = useSelector((state) => state.player);
  const enemyEntity = useSelector((state) => state.enemy);
  return (
    <div className={"game-wrapper"}>
      <div>
        <StatsSection entity={enemyEntity} isPlayer={false} />
        <QuestsSection />
      </div>
      <div>
        <Map />
        <PlayerController />
        <EnemyController />
      </div>
      <StatsSection entity={playerEntity} isPlayer={true} />
      <ToastContainer />
    </div>
  )
}

export default App
