import track from "../../assets/track/track.jpg";
import hytale from "../../assets/hytale/hytale.jpg";
import { useNavigate } from "react-router-dom";
import "./StartScreen.css";
import { useEffect, useState } from "react";
import { convertTimeToMessage } from "../../utils";

export default function StartScreen() {
  const navigate = useNavigate();
  const [trackWR, setTrackWR] = useState();
  const [hytaleWR, setHytaleWR] = useState();

  useEffect(() => {
    (async () => {
      let res = await fetch("https://kweebac-waldo-api.up.railway.app/api/track/times");
      res = await res.json();
      setTrackWR(res[0]);

      res = await fetch("https://kweebac-waldo-api.up.railway.app/api/hytale/times");
      res = await res.json();
      setHytaleWR(res[0]);
    })();
  }, []);

  return (
    <main className="startScreen">
      <section className="games">
        <div className="game">
          <img src={track} alt="Where's Waldo on a running track" />
          <button onClick={() => navigate("/track")}>Start game</button>

          <section className="stats">
            {trackWR && (
              <div className="stat">
                World record: {convertTimeToMessage(trackWR.time)} by {trackWR.username}
              </div>
            )}
          </section>
        </div>

        <div className="game">
          <img src={hytale} alt="Hytale terrain" />
          <button onClick={() => navigate("/hytale")}>Start game</button>

          <section className="stats">
            {hytaleWR && (
              <div className="stat">
                World record: {convertTimeToMessage(hytaleWR.time)} by {hytaleWR.username}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
