import "./Game.css";
import track from "../../assets/track/track.jpg";
import odlaw from "../../assets/track/odlaw.png";
import waldo from "../../assets/track/waldo.png";
import wilma from "../../assets/track/wilma.png";
import wizard from "../../assets/track/wizard.png";
import woof from "../../assets/track/woof.png";
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
      let res = await fetch("https://kweebac-waldo-api.up.railway.app/api/track/characters");
      res = await res.json();
      for (const character of res) {
        if (character.name === "Odlaw") character.image = odlaw;
        else if (character.name === "Waldo") character.image = waldo;
        else if (character.name === "Wilma") character.image = wilma;
        else if (character.name === "Wizard") character.image = wizard;
        else if (character.name === "Woof") character.image = woof;
      }

      setCharacters(res);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (characters && !characters.length) {
        setCharacters(undefined);

        let res = await fetch("https://kweebac-waldo-api.up.railway.app/api/timeTaken");
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

    await fetch("https://kweebac-waldo-api.up.railway.app/api/track/time", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target[0].value,
        time: timeTakenMs,
      }),
    });

    const res = await fetch("https://kweebac-waldo-api.up.railway.app/api/track/times");
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
    src: track,
    alt: "Where's Waldo on a running track",
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
