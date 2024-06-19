/* eslint-disable */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Alert } from 'react-bootstrap';

import MainLayout from '../../layouts/MainLayout';
import Box from '../../components/Common/Box';
import FormInput from '../../components/Forms/FormInput';
import FormButton from '../../components/Forms/FormButton';
import FormCheckbox from '../../components/Forms/FormCheckbox';

const SignupScreen = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    phone: '',
    password: '',
    password1: '',
    name: '',
    lastname: '',
    day: '',
    month: '',
    year: '',
    country: '',
    operator: '',
    agreeToPolicies1: false,
    agreeToPolicies2: false,
    agreeToPolicies3: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormValues({
      ...formValues,
      [name]: checked,
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\+?[1-9]\d{1,14}$/; // международный формат телефонного номера
    return re.test(String(phone));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      email,
      password,
      password1,
      name,
      lastname,
      phone,
    } = formValues;

    if (!validateEmail(email)) {
      setModalMessage('Invalid email address');
      setShowModal(true);
      return;
    }

    if (password !== password1) {
      setModalMessage('Passwords do not match');
      setShowModal(true);
      return;
    }

    if (!password) {
      setModalMessage('Password is required');
      setShowModal(true);
      return;
    }

    if (!name) {
      setModalMessage('Name is required');
      setShowModal(true);
      return;
    }

    if (!lastname) {
      setModalMessage('Lastname is required');
      setShowModal(true);
      return;
    }

    if (!phone || !validatePhone(phone)) {
      setModalMessage('Valid phone number is required');
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post('https://cryptoexchange-backend.vercel.app/api/register', {
        email,
        password,
        name,
        lastname,
        phone
      });
      setModalMessage('Registration successful');
      setShowModal(true);
    } catch (error) {
      console.error(error);
      setModalMessage('Registration failed');
      setShowModal(true);
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <MainLayout>
      <div className='flex flex-center'>
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
                <h1 className='form-title center'>Регистрация аккаунта</h1>
                <p className='form-desc center'>
                  Мы отправим данные на ваш номер.
                </p>
                <form className='form' onSubmit={handleSubmit} noValidate>
                  <div className='form-elements'>
                    <div className='form-line'>
                      <div className='full-width'>
                        <label htmlFor='email'>Ваш Email</label>
                        <FormInput
                          type='email'
                          name='email'
                          value={formValues.email}
                          placeholder='Введите ваш Email'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='full-width'>
                        <label htmlFor='password'>Ваш пароль</label>
                        <div className='password-wrapper'>
                          <FormInput
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            value={formValues.password}
                            placeholder='Введите ваш пароль'
                            onChange={handleChange}
                            required
                          />
                          <Button
                            variant='secondary'
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? 'Скрыть' : 'Показать'}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='full-width'>
                        <label htmlFor='password1'>Подтвердите пароль</label>
                        <FormInput
                          type={showPassword ? 'text' : 'password'}
                          name='password1'
                          value={formValues.password1}
                          placeholder='Повторно введите ваш пароль'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='full-width'>
                        <label htmlFor='name'>Ваше имя</label>
                        <FormInput
                          type='text'
                          name='name'
                          value={formValues.name}
                          placeholder='Введите ваше имя'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='full-width'>
                        <label htmlFor='lastname'>Ваша фамилия</label>
                        <FormInput
                          type='text'
                          name='lastname'
                          value={formValues.lastname}
                          placeholder='Введите вашу фамилию'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className='form-line clearfix'>
                      <div className='three-width'>
                        <label htmlFor='day'>Дата рождения</label>
                        <select name='day' value={formValues.day} onChange={handleChange}>
                          <option value=''>День</option>
                          {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                      </div>
                      <div className='three-width'>
                        <label htmlFor='month'>&nbsp;</label>
                        <select name='month' value={formValues.month} onChange={handleChange}>
                          <option value=''>Месяц</option>
                          {months.map((month, index) => (
                            <option key={index} value={index + 1}>{month}</option>
                          ))}
                        </select>
                      </div>
                      <div className='three-width'>
                        <label htmlFor='year'>&nbsp;</label>
                        <select name='year' value={formValues.year} onChange={handleChange}>
                          <option value=''>Год</option>
                          {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className='form-line'>
                      <div className='full-width'>
                        <label htmlFor='phone'>Номер телефона</label>
                        <FormInput
                          type='text'
                          name='phone'
                          value={formValues.phone}
                          placeholder='Введите ваш номер телефона'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className='form-line'>
                      <div className='full-width'>
                        <FormCheckbox
                          name='agreeToPolicies1'
                          checked={formValues.agreeToPolicies1}
                          text='Я прочитал и согласен с Политикой конфиденциальности.'
                          onChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='full-width'>
                        <FormCheckbox
                          name='agreeToPolicies2'
                          checked={formValues.agreeToPolicies2}
                          text='Я прочитал и ознакомлен с Уведомлением о явном согласии.'
                          onChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='full-width'>
                        <FormCheckbox
                          name='agreeToPolicies3'
                          checked={formValues.agreeToPolicies3}
                          text='Я согласен получать коммерческие сообщения по электронной почте, телефону и другим электронным каналам связи согласно Уведомлению о конфиденциальности в отношении продуктов и услуг.'
                          onChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='buttons'>
                        <FormButton type='submit' text='Создать аккаунт' onClick={handleSubmit} />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='center'>
                        <p>
                          У вас уже есть аккаунт? <Link to='/'>Войти</Link>
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
          <Alert variant={modalMessage === 'Registration successful' ? 'success' : 'danger'}>
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

export default SignupScreen;
