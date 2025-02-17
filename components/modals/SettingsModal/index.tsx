'use client';

import HeaderModalTitle from '@/components/HeaderModalTitle';
import useIsMounted from '@/hooks/useIsMounted';
import { ListItemProps } from '@/types/app';
import { sfx } from '@/utils/audioFile';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { FC, useState } from 'react';
import ModalLayout from '../ModalLayout';
import ChangePassword from './components/ChangePassword';
import ColorSystem from './components/ColorSystem';
import Music from './components/Music';
import PersonalInfo from './components/PersonalInfo';
import Version from './components/Version';
import styles from './index.module.scss';

type SettingsModalProps = {
  show: boolean;
  setShow: (val: boolean) => void;
};

const SettingsModal: FC<SettingsModalProps> = ({ show, setShow }) => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const isMounted = useIsMounted();

  const listItems: ListItemProps[] = [
    { id: 0, title: '个人信息' },
    { id: 1, title: '音乐切换' },
    { id: 2, title: '修改密码' },
    { id: 3, title: '网站详情' },
    { id: 4, title: '改变主题' },
  ];

  const renderComponent = () => {
    switch (selectedId) {
      case 1:
        return <Music />;
      case 2:
        return <ChangePassword />;
      case 3:
        return <Version />;
      case 4:
        return <ColorSystem />;
      default:
        return <PersonalInfo onLogout={() => setShow(false)} />;
    }
  };

  return (
    <AnimatePresence>
      {show && isMounted() && (
        <ModalLayout backdrop={0.8}>
          <div className={styles.settingsContainer}>
            <HeaderModalTitle title='设置' onClick={() => setShow(false)} />
            <div className={styles.contentModal}>
              <div className={styles.sidebarContainer}>
                <ul>
                  {listItems.map((item) => (
                    <li
                      key={item.id}
                      data-click={sfx.popAudio}
                      className={classNames({ [styles.sidebarItem]: selectedId === item.id })}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.settingContent}>{renderComponent()}</div>
            </div>
          </div>
        </ModalLayout>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
