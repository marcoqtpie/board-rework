import { getIp } from '@/api';
import { loginDevice, loginPhoneNumber } from '@/api/platform';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { defaultAccountInfo } from '@/constants/defaultData';
import useModalStore from '@/store/modals';
import { AccountInfo, ErrorData, RootResponse } from '@/types/app';
import { getDeviceId, getDeviceInfo, getFromLocalStorage } from '@/utils/helpers';

type LoginMethod = 'device' | 'phone' | 'user-pass' | 'captcha';
type LoginPayload = { validate: string; id: string; password: string };

const useAuthActions = () => {
  const deviceId = getDeviceId();
  const phoneModel = getDeviceInfo();
  const token = getFromLocalStorage('token');
  const inviterCode = getFromLocalStorage('channelCode');
  const { setAccountInfo, setAccountNow, accountInfo } = useAccountStore((state) => state);
  const isLoggedIn = !!accountInfo.id && !!token;
  const { openAlert, openLoginOptions, closeLoginOptions, setSidebarAnnouncement, openAnnouncement } = useModalStore();

  const authCheck = (callback: () => void) => {
    if (isLoggedIn) callback();
    else openLoginOptions();
  };

  const login = async (loginMethod: LoginMethod = 'device', data?: LoginPayload) => {
    const ip = await getIp();
    const validate = data?.validate || null;
    const defaultError = { msg: '网络错误' }; // Network Error
    let res: Partial<RootResponse<ErrorData>> | RootResponse<AccountInfo> = defaultError;

    if (loginMethod === 'phone') {
      res = await loginPhoneNumber({ mobile: data?.id!, passwd: data?.password!, deviceId, ip, validate });
    } else {
      res = await loginDevice({ inviterCode, deviceId, ip, phoneModel, validate });
    }

    if (res && res.code === 200) {
      if (res.data && !('message' in res.data)) {
        setAccountInfo(res.data);
        openAnnouncement();
        setSidebarAnnouncement(2);
        setAccountNow({ balance: res.data.accountNow });
        res.data.token && localStorage.setItem('token', res.data.token);
        closeLoginOptions();
        return true;
      } else {
        openAlert(res?.data?.message);
      }
    } else {
      openAlert(res?.msg);
    }
  };

  const logout = () => {
    // TODO add reset for other store data if necessary
    setAccountInfo(defaultAccountInfo);
    localStorage.removeItem('token');
    openLoginOptions();
  };

  return { isLoggedIn, authCheck, login, logout };
};

export default useAuthActions;
