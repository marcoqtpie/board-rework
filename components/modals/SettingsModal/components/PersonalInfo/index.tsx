import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useAuthActions from '@/hooks/useAuthActions';
import useImages from '@/hooks/useImages';
import Image, { StaticImageData } from 'next/image';
import styles from './index.module.scss';

type PersonalInfoProps = {
  onLogout: () => void;
};

const isValidSrc = (src: string | StaticImageData | undefined): src is string | StaticImageData => {
  return typeof src === 'string' || src instanceof Object;
};

const PersonalInfo: React.FC<PersonalInfoProps> = ({ onLogout }) => {
  const { images } = useImages();
  const { logout } = useAuthActions();
  const theme = useAccountStore((state) => state.theme);
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const isLoggedIn = accountInfo.id !== undefined;
  const profilePicSrc = isLoggedIn ? accountInfo.headImg : images.avatarPlaceholder;

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <>
      <div className={styles.personalInfo}>
        <div className={styles.basicInfo}>
          <span className={styles.infoTitle}>基础信息</span>
        </div>
        <div className={styles.basicDetails}>
          <div className={styles.profilePic}>
            {isValidSrc(profilePicSrc) && <Image src={profilePicSrc} alt='Avatar' width={100} height={100} />}
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.userName}>
              <Image src={require(`@/assets/${theme}/footer/settingUser.png`)} alt='user profile' />
              <span>账号:</span>
              <span className={styles.nickName}>{accountInfo.nickName || '用戶名'}</span>
            </div>
            <div className={styles.vipContainer}>
              <span className={styles.labelVip}> 等级: </span>
              <Image src={images.vipLevel} alt='vip level' width={50} height={50} />
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.infoBtn}>
            <div className={styles.logoutBtn} onClick={handleLogout}>
              账号切换
            </div>
          </div>
          <div className={styles.infoBtn}>
            <div className={styles.logoutBtn} onClick={() => console.log('// TODO lineSwitch(')}>
              切换线路
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
