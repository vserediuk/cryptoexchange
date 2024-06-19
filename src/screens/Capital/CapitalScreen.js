import { useState, useEffect } from 'react';
import axios from 'axios';

/* eslint-disable */

import SiteLayout from '../../layouts/SiteLayout';
import Header from '../../components/Header/Header';
import TopBar from '../../components/Tables/TopBar/TopBar';
import CapitalRow from '../../components/Tables/Capital/CapitalRow';

const CapitalScreen = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://api.coingecko.com/api/v3/coins/markets";
      const params = {
        vs_currency: 'USD',
        order: 'market_cap_desc',
        per_page: 7,
        page: 1,
        sparkline: true
      };
      try {
        const response = await axios.get(url, { params });
        const coins = response.data.map((coin, idx) => ({
          id: idx + 1,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          icon: coin.image,
          amount: `${coin.current_price.toLocaleString()}`,
          currency: 'USD',
          change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
          weight: `$${coin.market_cap.toLocaleString()}`,
          lineChartData: coin.sparkline_in_7d.price,
          status: coin.price_change_percentage_24h > 0 ? 1 : 2
        }));
        setData(coins);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchValue = (e) => {
    const { value } = e.target;

    setKeyword(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <SiteLayout>
      <Header icon='sort' title='Рынок' />
      <TopBar
        searchValue={keyword}
        searchOnChange={handleSearchValue}
        searchSubmit={handleSearchSubmit}
      />

      {data && data.length > 0 && (
        <table className='data-table'>
          <thead>
            <tr>
              <th className='left'>Заказ</th>
              <th className='left'>Монета</th>
              <th className='center'>окончательная цена</th>
              <th className='center'>Изменение (24 часа)</th>
              <th className='center responsive-hide2'>Объем (24 часа)</th>
              <th className='left responsive-hide'>График</th>
              <th aria-label='empty' className='right'>
                {' '}
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <CapitalRow key={item.id.toString()} item={item} index={index + 1} />
            ))}
          </tbody>
        </table>
      )}
    </SiteLayout>
  );
};

export default CapitalScreen;
