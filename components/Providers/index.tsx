import { AccountStoreProvider } from '@/components/Providers/AccountStoreProvider';
import { CSStoreProvider } from '@/components/Providers/CSStoreProvider';
import { GameStoreProvider } from '@/components/Providers/GameStoreProvider';
import { MessageProvider } from '@/components/Providers/MessageStoreProvider';
import { PersonalInfoStoreProvider } from '@/components/Providers/PersonalInfoStoreProvider';
import { ReactNode } from 'react';
import { VipGiftInfoStoreProvider } from './VipGiftInfoStoreProvider';

export type GlobalProviderProps = Readonly<{ children: ReactNode }>;

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <AccountStoreProvider>
      <GameStoreProvider>
        <MessageProvider>
          <CSStoreProvider>
            <PersonalInfoStoreProvider>
              <VipGiftInfoStoreProvider>{children}</VipGiftInfoStoreProvider>
            </PersonalInfoStoreProvider>
          </CSStoreProvider>
        </MessageProvider>
      </GameStoreProvider>
    </AccountStoreProvider>
  );
};
