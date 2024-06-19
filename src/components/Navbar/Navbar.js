/* eslint-disable */
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Correct way to import

import NavbarButton from './NavbarButton';

const Navbar = memo(() => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === 'admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <nav className='navbar-inner no-select'>
      <div className='logo'>
        <Link to='/market'>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt='Crypto Exchange'
            draggable='false'
          />
        </Link>
      </div>
      <h3>Основное меню</h3>
      <ul>
        <li>
          <NavbarButton url='/dashboard' icon='dashboard' title='Депозит-снятие' />
        </li>
        <li>
          <NavbarButton url='/wallet' icon='account_balance_wallet' title='Мой кошелек' />
        </li>
        <li>
          <NavbarButton url='/transactions' icon='sync' title='Транзакции' />
        </li>
        <li>
          <NavbarButton url='/trading' icon='paid' title='Торговля' />
        </li>
        <li>
          <NavbarButton url='/exchange' icon='account_balance' title='Обмен' />
        </li>
        <li>
          <NavbarButton url='/capital' icon='equalizer' title='Рынок' />
        </li>
        {isAdmin && (
          <li>
            <NavbarButton url='/admin' icon='admin_panel_settings' title='Админ панель' />
          </li>
        )}
      </ul>
      <h3>Другие разделы</h3>
      <ul>
        <li>
          <NavbarButton url='/members' icon='account_circle' title='Профиль' />
        </li>
        <li>
          <NavbarButton url='/messages' icon='chat' title='Сообщения' />
        </li>
        <li>
          <NavbarButton url='/settings' icon='settings' title='Настройки' />
        </li>
      </ul>
      <div className='copyright'>
        <strong>Crypto Exchange</strong>
        <p>
          2024 &copy; Все права защищены.
          <br />
        </p>
      </div>
    </nav>
  );
});

export default Navbar;
