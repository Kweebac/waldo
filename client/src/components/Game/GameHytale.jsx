import "./Game.css";
import hytale from "../../assets/hytale/hytale.jpg";
import terrain1 from "../../assets/hytale/terrain1.png";
import terrain2 from "../../assets/hytale/terrain2.png";
import terrain3 from "../../assets/hytale/terrain3.png";
import terrain4 from "../../assets/hytale/terrain4.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertTimeToMessage } from "../../utils";

export default function GameTrack() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [characters, setCharacters] = useState();
  const [correct, setCorrect] = useState();
  const [hidden, setHidden] = useState(true);
  const [timeTakenMs, setTimeTakenMs] = useState();
  const [times, setTimes] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let res = await fetch("http://localhost:3000/api/hytale/characters");
      res = await res.json();
      for (const character of res) {
        if (character.name === "Terrain 1") character.image = terrain1;
        else if (character.name === "Terrain 2") character.image = terrain2;
        else if (character.name === "Terrain 3") character.image = terrain3;
        else if (character.name === "Terrain 4") character.image = terrain4;
      }

      setCharacters(res);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (characters && !characters.length) {
        setCharacters(undefined);

        let res = await fetch("http://localhost:3000/api/timeTaken");
        setTimeTakenMs(await res.json());
      }
    })();
  });

  function selectArea(e) {
    setX(e.pageX);
    setY(e.pageY);
    setHidden(false);
  }

  function isCorrectLocation(e, selectedCharacter) {
    e.stopPropagation();

    for (const character of characters) {
      if (character.name === selectedCharacter) {
        const boundary = character.position;

        if (
          x >= boundary.x[0] &&
          x <= boundary.x[1] &&
          y >= boundary.y[0] &&
          y <= boundary.y[1]
        ) {
          setCharacters(characters.filter((char) => char.name !== character.name));
          setCorrect(true);
        } else setCorrect(false);

        setTimeout(() => {
          setCorrect(undefined);
          setHidden(true);
        }, 1000);
      }
    }
  }

  async function saveTime(e) {
    e.preventDefault();

    await fetch("http://localhost:3000/api/hytale/time", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target[0].value,
        time: timeTakenMs,
      }),
    });

    const res = await fetch("http://localhost:3000/api/hytale/times");
    setTimes(await res.json());
  }

  const selectedAreaProps = {
    className: "selectedArea",
    style: {
      left: x - 20,
      top: y - 20,
      visibility: hidden ? "hidden" : undefined,
    },
  };

  const imgProps = {
    src: hytale,
    alt: "Hytale terrain",
    onClick: correct !== undefined ? undefined : (e) => selectArea(e),
  };

  return (
    <>
      {timeTakenMs ? (
        <main className="winScreen">
          <h1>You won in {convertTimeToMessage(timeTakenMs)}</h1>
          {times ? (
            <>
              <h2>Leaderboard</h2>
              <ol>
                {times.map((time) => (
                  <li key={time._id}>
                    {convertTimeToMessage(time.time)} by {time.username}
                  </li>
                ))}
              </ol>
              <button onClick={() => navigate("/")}>Menu</button>
            </>
          ) : (
            <form onSubmit={(e) => saveTime(e)}>
              <label>
                Username:
                <input type="text" name="username" />
              </label>
            </form>
          )}
        </main>
      ) : (
        <>
          <aside className="charactersPreview">
            {characters &&
              characters.map((character) => (
                <div key={character._id}>
                  <div>{character.name}</div>
                  <img
                    className="characterPreview"
                    src={character.image}
                    alt={character.name}
                  />
                </div>
              ))}
          </aside>

          <main className="game">
            <img {...imgProps} />
            <div {...selectedAreaProps}>
              {correct !== undefined ? (
                <div className={correct ? "correct" : "incorrect"}>
                  {correct ? "Correct" : "Incorrect"}
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
}
