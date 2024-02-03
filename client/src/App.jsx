import { Routes, Route } from "react-router-dom";
import "./App.css";
import StartScreen from "./components/StartScreen/StartScreen";
import GameTrack from "./components/Game/GameTrack";
import GameHytale from "./components/Game/GameHytale";

export default function App() {
  return (
    <Routes>
      <Route index element={<StartScreen />} />
      <Route path="/track" element={<GameTrack />} />
      <Route path="/hytale" element={<GameHytale />} />
    </Routes>
  );
}
