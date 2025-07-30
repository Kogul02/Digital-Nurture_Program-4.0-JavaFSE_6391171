import React from "react";
import "./App.css";

function App() {
  const office1 = {
    name: "Alpha Towers",
    rent: 55000,
    address: "123, Business Park, Chennai",
image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=300&h=200&q=80"

  };

  const office2 = {
    name: "Beta Plaza",
    rent: 75000,
    address: "456, Tech Zone, Bangalore",
image: "https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&w=300&h=200&q=80"
  };

  const officeList = [office1, office2];

  return (
    <div className="App">
      <h1>Office Space Rental</h1>

      {officeList.map((office, index) => (
        <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <img src={office.image} alt={office.name} width="300" height="200" />
          <h2>{office.name}</h2>
          <p><strong>Address:</strong> {office.address}</p>
          <p style={{ color: office.rent < 60000 ? "red" : "green" }}>
            <strong>Rent:</strong> ₹{office.rent}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
