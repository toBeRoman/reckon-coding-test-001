/* src/types/index.ts */
export interface Stock {
    code: string;
    price: number;
  }
  
export interface LogEntry {
timestamp: string;
stocks: Stock[];
}
