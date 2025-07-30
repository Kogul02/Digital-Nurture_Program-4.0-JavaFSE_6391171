import React, { useState } from "react";

function CurrencyConverter() {
  const [rupees, setRupees] = useState("");
  const [euro, setEuro] = useState("");

  const handleSubmit = () => {
    const value = parseFloat(rupees);
    if (isNaN(value)) {
      alert("Please enter a valid number");
      return;
    }
    const converted = value / 90; 
    setEuro(converted.toFixed(2));
  };

  return (
    <div style={{ padding: "20px", border: "1px solid gray" }}>
      <h2>Currency Converter (INR ➜ EUR)</h2>
      <input
        type="number"
        placeholder="Enter amount in INR"
        value={rupees}
        onChange={(e) => setRupees(e.target.value)}
      />
      <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>Convert</button>
      {euro && <p>Equivalent in Euro: €{euro}</p>}
    </div>
  );
}

export default CurrencyConverter;
