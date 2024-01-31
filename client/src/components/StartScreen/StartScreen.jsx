import { useNavigate } from "react-router-dom";
import "./StartScreen.css";

export default function StartScreen() {
  const navigate = useNavigate();

  return (
    <main className="startScreen">
      <section className="games">
        <div className="game">
          <img
            src="https://i.redd.it/4xb7zuo98hp61.jpg"
            alt="Where's Waldo on a running track"
          />
          <button onClick={() => navigate("/track")}>Start game</button>

          <section className="stats">
            <div className="stat">World record: 0s</div>
            <div className="stat">Personal best: 0s</div>
          </section>
        </div>
      </section>
    </main>
  );
}
