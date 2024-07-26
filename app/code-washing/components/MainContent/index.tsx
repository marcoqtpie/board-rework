'use client';

import OtherHeader from '@/components/OtherHeader';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import CodeWashingRatio from '../CodeWashingRatio';
import CodeWashingRecord from '../CodeWashingRecord';
import SelfServiceCW from '../SelfServiceCW';
import styles from './index.module.scss';

const MainContent = () => {
  const [activeSidebar, setActiveSidebar] = useState(0);
  const theme = useAccountStore((state) => state.theme);
  const list = ['自助洗码', '洗码记录', '洗码比例'];

  return (
    <div className={styles.washCodePage}>
      <OtherHeader headerTitle={'洗码'} />
      <div className={styles.wrapper}>
        <Sidebar sidebarItems={list} activeSidebar={activeSidebar} setActiveSidebar={setActiveSidebar} />
        <div className={styles.mainContent} data-theme={theme}>
          {activeSidebar === 0 && <SelfServiceCW />}
          {activeSidebar === 1 && <CodeWashingRecord />}
          {activeSidebar === 2 && <CodeWashingRatio />}
        </div>
      </div>
    </div>
  );
};

export default MainContent;