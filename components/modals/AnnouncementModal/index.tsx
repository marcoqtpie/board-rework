'use client';

import HeaderModalTitle from '@/components/HeaderModalTitle';
import useImages from '@/hooks/useImages';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';
import ModalLayout from '../ModalLayout';
import Outsidebar from './component/Outsidebar';
import Sidebar from './component/Sidebar';
import styles from './index.module.scss';

const AnnouncementModal: React.FC = () => {
  const isMounted = useIsMounted();
  const { images } = useImages();
  const { isAnnouncementOpen, closeAnnouncement } = useModalStore();

  const modalContent = (
    <AnimatePresence>
      {isAnnouncementOpen && (
        <ModalLayout closeOnOutsideClick onClose={closeAnnouncement} backdrop={0.8}>
          <div className={styles.mainAnnouncement}>
            <div className={styles.announcementContainer}>
              <HeaderModalTitle logoSrc={images.logoIcon} onClick={closeAnnouncement} />
              <Sidebar />
            </div>
            <Outsidebar />
          </div>
        </ModalLayout>
      )}
    </AnimatePresence>
  );

  if (isMounted()) {
    const element = document.getElementById('modal-root') as HTMLDivElement;
    if (element) return createPortal(modalContent, element);
  }

  return null;
};

export default AnnouncementModal;