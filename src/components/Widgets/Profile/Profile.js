/* eslint-disable */
import { memo, useState, useEffect } from 'react';
import axios from 'axios';
import Box from '../../Common/Box';

const Profile = memo(() => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [user, setUser] = useState({ name: '', lastname: '' });

  const handleMenuOpen = () => {
    setMenuOpened(!menuOpened);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://cryptoexchange-backend.vercel.app/api/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assumes token is stored in localStorage
          }
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box>
      <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
        <div className='flex flex-center flex-space-between'>
          <p>Профиль</p>
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
      <div className='widget-profile box-content box-content-height-nobutton'>
        <div className='center'>
          <form className='upload no-select' noValidate>
            <input type='file' name='file' id='file' accept='.jpg, .jpeg' />
            <label htmlFor='file'>
              <div
                className='icon cover pointer'
                style={{
                  backgroundImage: `url('https://cdn.militaria.pl/media/catalog/product/cache/e452159aead1684753d5e9341f2edeb6/8/3/836200_Naszywka-M-Tac-Anonymous-Black-GiD-51313299.jpg')`,
                }}
              />
              <div className='edit pointer'>
                <i className='material-icons'>edit</i>
              </div>
            </label>
          </form>
        </div>
        <div className='box-horizontal-padding'>
          <div className='center'>
            <h3>{user.name} {user.lastname}</h3>
          </div>
        </div>
      </div>
    </Box>
  );
});

export default Profile;
