import { memo } from 'react';
import PropTypes from 'prop-types';

const TradeHistoryRow = memo(({ item }) => (
  <tr className={item.type === 1 ? 'green' : 'red'}>
    <td className='left'>
      {item.amount} {item.currency}
    </td>
    <td className='center'>{item.weight}</td>
    <td className='center'>{item.type === 1 ? 'ПОКУПКА' : 'ПРОДАЖА'}</td>
    <td className='right'>{item.time}</td>
  </tr>
));

TradeHistoryRow.propTypes = {
  item: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
};

export default TradeHistoryRow;
