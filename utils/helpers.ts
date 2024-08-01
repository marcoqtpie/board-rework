import {
  browserName,
  browserVersion,
  isBrowser,
  isMobile,
  mobileModel,
  mobileVendor,
  osName,
  osVersion,
} from 'react-device-detect';

export const getDeviceInfo = () => {
  if (isMobile) {
    return `${osName} ${osVersion} ${mobileVendor} ${mobileModel}`;
  } else if (isBrowser) {
    return `${osName} ${osVersion} ${browserName} ${browserVersion}`;
  }
  return null;
};

export const copyToClipboard = (text: string) => window.navigator.clipboard.writeText(text);

export const getFromLocalStorage = (key: string, defaultValue: string = '') => {
  if (typeof localStorage === 'undefined') return defaultValue;
  else return localStorage.getItem(key) || defaultValue;
};

export const setToLocalStorage = (key: string, value: string) => {
  if (typeof localStorage === 'undefined') return;
  else return localStorage.setItem(key, value);
};

export const generateMachineCode = () => {
  let machineId = getFromLocalStorage('machineId');
  if (!machineId) {
    var d = new Date().getTime();
    machineId = 'xxxxxxyxxyxxxyy'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 15) % 15 | 0;
      d = Math.floor(d / 15);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(15);
    });
    setToLocalStorage('machineId', machineId);
  }
  return machineId;
};
