import logo from "./logo.svg";
import react, { useState, useEffect } from "react";
import "./App.css";
import QuotesTypingGame from "./quoteType";

const App = () => {
  return (
    <div className="App">
      <QuotesTypingGame />
    </div>
  );
};

export default App;
