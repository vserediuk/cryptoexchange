import SiteLayout from '../../layouts/SiteLayout';
import Header from '../../components/Header/Header';

import Box from '../../components/Common/Box';
import BankProcess from '../../components/Widgets/BankProcess/BankProcess';
import RecentActivity from '../../components/Widgets/RecentActivity/RecentActivity';

/* eslint-disable */

const DashboardScreen = () => (
  <SiteLayout>
    <Header icon='sort' title='Депозиты и снятия' />
    <div className='flex flex-destroy flex-space-between'>
      <div className='flex-1 box-right-padding'>
        <BankProcess />
      </div>
      <div className='flex-1'>
        <Box>
          <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
            <div className='flex flex-center flex-space-between'>
              <p>Важно</p>
            </div>
          </div>
          <div className='box-content box-text box-horizontal-padding box-content-height-nobutton'>
            <p>
              &bull; При переводах через ЕРИП необходимо указывать получателя как Crypto Exchange.
            </p>
            <p>
              &bull; С вашего имени можно осуществлять переводы на указанные счета со всех ваших
              личных текущих счетов в турецких лирах. Переводы с чужих счетов не принимаются.
            </p>
            <p>
              &bull; Переводы через банкоматы (с картой/без карты) не принимаются, так как невозможно
              подтвердить данные отправителя.
            </p>
            <p>
              &bull; После проверок система автоматически зачислит переведенную сумму на ваш счет,
              и дополнительное уведомление не требуется.
            </p>
            <p>
              &bull; Вы уже завершили процесс проверки личности, поэтому в поле описания перевода
              необходимо вводить фиксированный код депозита.
            </p>
          </div>
        </Box>
      </div>
    </div>
    <div className='flex flex-destroy flex-space-between'>
      <div className='flex-1 box-right-padding'>
        <RecentActivity />
      </div>
      <div className='flex-1'>
        <Box>
          <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
            <div className='flex flex-center flex-space-between'>
              <p>Важно</p>
            </div>
          </div>
          <div className='box-content box-text box-horizontal-padding box-content-height-nobutton'>
            <p>
              &bull; С вашего имени (личные текущие счета в турецких лирах) можно совершать
              операции по снятию средств. Переводы на счета других лиц не допускаются.
            </p>
            <p>&bull; Минимальная сумма снятия составляет 10 турецких лир.</p>
            <p>&bull; Во время операции снятия взимается комиссия в размере 3 турецких лир.</p>
            <p>
              &bull; После подачи инструкции на снятие, указанная сумма будет списана с вашего
              доступного баланса.
            </p>
            <p>
              &bull; Вы можете отменить еще не выполненные инструкции на снятие. В этом случае сумма
              инструкции будет возвращена на ваш доступный баланс.
            </p>
            <p>
              &bull; Инструкции на снятие, поданные вне рабочего времени банка, будут обработаны
              с началом рабочего дня банка.
            </p>
          </div>
        </Box>
      </div>
    </div>
  </SiteLayout>
);

export default DashboardScreen;