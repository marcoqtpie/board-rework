'use client';

import { FC, useEffect, useState } from 'react';
import BindCards from '@/app/withdraw/components/BindCards';
import SelfWithdrawal from '@/app/withdraw/components/SelfWithdrawal';
import WithdrawRecord from '@/app/withdraw/components/WithdrawRecord';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Sidebar from '@/components/Sidebar';
import { BankList, BindCardList, CodeFlowList, ErrorData, WithdrawRechargeDetail } from '@/types/app';
import OtherHeader from '@/components/OtherHeader';
import CodingDetails from '@/app/withdraw/components/CodeDetails';
import styles from './index.module.scss';

export type WithdrawPageComponent = FC<
  Readonly<{
    bindCardList?: BindCardList | ErrorData;
    bankList?: BankList[] | ErrorData;
    codeFlowList?: CodeFlowList[] | ErrorData;
    withdrawRecordList?: WithdrawRechargeDetail[] | ErrorData;
  }>
>;

export const WithdrawPage: WithdrawPageComponent = ({ bindCardList, bankList, codeFlowList, withdrawRecordList }) => {
  const { setBindCardList, setBankList, setCodeFlowList, setWithdrawRecordList } = useAccountStore((state) => state);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const sidebarItems = ['自主提现', '打码详情', '钱包管理', '提现记录'];

  useEffect(() => {
    if (bindCardList && !('message' in bindCardList)) {
      setBindCardList(bindCardList);
    }

    if (bankList && !('message' in bankList)) {
      setBankList(bankList);
    }

    if (codeFlowList && !('message' in codeFlowList)) {
      setCodeFlowList(codeFlowList);
    }

    if (withdrawRecordList && !('message' in withdrawRecordList)) {
      setWithdrawRecordList(withdrawRecordList);
    }
  }, [bindCardList, bankList, codeFlowList, withdrawRecordList]);

  return (
    <div className={styles.withdrawPageContainer}>
      <OtherHeader headerTitle='提现' showPurse />
      <div className={styles.withdrawPageBody}>
        <Sidebar
          sidebarItems={sidebarItems}
          activeSidebarItem={activeSidebarItem}
          setActiveSidebarItem={setActiveSidebarItem}
        />
        <div className={styles.child}>
          {activeSidebarItem === 0 && <SelfWithdrawal />}
          {activeSidebarItem === 1 && <CodingDetails />}
          {activeSidebarItem === 2 && <BindCards />}
          {activeSidebarItem === 3 && <WithdrawRecord />}
        </div>
      </div>
    </div>
  );
};
