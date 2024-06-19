/* eslint-disable */
import React, { useState } from 'react';
import { Card, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import SiteLayout from '../../layouts/SiteLayout';
import './ExchangeScreen.css'; // Подключаем файл со стилями

const CryptoExchange = () => {
  const [selectedCrypto1, setSelectedCrypto1] = useState('BTC');
  const [selectedCrypto2, setSelectedCrypto2] = useState('USTD');
  const cryptocurrencies = ['BTC', 'USTD', 'LITECOIN', 'ETHERIUM'];

  const handleCrypto1Change = (crypto) => {
    setSelectedCrypto1(crypto);
  };

  const handleCrypto2Change = (crypto) => {
    setSelectedCrypto2(crypto);
  };

  const handleExchange = () => {
    // Here you can implement trade logic
    console.log(`Trading ${selectedCrypto1} for ${selectedCrypto2}`);
    // You can add actual trading logic here
    // For simplicity, I'm just logging the trade action
  };

  return (
    <SiteLayout>
      <Card className="crypto-exchange-card">
        <div className="crypto-exchange-header">
          <h5>Выбор монет</h5>
        </div>
        <div className="crypto-exchange-content">
          <div className="crypto-dropdown">
            <DropdownButton
              title={selectedCrypto1}
              variant="primary"
              className="mb-2"
            >
              {cryptocurrencies.map((crypto) => (
                <Dropdown.Item
                  key={crypto}
                  active={selectedCrypto1 === crypto}
                  onClick={() => handleCrypto1Change(crypto)}
                >
                  {crypto}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
          <span className="exchange-arrow">&#8595;</span>
          <div className="crypto-dropdown">
            <DropdownButton
              title={selectedCrypto2}
              variant="primary"
              className="mb-2"
            >
              {cryptocurrencies.map((crypto) => (
                <Dropdown.Item
                  key={crypto}
                  active={selectedCrypto2 === crypto}
                  onClick={() => handleCrypto2Change(crypto)}
                >
                  {crypto}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </div>

        <Button variant="success" onClick={handleExchange}>
         Обмен
        </Button>

        <div className="selected-cryptos">
          <strong>Первая криптовалюта:</strong> {selectedCrypto1}
          <br />
          <strong>Вторая  криптовалюта:</strong> {selectedCrypto2}
        </div>
      </Card>
    </SiteLayout>
  );
};

export default CryptoExchange;
