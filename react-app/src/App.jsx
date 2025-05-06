import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState(''); // State for user input
  const [displayText, setDisplayText] = useState(''); // State for text to display (typewriter effect)

  // Handle input change and update userInput state
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="app-container">
      <h1>Typewriter Effect</h1>
      <input
        type="text"
        value={userInput}
        onChange={(e)=> setUserInput(e.target.value)}
        placeholder="Start typing here..."
        className="input-field"
      />
      <div className="output-container">
        <h2 className="typewriter-text">{userInput}</h2>
      </div>
    </div>
  );
}

export default App;
