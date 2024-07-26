import { MessageOnSites } from '@/types/app';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export const initialMessageOnSites = [];

type MessageState = {
  messageOnSites: MessageOnSites[];
};

type MessageActions = {
  setMessageOnSites: (messageOnSites: MessageOnSites[]) => void;
};

export type MessageStore = MessageState & MessageActions;

export const createMessageStore = () =>
  createStore<MessageStore>()(
    persist(
      (set) => ({
        messageOnSites: initialMessageOnSites,
        setMessageOnSites: (messageOnSites) =>
          set((state) => ({ messageOnSites: [...state.messageOnSites, ...messageOnSites] })),
      }),
      {
        name: 'message-store',
      },
    ),
  );
