import React from 'react';
import './App.css';
import CohortDetails from './CohortDetails';
import { CohortsData } from './Cohort';

function App() {
  return (
    <div className="App">
      <h1>Cohorts Details</h1>
      <div className="container">
        {CohortsData.map((cohort, index) => (
          <CohortDetails key={index} cohort={cohort} />
        ))}
      </div>
    </div>
  );
}

export default App;
