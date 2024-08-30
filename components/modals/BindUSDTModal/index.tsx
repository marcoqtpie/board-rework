'use client';

import { setBindCard } from '@/api/pay';
import Form, { FormField } from '@/components/Fragments/Form';
import HeaderModalTitle from '@/components/HeaderModalTitle';
import ModalLayout from '@/components/modals/ModalLayout';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import { AnimatePresence } from 'framer-motion';
import { ChangeEvent, useMemo, useState } from 'react';
import styles from './index.module.scss';

const BindUSDTModal = () => {
  const fetchBindCardList = useAccountStore((state) => state.fetchBindCardList);
  const [usdtAddress, setUsdtAddress] = useState('');
  const [realName, setRealName] = useState('');
  const { openAlert, closeBindUSDT, isBindUSDTOpen } = useModalStore();
  const isMounted = useIsMounted();

  const formFields: FormField[] = useMemo(
    () => [
      {
        type: 'input',
        label: '真实姓名:',
        placeholder: '请输入您的姓名',
        onChange: (e: ChangeEvent<HTMLInputElement>) => setRealName(e.target.value),
      },
      {
        type: 'input',
        label: '链名称:',
        value: 'USDT-TRC20',
        readOnly: true,
      },
      {
        type: 'input',
        label: '钱包地址:',
        placeholder: '请输入USDT钱包地址',
        onChange: (e: ChangeEvent<HTMLInputElement>) => setUsdtAddress(e.target.value),
      },
    ],
    [],
  );

  const handleSubmit = async () => {
    if (!realName) {
      openAlert('请输入您的姓名');
    } else if (!usdtAddress) {
      openAlert('请输入您的 USDT 地址');
    } else if (usdtAddress.length < 16) {
      openAlert('请输入正确的 USDT 地址');
    } else {
      const { code, msg } = await setBindCard(realName, usdtAddress, 'USDT-TRC20', 139);
      if (code === 200) {
        fetchBindCardList();
        openAlert(msg);
        setTimeout(() => {
          closeBindUSDT();
        }, 500);
      } else if (code === 500) {
        openAlert(msg);
      }
    }
  };

  return (
    <AnimatePresence>
      {isBindUSDTOpen && isMounted() && (
        <ModalLayout onClose={closeBindUSDT} backdrop={0.8}>
          <div className={styles.wrapper}>
            <HeaderModalTitle title='绑定USDT' onClick={closeBindUSDT} />
            <div className={styles.addCardContainer}>
              <div className={styles.bodyContainer}>
                <Form fields={formFields} onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
    </AnimatePresence>
  );
};

export default BindUSDTModal;
