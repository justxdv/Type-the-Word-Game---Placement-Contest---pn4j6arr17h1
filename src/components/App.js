import React, { useState, useEffect } from 'react';
import "../styles/App.css";

const WORD_LIST = ['apple', 'banana', 'cherry', 'grape', 'orange'];

function App() {
  const [word, setWord] = useState('');
  const [flashWord, setFlashWord] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setWord(WORD_LIST[index]);
    const timer = setTimeout(() => {
      setFlashWord(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [index]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setResult(userInput === word ? 'You Won!' : 'You Lost!');
    setFlashWord(false);
    setUserInput('');
  };

  const handleRestartClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % WORD_LIST.length);
    setResult('');
    setFlashWord(true);
  };

  return (
    <div className="mini-game-container">
      <h2 className="mini-game-title">Mini Game</h2>
      {flashWord ? (
        <p className="mini-game-word">{word}</p>
      ) : result ? (
        <>
          <p className="mini-game-result">{result}</p>
          <button
            className="mini-game-restart-button"
            onClick={handleRestartClick}
          >
            Restart
          </button>
        </>
      ) : (
        <form className="mini-game-form" onSubmit={handleFormSubmit}>
          <input
            className="mini-game-input"
            type="text"
            value={userInput}
            onChange={handleInputChange}
            autoFocus
          />
          <button className="mini-game-button" type="submit">
            Check Answer
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
