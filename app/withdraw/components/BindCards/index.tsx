'use client';

import { useEffect, useState } from 'react';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { refetch } from '@/api/refetch';
import AddCardModal from '../Modals/AddCardModal';
import AddUSDTModal from '../Modals/AddUSDTModal';
import Image from 'next/image';
import styles from './index.module.scss';
import { API_ENDPOINT } from '@/types/enums';

type ListItem = {
  text: string;
  onClick: () => void;
};

const BindCards = () => {
  const theme = useAccountStore((state) => state.theme);
  const bindCardList = useAccountStore((state) => state.bindCardList);
  const fetchBindCardList = useAccountStore((state) => state.fetchBindCardList);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showUSDTModal, setShowUSDTModal] = useState(false);

  const listItems: ListItem[] = [
    {
      text: '绑定银行卡',
      onClick: () => setShowAddCardModal((prevState) => !prevState),
    },
    {
      text: '添加USDT',
      onClick: () => setShowUSDTModal((prevState) => !prevState),
    },
  ];

  useEffect(() => {
    fetchBindCardList();
  }, []);

  const censorMyAccount = (myAccount: string): string => {
    if (myAccount.length < 4) {
      return myAccount;
    }
    return '*'.repeat(myAccount.length - 4) + myAccount.slice(-4);
  };

  return (
    <div className={styles.bindCardContainer}>
      <AddCardModal showMe={showAddCardModal} onClose={() => setShowAddCardModal(!showAddCardModal)} />
      <AddUSDTModal showMe={showUSDTModal} onClose={() => setShowUSDTModal(!showUSDTModal)} />
      <PullToRefresh onRefresh={() => refetch(API_ENDPOINT.BIND_CARD_LIST)}>
        <ul className={styles.cardWrapper}>
          {bindCardList?.memberCardList?.map((item, index) => {
            return (
              <li key={index} className={styles.cardList}>
                <div className={styles.bankDetails}>
                  <Image
                    src={item?.bankIcon || ''}
                    className={styles.leftIcons}
                    width={100}
                    height={100}
                    alt='Bank Icon'
                  />
                  <span className={styles.text}>{item?.bankName}</span>
                </div>
                <span className={styles.bankAccount}>{censorMyAccount(item?.bankAccount as string)}</span>
              </li>
            );
          })}
          {listItems.map((item, index) => (
            <li key={index} className={styles.cardList} onClick={item.onClick}>
              <div className={styles.bankDetails}>
                <Image
                  src={require(`@/assets/${theme}/fragments/plusVector.png`)}
                  className={styles.leftIcons}
                  width={50}
                  height={50}
                  alt='Add'
                />
                <span className={styles.text}>{item.text}</span>
              </div>
              <Image
                src={require(`@/assets/${theme}/fragments/arrowVector.png`)}
                className={styles.arrowIcon}
                width={26}
                height={50}
                alt='Arrow'
              />
            </li>
          ))}
        </ul>
      </PullToRefresh>
    </div>
  );
};

export default BindCards;
