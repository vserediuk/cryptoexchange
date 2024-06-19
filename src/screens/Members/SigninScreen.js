import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Alert } from 'react-bootstrap';

import MainLayout from '../../layouts/MainLayout';
import Box from '../../components/Common/Box';
import FormInput from '../../components/Forms/FormInput';
import FormButton from '../../components/Forms/FormButton';

const SigninScreen = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    emailOrPhone: '',
    password: '',
  });

  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://cryptoexchange-backend.vercel.app/api/login', {
        emailOrPhone: formValues.emailOrPhone,
        password: formValues.password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setModalMessage('Login successful');
        setShowModal(true);
        // navigate('/market');
      }
    } catch (error) {
      console.error(error);
      setModalMessage('Login failed');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalMessage === 'Login successful') {
      navigate('/market');
    }
  };

  return (
    <MainLayout>
      <div className='flex flex-center full-height'>
        <div className='login no-select'>
          <Box>
            <div className='box-vertical-padding box-horizontal-padding'>
              <div>
                <div className='form-logo center'>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    alt='Crypto Exchange'
                    draggable='false'
                  />
                </div>
                <h1 className='form-title center'>Логин участника</h1>
                <p className='form-desc center'>
                  Пожалуйста, введите в адресную строку вашего браузера{' '}
                  <strong>https://cryptoexchange-fire.web.app/</strong> Убедитесь, что это написано.
                </p>
                <form className='form' onSubmit={handleSubmit} noValidate>
                  <div className='form-elements'>
                    <div className='form-line'>
                      <div className='full-width'>
                        <label htmlFor='emailOrPhone'>Ваш номер телефона или Email</label>
                        <FormInput
                          type='text'
                          name='emailOrPhone'
                          value={formValues.emailOrPhone}
                          placeholder='Введите свой номер телефона или Email'
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='full-width'>
                        <label htmlFor='password'>Ваш пароль</label>
                        <FormInput
                          type='password'
                          name='password'
                          value={formValues.password}
                          placeholder='Введите ваш пароль'
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='full-width right'>
                        <Link to='/members/forgot-password'>Я забыл свой пароль</Link>
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='buttons'>
                        <FormButton type='submit' text='Авторизоваться' onClick={handleSubmit} />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='center'>
                        <p>
                          Если у вас нет учетной записи{' '}
                          <Link to='/members/signup'>новый аккаунт</Link> создать.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Box>
        </div>
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Сообщение</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant={modalMessage === 'Login successful' ? 'success' : 'danger'}>
            {modalMessage}
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </MainLayout>
  );
};

export default SigninScreen;
