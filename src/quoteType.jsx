import React, { useState, useEffect } from "react";

const QuotesTypingGame = () => {
  const quotesAPI = "https://type.fit/api/quotes";
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const [typedQuote, setTypedQuote] = useState("");
  const [message, setMessage] = useState("");
  const [quoteBorderColor, setQuoteBorderColor] = useState("");

  useEffect(() => {
    fetch(quotesAPI)
      .then((response) => response.json())
      .then((data) => setQuotes(data));
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      setStartTime(new Date());
    }
  }, [quotes]);

  useEffect(() => {
    if (numberOfAttempts === 10) {
      const endTime = new Date();
      const timeTaken = (endTime - startTime) / 1000;
      setTotalTime(totalTime + timeTaken);
      setCurrentQuoteIndex(null);
    }
  }, [numberOfAttempts, startTime, totalTime]);

  const handleTypingInput = (event) => {
    setTypedQuote(event.target.value);
  };

  const handleTypingSubmit = (event) => {
    event.preventDefault();
    checkQuote();
  };

  const checkQuote = () => {
    const quote = quotes[currentQuoteIndex].text;
    if (typedQuote === quote) {
      setScore(score + 1);
      setMessage("");
      setQuoteBorderColor("");
      setTypedQuote("");
      setCurrentQuoteIndex(currentQuoteIndex + 1);
      setNumberOfAttempts(numberOfAttempts + 1);
    } else {
      setMessage("Incorrect");
      setQuoteBorderColor("red");
      alert("Incorrect!!");
      setCurrentQuoteIndex(currentQuoteIndex + 1);
      setNumberOfAttempts(numberOfAttempts + 1);
    }
  };

  const displayQuote = () => {
    const quote = quotes[currentQuoteIndex].text;
    return <div id="quote">{quote}</div>;
  };

  const displayResult = () => {
    const averageTime = totalTime / numberOfAttempts;
    return (
      <div>
        <div>Time taken: {totalTime} seconds</div>
        <div>Average time: {averageTime} seconds</div>
      </div>
    );
  };

  if (currentQuoteIndex === null) {
    return displayResult();
  }

  return (
    <div>
      <div id="quote-container" style={{ borderColor: quoteBorderColor }}>
        {displayQuote()}
      </div>
      <form id="typing-area" onSubmit={handleTypingSubmit}>
        <input
          id="typing-input"
          type="text"
          value={typedQuote}
          onChange={handleTypingInput}
        />
        <button type="submit">Submit</button>
      </form>
      <div id="message">{message}</div>
      <div id="time">{startTime ? new Date() - startTime : ""} seconds</div>
      <div id="avg-time">
        {totalTime && numberOfAttempts && displayResult()}
      </div>
      <div id="score">{score}</div>
    </div>
  );
};

export default QuotesTypingGame;
