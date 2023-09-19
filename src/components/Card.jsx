import "../styles/cards.css";
export function Card({ character, handleClick }) {
  return (
    <div onClick={handleClick} className="card">
      {character.name == "Abadango Cluster Princess"
        ? "Abadongian princess"
        : character.name}
      <img src={character.image} alt={character.name} />
    </div>
  );
}
