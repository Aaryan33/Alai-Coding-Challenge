import React, { useState } from 'react';
import TldrawComponent from './TldrawComponent';

const App: React.FC = () => {
  const [itemCount, setItemCount] = useState<number>(3);
  const [inputValue, setInputValue] = useState<number>(3); // Separate state for input value

  const handleGenerate = () => {
    // Update itemCount when the Generate button is clicked
    setItemCount(inputValue);
  };

  return (
    <div className="App">
      <h1>Timeline Generator</h1>
      <div>
        <input
          type="number"
          value={inputValue} // Use inputValue instead of itemCount
          onChange={(e) => setInputValue(Math.max(1, parseInt(e.target.value, 10) || 1))} // Update inputValue state
          min={1}
        />
        <button onClick={handleGenerate}>Generate</button>
      </div>
      <TldrawComponent items={itemCount} /> 
    </div>
  );
};

export default App;
