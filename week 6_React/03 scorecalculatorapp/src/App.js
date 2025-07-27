import React from 'react';
import { CalculateScore } from './Components/CalculateScore'; // Adjust the import path if needed


function App() {
  return (
    <div className="App">
      <CalculateScore
        Name="HARISH"
        School="Vivekanandha Higher Secondary School"
        total={450}
        goal={500}
      />
    </div>
  );
}

export default App;
