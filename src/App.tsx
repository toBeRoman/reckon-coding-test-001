/* src/App.tsx */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Log from './components/Log';
import Summary from './components/Summary';
import { Stock } from './types';

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const intervalId = setInterval(() => {
      axios.get<Stock[]>('https://join.reckon.com/stock-pricing')
        .then(response => {
          console.log("Fetched Stocks:", response.data);
          setStocks(response.data);
          setError(null);
          setIsLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch stock data.');
          console.error(err);
          setIsLoading(false);
        });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Prices</h1>
      </header>
      <div className="content">
        <Log stocks={stocks} error={error} />
        <Summary stocks={stocks} />
      </div>
    </div>
  );
}

export default App;
