import React, { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
    sayHello();
  };

  const decrement = () => {
    setCount(prev => prev - 1);
  };

 
  const sayHello = () => {
    alert("Hello! Welcome");
  };


  const sayWelcome = (msg) => {
    alert(msg);
  };


  const handleSyntheticEvent = (event) => {
    console.log("Synthetic Event:", event);
    alert("I was clicked");
  };

  return (
    <div className="App" style={{ textAlign: "center", padding: "20px" }}>
      <h1>React Event Handling</h1>

      <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement} style={{ marginLeft: "10px" }}>Decrement</button>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => sayWelcome("Welcome")}>
          Say Welcome
        </button> 
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSyntheticEvent}>Click me</button>
      </div>

      <div style={{ marginTop: "40px" }}>
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;
