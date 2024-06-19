import { memo } from 'react';
import PropTypes from 'prop-types';

const StatusName = memo(({ status }) => {
  if (status === 1) {
    return <span className='green'>Нету</span>;
  }

  return <span className='red'>Недостаточный баланс</span>;
});

StatusName.propTypes = {
  status: PropTypes.number.isRequired,
};

export default StatusName;
