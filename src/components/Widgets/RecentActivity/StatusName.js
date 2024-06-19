import { memo } from 'react';
import PropTypes from 'prop-types';

const StatusName = memo(({ status }) => {
  if (status === 1) {
    return <span className='green'>Выполнено</span>;
  }

  if (status === 2) {
    return <span className='red'>Не выполнено</span>;
  }

  return <span className='gray'>В ожидании</span>;
});

StatusName.propTypes = {
  status: PropTypes.number.isRequired,
};

export default StatusName;
