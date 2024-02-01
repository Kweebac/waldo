import "./Game.css";
import track from "../../assets/track.jpg";
import odlaw from "../../assets/odlaw.png";
import waldo from "../../assets/waldo.png";
import wilma from "../../assets/wilma.png";
import wizard from "../../assets/wizard.png";
import woof from "../../assets/woof.png";
import { useEffect, useState } from "react";

export default function GameTrack() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [characters, setCharacters] = useState();
  const [correct, setCorrect] = useState();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/api/characters/track");
      setCharacters(await res.json());
    })();
  }, []);

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
        )
          setCorrect(true);
        else setCorrect(false);

        setTimeout(() => {
          setCorrect(undefined);
          setHidden(true);
        }, 1000);
      }
    }
  }

  const selectedAreaProps = {
    className: "selectedArea",
    style: {
      left: x - 20,
      top: y - 20,
      visibility: hidden ? "hidden" : "",
    },
  };

  const imgProps = {
    src: track,
    alt: "Where's Waldo on a running track",
    onClick: correct !== undefined ? undefined : (e) => selectArea(e),
  };

  return (
    <>
      <aside className="charactersPreview">
        <div>
          <div>Odlaw</div>
          <img className="characterPreview" src={odlaw} alt="Odlaw" />
        </div>
        <div>
          <div>Waldo</div>
          <img className="characterPreview" src={waldo} alt="Waldo" />
        </div>
        <div>
          <div>Wilma</div>
          <img className="characterPreview" src={wilma} alt="Wilma" />
        </div>
        <div>
          <div>Wizard</div>
          <img className="characterPreview" src={wizard} alt="Wizard" />
        </div>
        <div>
          <div>Woof</div>
          <img className="characterPreview" src={woof} alt="Woof" />
        </div>
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
  );
}
