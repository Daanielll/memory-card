import "../styles/game-end.css";
import wonImage from "../assets/rnmHappy.jpg";
import lostImage from "../assets/rnmSad.jpg";
export function GameEnd({ status, handleRepeat }) {
  return (
    <div className="blurred">
      <div className={`${status} game-ended`}>
        <img
          src={status == "won" ? wonImage : lostImage}
          alt="Rick and Morty Portal"
        />
        <div className="text-container">
          <h1>{`You ${status}!`}</h1>
          <button onClick={handleRepeat}>Play Again</button>
        </div>
      </div>
    </div>
  );
}
