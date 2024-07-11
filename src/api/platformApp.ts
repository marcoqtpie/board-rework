import { APP_ROUTE } from '@/types/enums';
import type { RootResponse } from '@/types/response';
import type { AxiosResponse } from 'axios';
import { request } from './request';

export const getAccountNow = async () => {
  const response: AxiosResponse<RootResponse<any>> = await request.post(APP_ROUTE.PLATFORM + 'getAccountNow');
  const { data } = response.data;
  return data;
};

export const getInit = async () => {
  const loginNow: any = localStorage.getItem('loginNow');

  const params = {
    token: loginNow ? loginNow.token : 'randomString',
    id: loginNow ? loginNow.token : '23',
  };

  const response: AxiosResponse<RootResponse<any>> = await request.post(APP_ROUTE.PLATFORM + 'init', params);
  const { data } = response.data;
  return data;
};
