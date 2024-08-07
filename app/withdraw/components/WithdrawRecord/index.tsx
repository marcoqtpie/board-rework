'use client';

import { useEffect, useRef } from 'react';
import NoData from '@/components/NoData';
import styles from './index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import PullToRefresh from 'react-simple-pull-to-refresh';
import useModalStore from '@/store/modals';
import { refetch } from '@/api/refetch';
import { API_ENDPOINT } from '@/types/enums';

const WithdrawRecord = () => {
  const fetchWithdrawRecordList = useAccountStore((state) => state.fetchWithdrawRecordList);
  const withdrawRecordList = useAccountStore((state) => state.withdrawRecordList);
  const { openAlert } = useModalStore();
  const textRef = useRef(null);

  useEffect(() => {
    fetchWithdrawRecordList({
      type: 'withdraw',
      pageNum: 1,
      pageSize: 10,
    });
  }, []);

  const copyToClipboard = (text: string, msg: string) => {
    navigator.clipboard.writeText(text).then(() => {
      openAlert({ body: msg });
    });
  };

  const handleCopyText = (text: string) => () => {
    copyToClipboard(text, text);
  };

  return (
    <div className={styles.withdrawalRecordWrapper}>
      <PullToRefresh onRefresh={() => refetch(API_ENDPOINT.WITHDRAW_RECHARGE_DETAIL)}>
        {withdrawRecordList?.length > 0 ? (
          <ul style={styles.recordWrapper}>
            {withdrawRecordList.map((item, index) => {
              return (
                <li key={index} className={styles.recordList}>
                  <span className={styles.time}>{item?.requestTime}</span>
                  <div className={styles.orderWrapper}>
                    <span className={styles.orderNumber} ref={textRef}>
                      {item?.orderNo}
                    </span>
                    <span className={styles.copyBtn} onClick={handleCopyText(item?.orderNo as string)}>
                      复制
                    </span>
                  </div>
                  <span className={styles.remark} style={{ color: item?.color }}>
                    {item?.remark}
                  </span>
                  <span className={styles.money}>{item?.money}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <NoData />
        )}
      </PullToRefresh>
    </div>
  );
};

export default WithdrawRecord;