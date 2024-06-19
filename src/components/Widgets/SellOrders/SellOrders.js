/* eslint-disable */
import React, { memo, useState, useEffect } from 'react';
import axios from 'axios';
import Box from '../../Common/Box';
import SellOrdersRow from './SellOrdersRow';

const SellOrders = memo(() => {
  const [sellOrders, setSellOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellOrders = async () => {
      try {
        const symbol = 'BTCUSDT';
        const response = await axios.get('https://api.binance.com/api/v3/depth', {
          params: {
            symbol: symbol, // Trading pair symbol for Bitcoin to USDT
            limit: 10, // Number of sell orders to fetch (adjust as needed)
          },
        });

        const sellOrdersData = response.data?.asks; // Assuming 'asks' contains sell orders

        if (!Array.isArray(sellOrdersData)) {
          throw new Error('Invalid data structure from Binance API');
        }

        const formattedSellOrders = sellOrdersData.map((order, index) => ({
          id: index + 1,
          price: order[0], // Price of the sell order in Bitcoin
          amount: order[1], // Amount of cryptocurrency being sold
          total: (order[0] * order[1]).toFixed(2), // Total value of the sell order in Bitcoin
          currency: symbol.substring(0, symbol.indexOf('USDT')) // Currency of the sell order (in this case USD)
        }));

        setSellOrders(formattedSellOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sell orders from Binance API:', error);
        setError('Failed to fetch sell orders');
        setLoading(false);
      }
    };

    // Fetch sell orders initially
    fetchSellOrders();

    // Fetch sell orders every minute
    const interval = setInterval(fetchSellOrders, 1000); // 60000 milliseconds = 1 minute

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures useEffect runs only once on mount


  return (
    <Box>
      <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
        <div className='flex flex-center flex-space-between'>
          <p>Продажи</p>
          {/* Add your menu toggle button and dropdown here */}
        </div>
      </div>
      <div className='box-content box-content-height-nobutton'>
        <div className='orders-row'>
          {loading ? 

            <p>Loading...</p>
          : 
            <table>
              <thead>
                <tr>
                  <th className='left no-select'>Цена (USD)</th>
                  <th className='center no-select'>Количество</th>
                  <th className='right no-select'>Всего (USD)</th>
                </tr>
              </thead>
              <tbody>
                {sellOrders.map((item) => (
                  <SellOrdersRow key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
    </Box>
  );
});

export default SellOrders;
