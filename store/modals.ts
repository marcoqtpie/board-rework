import { create } from 'zustand';

interface ModalStore {
  alertContent: string;
  isAlertOpen: boolean;
  openAlert: (newContent: string | undefined) => void;
  closeAlert: () => void;
  isLoginOptionsOpen: boolean;
  openLoginOptions: () => void;
  closeLoginOptions: () => void;
  isAnnouncementOpen: boolean;
  openAnnouncement: () => void;
  closeAnnouncement: () => void;
  isBindBankOpen: boolean;
  openBindBank: () => void;
  closeBindBank: () => void;
  isBindUSDTOpen: boolean;
  openBindUSDT: () => void;
  closeBindUSDT: () => void;
  isWithdrawSuccessOpen: boolean;
  openWithdrawSuccess: () => void;
  closeWithdrawSuccess: () => void;
  isPassCodeOpen: boolean;
  openPassCode: () => void;
  closePassCode: () => void;
  isCommissionOpen: boolean;
  openCommission: () => void;
  closeCommission: () => void;
  openSidebarAnnouncement: number;
  setSidebarAnnouncement: (openSidebarAnnouncement: number) => void;
  openContentAnnouncement: number;
  setContentAnnouncement: (openContentAnnouncement: number) => void;
}

export type ModalStoreActions = {};

const useModalStore = create<ModalStore & ModalStoreActions>((set) => ({
  isAlertOpen: false,
  isLoginOptionsOpen: false,
  alertContent: '',
  isAnnouncementOpen: false,
  isBindBankOpen: false,
  isBindUSDTOpen: false,
  isWithdrawSuccessOpen: false,
  isPassCodeOpen: false,
  isCommissionOpen: false,
  openSidebarAnnouncement: 0,
  openContentAnnouncement: 0,
  openAlert: (alertContent?: string) => {
    set((state) => ({ ...state, isAlertOpen: false }));
    setTimeout(() => {
      set((state) => ({ ...state, isAlertOpen: true, alertContent: alertContent || '出了点问题' }));
    }, 0);
  },
  closeAlert: () => set((state) => ({ ...state, isAlertOpen: false, alertContent: '' })),
  openLoginOptions: () => set((state) => ({ ...state, isLoginOptionsOpen: true })),
  closeLoginOptions: () => set((state) => ({ ...state, isLoginOptionsOpen: false })),
  openAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: true })),
  closeAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: false })),
  openBindBank: () => set((state) => ({ ...state, isBindBankOpen: true })),
  closeBindBank: () => set((state) => ({ ...state, isBindBankOpen: false })),
  openBindUSDT: () => set((state) => ({ ...state, isBindUSDTOpen: true })),
  closeBindUSDT: () => set((state) => ({ ...state, isBindUSDTOpen: false })),
  openWithdrawSuccess: () => set((state) => ({ ...state, isWithdrawSuccessOpen: true })),
  closeWithdrawSuccess: () => set((state) => ({ ...state, isWithdrawSuccessOpen: false })),
  openPassCode: () => set((state) => ({ ...state, isPassCodeOpen: true })),
  closePassCode: () => set((state) => ({ ...state, isPassCodeOpen: false })),
  openCommission: () => set((state) => ({ ...state, isCommissionOpen: true })),
  closeCommission: () => set((state) => ({ ...state, isCommissionOpen: false })),
  setSidebarAnnouncement: (openSidebarAnnouncement) => set(() => ({ openSidebarAnnouncement })),
  setContentAnnouncement: (openContentAnnouncement) => set(() => ({ openContentAnnouncement })),
}));

export default useModalStore;
