/* eslint-disable */
import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '../../Common/Box';
import TradeHistoryRow from './TradeHistoryRow';
import axios from 'axios';

const TradeHistory = memo(() => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        // Fetching Bitcoin trade history from Binance API
        const response = await axios.get('https://api.binance.com/api/v3/trades', {
          params: {
            symbol: 'BTCUSDT', // Specify the trading pair
            limit: 10, // Limit to 10 trades
          },
        });

        // Extracting the last 10 trades from the fetched data
        const tradeHistory = response.data.map((trade, index) => ({
          id: index + 1,
          amount: parseFloat(trade.price).toFixed(2), // Price in USD
          currency: 'USD', // Currency is fixed to USD
          weight: parseFloat(trade.qty).toFixed(4), // Trade volume in BTC
          time: new Date(trade.time).toLocaleTimeString(), // Converting timestamp to time
          type: trade.isBuyerMaker ? 1 : 2, // Type: 1 for buy, 2 for sell
        }));

        setData(tradeHistory);
      } catch (error) {
        console.error('Error fetching trade history:', error);
      }
    };

    // Fetch initial trade history when component mounts
    fetchTradeHistory();

    // Set up interval to fetch trade history every 5 seconds
    const interval = setInterval(() => {
      fetchTradeHistory();
    }, 1000); // Fetch data every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <Box>
      <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
        История торгов
      </div>
      <div className='box-content box-content-height'>
        <div className='trade-history-row'>
          {data && data.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th className='left no-select'>Цена</th>
                  <th className='center no-select'>Объем</th>
                  <th className='center no-select'>Тип</th>
                  <th className='right no-select'>Время</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <TradeHistoryRow key={item.id.toString()} item={item} />
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className='box-button box-vertical-padding box-horizontal-padding'>
        <Link to='/market' className='button button-purple button-medium button-block'>
          Подробнее
          <i className='material-icons button-icon-right'>chevron_right</i>
        </Link>
      </div>
    </Box>
  );
});

export default TradeHistory;

