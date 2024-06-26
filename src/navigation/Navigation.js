/* eslint-disable */
import { Routes, Route } from 'react-router-dom';

import SigninScreen from '../screens/Members/SigninScreen';
import SignupScreen from '../screens/Members/SignupScreen';
import ForgotScreen from '../screens/Members/ForgotScreen';
import ProfileScreen from '../screens/Members/ProfileScreen';
import MarketScreen from '../screens/Market/MarketScreen';
import CapitalScreen from '../screens/Capital/CapitalScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import TransactionsScreen from '../screens/Transactions/TransactionsScreen';
import ExchangeScreen from '../screens/Exchange/ExchangeScreen'

import NotFoundScreen from '../screens/NotFound/NotFoundScreen';

const Navigation = () => (
  <Routes>
    <Route path='/' element={<SigninScreen />} />
    <Route path='/market' element={<MarketScreen />} />
    <Route path='/members' element={<ProfileScreen />} />
    <Route path='/capital' element={<CapitalScreen />} />
    <Route path='/dashboard' element={<DashboardScreen />} />
    <Route path='/transactions' element={<TransactionsScreen />} />
    <Route path='/members/forgot-password' element={<ForgotScreen />} />
    <Route path='/members/signup' element={<SignupScreen />} />
    <Route path='/exchange' element={<ExchangeScreen/>}/>
    <Route path='*' element={<NotFoundScreen />} status={404} />
  </Routes>
);

export default Navigation;
