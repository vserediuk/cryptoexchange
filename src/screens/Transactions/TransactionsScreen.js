import { useState, useEffect } from 'react';
/* eslint-disable */
import SiteLayout from '../../layouts/SiteLayout';
import Header from '../../components/Header/Header';
import TopBar from '../../components/Tables/TopBar/TopBar';
import TransactionRow from '../../components/Tables/Transactions/TransactionRow';

const TransactionsScreen = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const dataArray = [
      {
        id: 1,
        type: 2,
        transaction: '12415346563475',
        date: '2/5/2020 06:24:45',
        from: 'Tarık',
        to: 'Cenk',
        toPicture: 'https://www.cenksari.com/content/profile.jpg',
        coin: 'Bitcoin',
        icon: 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Bitcoin-BTC-icon.png',
        amount: '5.553',
        status: 1,
      },
      {
        id: 2,
        type: 2,
        transaction: '12453465987451',
        date: '3/5/2020 18:35:12',
        from: 'Tarık',
        to: 'Cenk',
        toPicture: 'https://www.cenksari.com/content/profile.jpg',
        coin: 'Etherium',
        icon: 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Ethereum-ETH-icon.png',
        amount: '3.000',
        status: 2,
      },
      {
        id: 3,
        type: 1,
        transaction: '24153459987415',
        date: '4/5/2020 13:42:01',
        from: 'Cenk',
        to: 'Tarık',
        toPicture: '',
        coin: 'Tether',
        icon: 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Tether-USDT-icon.png',
        amount: '158',
        status: 3,
      },
    ];

    setData(dataArray);
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
      <Header icon='sort' title='Транзакции' />
      <TopBar
        searchValue={keyword}
        searchOnChange={handleSearchValue}
        searchSubmit={handleSearchSubmit}
      />

      {data && data.length > 0 && (
        <table className='data-table'>
          <thead>
            <tr>
              <th aria-label='empty' className='left'>
                &nbsp;
              </th>
              <th className='left responsive-hide'>
                Процесс</th>
              <th className='left responsive-hide'>
                История</th>
              <th className='left'>
                От кого</th>
              <th className='left'>
                Для кого</th>
              <th className='left'>Монета</th>
              <th className='center'>
                Количество</th>
              <th className='center'>
                Ситуация</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <TransactionRow key={item.id.toString()} item={item} />
            ))}
          </tbody>
        </table>
      )}
    </SiteLayout>
  );
};

export default TransactionsScreen;
