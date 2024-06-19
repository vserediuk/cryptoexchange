/* eslint-disable */
import React, { memo, useState, useEffect } from 'react';
import axios from 'axios';
import Box from '../../Common/Box';
import BuyOrdersRow from './BuyOrdersRow';

const BuyOrders = memo(() => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Добавляем состояние для отображения загрузки
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    const fetchBuyOrders = async () => {
      try {
        const symbol = 'BTCUSDT'; // Пара торгов
        const limit = 10; // Лимит заказов

        const response = await axios.get('https://api.binance.com/api/v3/depth', {
          params: {
            symbol: symbol,
            limit: limit,
            // другие параметры по необходимости
          },
        });

        // Обработка полученных данных
        const buyOrders = response.data.bids;

        // Преобразование данных для отображения в компоненте
        const dataArray = buyOrders.map((order, index) => ({
          id: index + 1,
          price: parseFloat(order[0]).toFixed(2), // Преобразование цены в формат с двумя знаками после запятой
          amount: parseFloat(order[1]).toFixed(2), // Преобразование количества в формат с двумя знаками после запятой
          total: (parseFloat(order[0]) * parseFloat(order[1])).toFixed(2), // Вычисление общей суммы заказа
          currency: symbol.substring(0, symbol.indexOf('USDT')) // Валюта, вычисленная из символа
        }));

        for (let i = 1; i < dataArray.length; i++) {
          const prevPrice = dataArray[i - 1].price;
          const currentPrice = dataArray[i].price;

          dataArray[i].type = currentPrice > prevPrice ? 1 : 2;
        }

        // Установка данных в состояние компонента и установка loading в false
        setData(dataArray);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении заказов на покупку с Binance:', error);
        setLoading(false); // В случае ошибки также устанавливаем loading в false
      }
    };

    // Вызов функции fetchBuyOrders сразу при монтировании компонента
    fetchBuyOrders();

    // Устанавливаем интервал для повторного вызова fetchBuyOrders каждую секунду
    const interval = setInterval(fetchBuyOrders, 1000);

    // Возвращаем функцию для очистки интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, []); // Пустой массив зависимостей, чтобы useEffect выполнялся только при монтировании

  const handleMenuOpen = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <Box>
      <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
        <div className='flex flex-center flex-space-between'>
          <p>Покупка</p>
          <button type='button' className='box-icon pointer' onClick={handleMenuOpen}>
            <i className='material-icons'>more_vert</i>
          </button>

          {menuOpened && (
            <div className='box-dropdown'>
              <ul>
                <li>
                  <button type='button'>
                    <i className='material-icons'>settings</i>
                    Кнопка 1
                  </button>
                </li>
                <li>
                  <button type='button'>
                    <i className='material-icons'>favorite</i>
                    Кнопка 2
                  </button>
                </li>
                <li>
                  <button type='button'>
                    <i className='material-icons'>info</i>
                    Кнопка 3
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className='box-content box-content-height-nobutton'>
        <div className='orders-row'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            data && data.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th className='left no-select'>Цена</th>
                    <th className='center no-select'>Сумма</th>
                    <th className='right no-select'>Общее</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <BuyOrdersRow key={item.id.toString()} item={item} />
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>
    </Box>
  );
});

export default BuyOrders;
