/* eslint-disable */
import { memo, useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import Box from '../../Common/Box';

const CandleStick = memo(() => {
  const [state, setState] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрос на получение свечей с Binance API для пары BTCUSDT за последний час
        const response = await axios.get(
          'https://api.binance.com/api/v3/klines',
          {
            params: {
              symbol: 'BTCUSDT',
              interval: '1h', // Интервал каждый час
              limit: 24, // Ограничение до 24 свечей (для получения данных за последний день)
            },
          }
        );

        // Обработка ответа API и форматирование данных для ApexCharts
        const candleData = response.data.map(item => ({
          x: new Date(item[0]), // Временная метка начала свечи
          y: [item[1], item[2], item[3], item[4]], // [Open, High, Low, Close]
        }));

        const data = {
          series: [
            {
              data: candleData,
            },
          ],
          options: {
            chart: {
              type: 'candlestick',
              height: 470,
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          },
        };

        setState(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Fetch data every hour (3600000 milliseconds = 1 hour)
    const interval = setInterval(fetchData, 3600000);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
        История свечей BTCUSDT за сутки
      </div>
      <div className='box-content box-content-height-nobutton'>
        {state && (
          <ReactApexChart
            options={state.options}
            series={state.series}
            type='candlestick'
            height={470}
          />
        )}
      </div>
    </Box>
  );
});

export default CandleStick;
