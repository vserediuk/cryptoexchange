/* eslint-disable */
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const SellOrdersRow = memo(({ item }) => {
  return (
    <tr>
      <td className='left'>
        {item.price} 
      </td>
      <td className='center'>
        {item.amount} {item.currency}
      </td>
      <td className='right'>
        {item.total} 
      </td>
    </tr>
  );
});

SellOrdersRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default SellOrdersRow;
