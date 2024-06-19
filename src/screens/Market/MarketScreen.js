import { useState, useEffect } from 'react';
import axios from 'axios';

import MainLayout from '../../layouts/MainLayout';
import Header from '../../components/Header/Header';
import Market from '../../components/Widgets/Market/Market';
import BuySell from '../../components/Widgets/BuySell/BuySell';
import BuyOrders from '../../components/Widgets/BuyOrders/BuyOrders';
import SellOrders from '../../components/Widgets/SellOrders/SellOrders';
import TradeHistory from '../../components/Widgets/TradeHistory/TradeHistory';
import CoinHorizontal from '../../components/Widgets/Coin/CoinHorizontal';
import CandleStick from '../../components/Widgets/CandleStick/CandleStick';

const MarketScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [coinInfo, setCoinInfo] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin');
        const coinData = {
          id: response.data.id,
          name: response.data.name,
          symbol: response.data.symbol.toUpperCase(),
          change: `${response.data.market_data.price_change_percentage_24h.toFixed(2)}%`,
          currency: 'USD', // Fixed to USD
          exchange: 'BTC/USD', // Fixed to BTC/USD
          weight: `${response.data.market_data.total_volume.usd.toLocaleString()} USD`,
          financialRate: `${response.data.market_data.price_change_percentage_1h_in_currency.usd.toFixed(4)}%/hr`,
          icon: response.data.image.large,
          amount: `${response.data.market_data.current_price.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
          description: response.data.description.en,
        };

        setCoinInfo(coinData);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    fetchCoinData();
  }, []);

  const handleSearchValue = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submit if needed
  };

  return (
    <MainLayout>
      <div className='content'>
        <Header title='Market' />
        <div className='flex flex-destroy'>
          <div className='content-30 box-right-padding'>
            <Market />
          </div>
          <div className='content-70 flex-1'>
            {coinInfo && (
              <CoinHorizontal
                item={coinInfo}
                searchValue={keyword}
                searchOnChange={handleSearchValue}
                searchSubmit={handleSearchSubmit}
              />
            )}

            <div className='flex flex-destroy'>
              <div className='content-70 flex-1 box-right-padding'>
                <CandleStick />
              </div>
              <div className='content-30'>
                <BuySell />
              </div>
            </div>

            <div className='flex flex-destroy flex-space-between'>
              <div className='flex-1 box-right-padding'>
                <TradeHistory />
              </div>
              <div className='flex-1 box-right-padding'>
                <BuyOrders />
              </div>
              <div className='flex-1'>
                <SellOrders />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MarketScreen;
