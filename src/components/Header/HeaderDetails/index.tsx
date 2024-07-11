import CoinPurse from '@/components/CoinPurse';
import { useAccountInfoStore } from '@/store/accountInfo';
import { isMobile } from 'react-device-detect';
import styles from './index.module.scss';

const HeaderDetails = () => {
  const userData = useAccountInfoStore((state) => state.accountInfo);

  return (
    <div className={styles.headerDetails}>
      <div className={styles.coinPurseWrapper}>
        <div className={styles.coinPurseContainer}>
          <CoinPurse
            position="relative"
            accountNow={userData?.accountNow || '0.00'}
            top={0}
            left={isMobile ? '0.15rem' : '0'}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderDetails;
