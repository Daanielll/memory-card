import { Card } from "./Card";
import { useEffect, useState } from "react";
import { GameEnd } from "./GameEnd";
export function Game({
  characters,
  difficulty,
  correctGuesses,
  setCorrectGuesses,
}) {
  const [updatedCharacters, setUpdatedCharacters] = useState([]);
  const [randomChars, setRandomChars] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [gameStatus, setGameStatus] = useState("running");
  const tries = difficulty == 3 ? 5 : difficulty == 4 ? 7 : 10;
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Function to generate a new random array
  const generateRandomArray = () => {
    const shuffledOriginalArray = shuffleArray(characters);
    const slicedArray = shuffledOriginalArray.slice(0, tries);
    setUpdatedCharacters(slicedArray);
  };
  const generateRandomCards = () => {
    const shuffledOriginalArray = shuffleArray(updatedCharacters);
    const slicedArray = shuffledOriginalArray.slice(0, difficulty);
    return slicedArray;
  };
  useEffect(() => {
    generateRandomArray();
  }, [gameStatus]);

  useEffect(() => {
    if (updatedCharacters[0]) {
      let isEnd = false;

      while (!isEnd) {
        const c = generateRandomCards();
        const mappedC = c.map((obj) => obj.id);
        if (mappedC.some((value) => !selectedCharacters.includes(value))) {
          setRandomChars(c);
          isEnd = true;
        }
      }
    }
  }, [updatedCharacters, selectedCharacters]);

  const handleNewGame = () => {
    setGameStatus("running");
    setCorrectGuesses(0);
    setSelectedCharacters([]);
  };

  const handleCardClick = (characterID) => {
    if (selectedCharacters.includes(characterID)) setGameStatus("lost");
    else {
      if (correctGuesses + 1 == tries) setGameStatus("won");
      else setSelectedCharacters([...selectedCharacters, characterID]);
      setCorrectGuesses(correctGuesses + 1);
    }
  };
  return (
    <>
      {gameStatus == "running" && (
        <div className="game-cont">
          <div className="container">
            {randomChars.map((character) => (
              <Card
                handleClick={() => handleCardClick(character.id)}
                key={character.name}
                character={character}
              />
            ))}
          </div>

          <h2>{`${correctGuesses} / ${tries}`}</h2>
        </div>
      )}

      {gameStatus != "running" && (
        <GameEnd status={gameStatus} handleRepeat={handleNewGame}></GameEnd>
      )}
    </>
  );
}
