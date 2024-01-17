/* src/components/Log.tsx */
import React, { useEffect, useState } from 'react';
import { Stock, LogEntry } from '../types';
import './Log.css';

interface LogProps {
  stocks: Stock[];
  error: string | null;
}

const Log: React.FC<LogProps> = ({ stocks, error }) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  const fetchStocks = () => {
    const newStocks = [...stocks];
    const newEntry: LogEntry = {
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      stocks: newStocks,
    };

    console.log('Adding new log entry:', newEntry);
    setLogEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  useEffect(() => {
    console.log("Log useEffect running; isPaused:", isPaused);
    console.log("Stocks received:", stocks);
    let intervalId: NodeJS.Timeout;

    if (!isPaused) {
      intervalId = setInterval(fetchStocks, 2000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaused, stocks]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="log-container">
      <div className="log-header">
        <h2>Stock Prices Log</h2>
        <button onClick={togglePause} className="pause-button">
          {isPaused ? 'Resume Log' : 'Pause Log'}
        </button>
        </div>
      {error && <p className="log-error">Error: {error}</p>} {/* Display error */}
      <ul className="stock-list">
        {logEntries.map((entry, index) => (
          <li key={index} className={`stock-item ${index === 0 ? 'new-entry' : ''}`}>
            <div>
              <span>Updates for {entry.timestamp}</span>
              {entry.stocks.map((stock, stockIndex) => (
                <div key={stockIndex} className="stock-detail">
                  <span className="stock-code">{stock.code}:</span>
                  <span className="stock-price">${stock.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Log;
