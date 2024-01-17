/* src/components/Summary.tsx */
import React, { useEffect, useState } from 'react';
import { Stock } from '../types';
import './Summary.css';

interface SummaryState {
    [code: string]: {
      initialSeen: boolean; 
      startingPrice: number;
      lowestPrice: number;
      highestPrice: number; 
      currentPrice: number;
    }
  }

interface Props {
  stocks: Stock[]; 
}

const Summary: React.FC<Props> = ({ stocks }) => {

  const [summary, setSummary] = useState<SummaryState>({});

  useEffect(() => {
    const updatedSummary = stocks.reduce((acc: SummaryState, stock) => {
      const stockSummary = acc[stock.code] || {
        initialSeen: false,
        startingPrice: stock.price,
        lowestPrice: stock.price,
        highestPrice: stock.price,
        currentPrice: stock.price,
      };
  
      if (!stockSummary.initialSeen) {
        stockSummary.initialSeen = true;
        stockSummary.startingPrice = stock.price;
      }
  
      stockSummary.lowestPrice = Math.min(stockSummary.lowestPrice, stock.price);
      stockSummary.highestPrice = Math.max(stockSummary.highestPrice, stock.price);
      stockSummary.currentPrice = stock.price;
  
      acc[stock.code] = stockSummary;
  
      return acc;
    }, { ...summary });
  
    setSummary(updatedSummary);
  
  }, [stocks]);
  
  

  return (
    <div className="summary-container">
      <h2 className="summary-title">Summary</h2>
      <div className="summary-table">
        <div className="summary-header">
          <span>Stock</span>
          <span>Starting</span>
          <span>Lowest</span>
          <span>Highest</span>
          <span>Current</span>
        </div>
        {Object.entries(summary).map(([code, prices]) => (
          <div className="summary-row" key={code}>
            <span>{code}</span>
            <span>${prices.startingPrice.toFixed(2)}</span>
            <span>${prices.lowestPrice.toFixed(2)}</span>
            <span>${prices.highestPrice.toFixed(2)}</span>
            <span>${prices.currentPrice.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;