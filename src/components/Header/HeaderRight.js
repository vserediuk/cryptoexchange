/* eslint-disable */
import { memo, useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';

const HeaderRight = memo(() => {
  const location = useLocation();
  const [user, setUser] = useState({ name: '', lastname: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://cryptoexchange-backend.vercel.app/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    // Redirect to sign-in page
    return <Navigate to='/' replace />;
  };

  return (
    <div className='header-right no-select'>
      <div className='flex flex-center'>
        {/* Меню навигации */}
        <ul className='header-menu nowrap'>
          <li>
            <Link
              to='/market'
              className={location.pathname.toLowerCase().includes('/market') ? 'active' : 'passive'}
            >
              Маркет
            </Link>
          </li>
        </ul>
        {/* Иконки в шапке */}
        <ul className='header-icons nowrap'>
          <li>
            <Link to='/members/notifications'>
              <span className='notification-badge'>1337</span>
              <i className='material-icons'>notifications</i>
            </Link>
          </li>
        </ul>
        {/* Информация о пользователе */}
        <ul className='header-user nowrap'>
          <li>
            <Link to='/members'>
              <span>{user.name}</span>
              <span>{user.lastname}</span>
            </Link>
          </li>
          <li>
            <Link to='/members'>
              <div
                className='profile-picture cover'
                style={{
                  backgroundImage: `url('https://cdn.militaria.pl/media/catalog/product/cache/e452159aead1684753d5e9341f2edeb6/8/3/836200_Naszywka-M-Tac-Anonymous-Black-GiD-51313299.jpg')`,
                }}
              />
            </Link>
          </li>
          <li className='responsive-hide'>
            <Link to='/' className='signout' onClick={handleSignOut}>
              <i className='material-icons'>power_settings_new</i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default HeaderRight;
