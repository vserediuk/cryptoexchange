import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
/* eslint-disable */

import Box from '../../Common/Box';
import MyAssetsRow from './MyAssetsRow';
import axios from 'axios';

const MyAssets = memo(() => {
  const [data, setData] = useState([]);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd', // Fetching data in USD
            per_page: 7, // Fetching only first 7 coins
            page: 1, // First page
            sparkline: false // Assuming sparkline data is not needed
          }
        });

        const formattedData = response.data.map((coin, index) => ({
          id: index + 1,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          icon: coin.image,
          amount: coin.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          currency: 'USD', // Assuming all are in TRY as per your example
          change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
          changePeriod: 'Неделя', // Assuming this is constant for all coins
          barChartData: [30, 20, 25, 35, 30], // Dummy data
          lineChartData: Array.from({ length: 18 }, (_, i) => Math.floor(Math.random() * 50)), // Dummy data
          status: coin.price_change_percentage_24h > 0 ? 1 : 2 // Adjust status based on condition
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMenuOpen = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <Box>
      <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
        <div className='flex flex-center flex-space-between'>
          <p>Моя криптовалюта</p>
          <div>
            <Link to='/' type='button' className='button button-purple button-small'>
            купить криптовалюту
            </Link>
            <button type='button' className='box-icon pointer' onClick={() => handleMenuOpen()}>
              <i className='material-icons'>more_vert</i>
            </button>

            {menuOpened && (
              <div className='box-dropdown'>
                <ul>
                  <li>
                    <button type='button'>
                      <i className='material-icons'>settings</i>
                      Button 1
                    </button>
                  </li>
                  <li>
                    <button type='button'>
                      <i className='material-icons'>favorite</i>
                      Button 2
                    </button>
                  </li>
                  <li>
                    <button type='button'>
                      <i className='material-icons'>info</i>
                      Button 3
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='box-content box-content-height-nobutton'>
        {data && data.map((item) => <MyAssetsRow key={item.id.toString()} item={item} />)}
      </div>
    </Box>
  );
});

export default MyAssets;
