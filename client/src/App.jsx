import { Routes, Route } from "react-router-dom";
import "./App.css";
import StartScreen from "./components/StartScreen/StartScreen";
import GameTrack from "./components/Game/GameTrack";

export default function App() {
  return (
    <Routes>
      <Route index element={<StartScreen />} />
      <Route path="/track" element={<GameTrack />} />
    </Routes>
  );
}
