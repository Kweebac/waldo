import "./Game.css";
import image from "../../assets/waldo-track.jpg";
import { useEffect, useState } from "react";

export default function GameTrack() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [characters, setCharacters] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/api/characters/track");
      setCharacters(await res.json());
    })();
  }, []);

  function selectArea(e) {
    setX(e.pageX);
    setY(e.pageY);
  }

  return (
    <main className="game">
      <img src={image} alt="Where's Waldo on a running track" onClick={(e) => selectArea(e)} />

      <div className="selectedArea" style={{ left: x - 20, top: y - 20 }}>
        <div className="circle"></div>
        <ul className="characters">
          {characters &&
            characters.map((character) => (
              <li className="character" key={character._id}>
                <button onClick={(e) => isCorrectLocation(e, character.name)}>
                  {character.name}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
