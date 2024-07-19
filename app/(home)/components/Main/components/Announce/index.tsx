import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const Announce = () => {
  const theme = useAccountStore((state) => state.theme);
  const announceText = useGameStore((state) => state.announceText);
  const [_, setOmOpen] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(0);
  const audioIcon = require(`@/assets/${theme}/main/audioIcon.png`);

  useEffect(() => {
    setAnimationDuration(announceText?.length / 3);
  }, [announceText]);

  return (
    <div className={styles.announceContainer}>
      <div className={styles.announceBar}>
        <Image src={audioIcon} alt='AudioIcon' />
        <div className={styles.announceTextWrapper} onClick={() => setOmOpen(true)}>
          <div
            className={classNames({
              [styles.moveTextItem]: true,
            })}
            style={{ animationDuration: `${animationDuration}s` }}
          >
            {announceText ? announceText : '充值，成功率 100%，到账速度快，还享有额外的入款优惠！祝您旗开得胜！'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announce;
