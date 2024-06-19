import { Link } from 'react-router-dom';
/* eslint-disable */

const NotFoundScreen = () => (
  <div className='full-height flex flex-column flex-center'>
    <img
      src={`${process.env.PUBLIC_URL}/images/logo.png`}
      alt='Crypto Exchange'
      draggable='false'
      className='logo-404'
    />
    <h1 className='title-404'>404</h1>
    <p className='paragraph-404'>
      На сервере Crypto Exchange такой страницы не обнаружено.</p>
    <Link to='/' className='button button-purple button-medium'>
      Вернуться на домашнюю страницу
    </Link>
  </div>
);

export default NotFoundScreen;
