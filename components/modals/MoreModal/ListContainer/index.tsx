import { listContainerProps } from '@/types/app';
import Image from 'next/image';
import React from 'react';
import styles from './index.module.scss';

const ListContainer: React.FC<listContainerProps> = ({ onClick, icon, text }) => (
  <li onClick={onClick} className={styles.listItem}>
    <Image src={icon} alt='More Icon' />
    <span>{text}</span>
  </li>
);

export default ListContainer;