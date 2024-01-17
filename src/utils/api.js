/* src/utils/api.js */
import axios from 'axios';

export const fetchStockData = () => {
  return axios.get('https://join.reckon.com/stock-pricing')
    .then(response => response.data)
    .catch(error => {
      console.error('Failed to fetch stock data:', error);
      throw error;
    });
};
