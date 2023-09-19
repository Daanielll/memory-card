import { useState, useEffect } from "react";
import "./App.css";
import { Start } from "./components/Start";
import { Game } from "./components/Game";
import rnmlogo from "./assets/rnmLogo.png";
function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [difficulty, setDifficulty] = useState(0);
  const [score, setScore] = useState(0);
  const listOfID = [
    1, 2, 3, 4, 5, 6, 7, 10, 30, 47, 196, 239, 242, 265, 282, 306, 329, 331,
    636,
  ];
  async function fetchAllCharacters() {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${listOfID.join(",")}`
    );
    const jsonData = await response.json();
    setAllCharacters(jsonData);
  }

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  return (
    <>
      {difficulty == 0 && <Start setDifficulty={setDifficulty}></Start>}

      {difficulty > 0 && allCharacters[0] && (
        <>
          <img
            onClick={() => {
              window.location.reload();
            }}
            className="logo"
            src={rnmlogo}
            alt="Rick and Morty Logo"
          />

          <div className="container">
            <Game
              characters={allCharacters}
              difficulty={difficulty}
              correctGuesses={score}
              setCorrectGuesses={setScore}
            ></Game>
          </div>
        </>
      )}
    </>
  );
}

export default App;
