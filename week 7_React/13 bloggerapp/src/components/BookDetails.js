import React from 'react';

const books = [
  { title: 'Master React', price: 670 },
  { title: 'Deep Dive into Angular 11', price: 800 },
  { title: 'Mongo Essentials', price: 450 }
];

function BookDetails() {
  return (
    <div className="column">
      <h2>Book Details</h2>
      {books.map((book, index) => (
        <div key={index}>
          <strong>{book.title}</strong><br />
          <span>{book.price}</span><br /><br />
        </div>
      ))}
    </div>
  );
}

export default BookDetails;
