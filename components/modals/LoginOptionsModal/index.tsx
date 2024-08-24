'use client';

import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
// import { loginDevice } from '@/api/game/gamelist';
// import NECaptchaComponent from 'src/commons/Captcha/NECaptchaComponent';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useImages from '@/hooks/useImages';
import useIsMounted from '@/hooks/useIsMounted';
import useLogin from '@/hooks/useLogin';
import useModalStore from '@/store/modals';
import { AnimatePresence } from 'framer-motion';
import ModalLayout from '../ModalLayout';
import styles from './index.module.scss';

// const LoginOptionsModal = ({ setIsShowUserAuth }) => {
const LoginOptionsModal = () => {
  const isMounted = useIsMounted();
  const { login } = useLogin();
  const { images } = useImages();
  const { openAlert, isLoginOptionsOpen, closeLoginOptions, openLoginOrRegister } = useModalStore();
  const { captchaId, actionSwitch } = useAccountStore((state) => state.init);
  const isCaptchaEnabled = actionSwitch === '1' ? true : false;
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);

  // const handleCaptchaSuccess = (data) => {
  //   getGuestLoginInfo(data);
  // };

  // const handleCaptchaFailure = (err) => {
  //   openAlert({body: `NECaptcha verification failed:"  ${err}` })
  // };

  const modalContent = (
    <AnimatePresence>
      {isLoginOptionsOpen && (
        <ModalLayout backdrop={0.6}>
          <div className={styles.loginTypes}>
            <Image
              src={images.loginClose}
              alt='close'
              height={44}
              width={44}
              quality={100}
              className={styles.loginTypes__close}
              onClick={() => closeLoginOptions()}
            />

            {/* {isCaptchaOpen && isCaptchaEnabled && (
          <NECaptchaComponent
            onSuccess={handleCaptchaSuccess}
            onFailure={handleCaptchaFailure}
            captchaId={captchaId}
            isCaptchaOpen={isCaptchaOpen}
            setIsCaptchaOpen={setIsCaptchaOpen}
          />
        )} */}

            <div className={styles.loginTypes__buttonsContainer}>
              <Image
                src={images.loginRegisterBtn}
                alt='password-login-register'
                height={79}
                width={228}
                quality={100}
                onClick={() => openLoginOrRegister()}
              />
              <Image
                src={images.guestLoginBtn}
                alt='guest-login'
                height={79}
                width={228}
                quality={100}
                onClick={() => {
                  if (isCaptchaEnabled) setIsCaptchaOpen(true);
                  else login();
                }}
              />
              <Image
                src={images.guestNoticeBtn}
                alt='guest-login-notice'
                height={79}
                width={228}
                quality={100}
                onClick={() => openAlert({ body: '没有发现其他域名' })}
              />
            </div>
          </div>
        </ModalLayout>
      )}
    </AnimatePresence>
  );

  if (!isMounted()) return;

  const element = document.getElementById('modal-root') as HTMLDivElement;
  return createPortal(modalContent, element);
};

export default LoginOptionsModal;