'use client';

import Iframe from '@/app/customer-service/components/Iframe';
import styles from '@/app/customer-service/components/MainContent/index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useCSStore } from '@/components/Providers/CSStoreProvider';
import { CustomerServiceData } from '@/types/fns';
import { FC } from 'react';

export type MainContentProps = { customerServiceData: CustomerServiceData };
export type MainContentComponent = FC<Readonly<MainContentProps>>;

const MainContent: MainContentComponent = ({ customerServiceData }) => {
  const theme = useAccountStore((state) => state.theme);
  const activeTab = useCSStore((state) => state.activeTab);

  return (
    <section className={styles.mainContent} data-theme={theme}>
      {activeTab === 0 && <Iframe />}
      {/* {csActiveTab === 0 && <CsIframe />}
      {!!csPopData?.length && csActiveTab === 1 && <CsPop csPopData={csPopData} />}
      {!csPopData?.length ? csActiveTab === 1 && <FAQComponent /> : csActiveTab === 2 && <FAQComponent />} */}
    </section>
  );
};

export default MainContent;
