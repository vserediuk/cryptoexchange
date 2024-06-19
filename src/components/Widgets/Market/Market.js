import { memo, useState, useEffect } from 'react';
/* eslint-disable */
import axios from 'axios';

import { Link } from 'react-router-dom';

import Box from '../../Common/Box';
import MarketRow from './MarketRow';

const Market = memo(() => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd', // Fetching data in USD
            per_page: 7, // Fetching only first 7 coins
            page: 1, // First page
            sparkline: true
          }
        });

        const dataArray = response.data.map((coin, index) => ({
          id: index + 1,
          name: `${coin.symbol.toUpperCase()}/USD`,
          icon: coin.image,
          date: new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' }), // Date format for Poland
          amount: coin.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          currency: 'USD',
          change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
          lineChartData: coin.sparkline_in_7d.price,
          status: coin.price_change_percentage_24h > 0 ? 1 : 2
        }));

        setData(dataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
        Рынки
      </div>
      <div className='box-content box-content-height'>
        {data && data.map((item) => <MarketRow key={item.id.toString()} item={item} />)}
      </div>
      <div className='box-button box-vertical-padding box-horizontal-padding'>
        <Link to='/capital' className='button button-purple button-medium button-block'>
          Больше
          <i className='material-icons button-icon-right'>chevron_right</i>
        </Link>
      </div>
    </Box>
  );  
});

export default Market;
