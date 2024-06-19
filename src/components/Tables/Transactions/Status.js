import { memo } from 'react';
import PropTypes from 'prop-types';

const Status = memo(({ status }) => {
  if (status === 1) {
    return <span className='status green'>ЗАВЕРШЕНО</span>;
  }

  if (status === 2) {
    return <span className='status red'>ОТМЕНЕНО</span>;
  }

  return <span className='status gray'>В ОЖИДАНИИ</span>;
});

Status.propTypes = {
  status: PropTypes.number.isRequired,
};

export default Status;
