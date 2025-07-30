import React from 'react';

const ListOfPlayers = () => {
  const players = [
    { name: 'Virat', score: 95 },
    { name: 'Rohit', score: 85 },
    { name: 'Rahul', score: 65 },
    { name: 'Shreyas', score: 50 },
    { name: 'Pant', score: 90 },
    { name: 'Jadeja', score: 70 },
    { name: 'Ashwin', score: 40 },
    { name: 'Shami', score: 55 },
    { name: 'Bumrah', score: 88 },
    { name: 'Suryakumar', score: 99 },
    { name: 'Gill', score: 78 }
  ];

  const allPlayers = players.map((player, index) => (
    <li key={index}>{player.name} - {player.score}</li>
  ));

  const below70 = players.filter(player => player.score < 70);

  const lowScorers = below70.map((player, index) => (
    <li key={index}>{player.name} - {player.score}</li>
  ));

  return (
    <div>
      <h2>List of Players </h2>
      <ul>{allPlayers}</ul>

      <h3>Players with Score Below 70 </h3>
      <ul>{lowScorers}</ul>
    </div>
  );
};

export default ListOfPlayers;