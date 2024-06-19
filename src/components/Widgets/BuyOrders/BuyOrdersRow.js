/* eslint-disable */
import { memo } from 'react';
import PropTypes from 'prop-types';

const BuyOrdersRow = memo(({ item }) => {
  return (
    <tr>
      <td className='left'>
        {item.price} USDT
      </td>
      <td className='center'>
        {item.amount} {item.currency}
      </td>
      <td className='right'>
        {item.total} USDT
      </td>
    </tr>
  );
});

BuyOrdersRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default BuyOrdersRow;
