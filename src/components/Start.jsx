import "../styles/start.css";
import logoImage from "../assets/rnmLogo.png";
export function Start({ setDifficulty }) {
  return (
    <div className="start-div">
      <img src={logoImage} alt="Rick and Morty logo" />
      <h3>Memory Game</h3>
      <ul>
        <li onClick={() => setDifficulty(3)}>Easy</li>
        <li onClick={() => setDifficulty(4)}>Medium</li>
        <li onClick={() => setDifficulty(5)}>Hard</li>
      </ul>
    </div>
  );
}
