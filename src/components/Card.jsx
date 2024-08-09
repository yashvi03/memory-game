import { useEffect, useState } from "react";
import FetchCharacters from "./FetchCharacters";
import "../styles/Styles.css";
import Scoreboard from "./ScoreBoard";
import Modal from "./Modal";

function Card() {
  const [characters, setCharacters] = useState([]);
  const [shuffledCharacters, setShuffledCharacters] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchDate = async () => {
      const characters = await FetchCharacters();
      setCharacters(characters.slice(0, 10));
    };
    fetchDate();
  }, []);

  useEffect(() => {
    shuffleCards();
  }, [characters]);

  const shuffleCards = () => {
    let unselectedCharacters = characters.filter(
      (character) => !selectedCards.includes(character.id)
    );

    if (unselectedCharacters.length < 5) {
      unselectedCharacters = [
        ...unselectedCharacters,
        ...characters
          .filter((character) => selectedCards.includes(character.id))
          .slice(0, 5 - unselectedCharacters.length),
      ];
    }

    const shuffled = [...unselectedCharacters].sort(() => 0.5 - Math.random());
    setShuffledCharacters(shuffled.slice(0, 5));
  };

  const handleCardClick = (id) => {
    if (selectedCards.includes(id)) {
      setResult("You Lose");
      setScore(0);
      setSelectedCards([]);
    } else {
      const newSelectedCards = [...selectedCards, id];
      setSelectedCards(newSelectedCards);
      setScore(score + 1);
      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }

      if (newSelectedCards.length === characters.length) {
        setResult("You Win");
      }
    }
    shuffleCards();
  };

  const closeModal = () => {
    setResult("");
  };
  return (
    <div className="container">
      <div className="heading">
        <div className="head-sec">
          <div className="header">Memory Game</div>
          <p className="rules">
            Get points by clicking on an image but don't click on any more than
            once!
          </p>
        </div>
        <Scoreboard score={score} bestScore={bestScore} />
      </div>
      <div className="counter">{score}/10</div>
      <ul className="cards-grid">
        {shuffledCharacters.map((character) => (
          <li
            key={character.id}
            className="card-item"
            onClick={() => handleCardClick(character.id)}
          >
            <img
              src={character.image}
              alt={character.name}
              className="card-image"
            />
            <h3>{character.name}</h3>
          </li>
        ))}
      </ul>
      {result && <Modal result={result} closeModal={closeModal} />}
    </div>
  );
}

export default Card;
