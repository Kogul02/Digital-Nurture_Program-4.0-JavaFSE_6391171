import React from 'react';

const IndianPlayers = () => {
  const T20players = ['Kohli', 'Rohit', 'SKY', 'Pant', 'Bumrah'];
  const RanjiPlayers = ['Pujara', 'Rahane', 'Unadkat', 'Jadeja', 'Ashwin'];

  const allPlayers = [...T20players, ...RanjiPlayers];

  // Destructuring
  const [odd1, even1, odd2, even2, odd3, even3, odd4, even4, odd5, even5] = allPlayers;

  const oddTeam = [odd1, odd2, odd3, odd4, odd5];
  const evenTeam = [even1, even2, even3, even4, even5];

  return (
    <div>
      <h2>Merged Players </h2>
      <ul>
        {allPlayers.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <h3>Odd Team Players </h3>
      <ul>
        {oddTeam.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <h3>Even Team Players </h3>
      <ul>
        {evenTeam.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndianPlayers;
