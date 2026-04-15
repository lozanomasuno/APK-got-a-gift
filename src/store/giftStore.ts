import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { GiftState } from '../features/gifts/types';
import { pickRandomItem } from '../utils/random';

type GiftStore = GiftState & {
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  saveGifts: (gifts: string[]) => void;
  drawRandomGift: () => string | null;
  confirmSelectedGift: () => void;
  clearSelectedGift: () => void;
  availableGifts: () => string[];
};

export const useGiftStore = create<GiftStore>()(
  persist(
    (set, get) => ({
      gifts: [],
      used: [],
      selectedGift: null,
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      saveGifts: (gifts) => {
        const cleaned = gifts.map((gift) => gift.trim()).filter(Boolean);

        if (cleaned.length !== 10) {
          return;
        }

        set({
          gifts: cleaned,
          used: [],
          selectedGift: null,
        });
      },
      drawRandomGift: () => {
        const { selectedGift } = get();

        if (selectedGift) {
          return selectedGift;
        }

        const available = get().availableGifts();
        const nextGift = pickRandomItem(available);

        if (!nextGift) {
          return null;
        }

        set({ selectedGift: nextGift });
        return nextGift;
      },
      confirmSelectedGift: () => {
        const { selectedGift, used } = get();

        if (!selectedGift) {
          return;
        }

        if (used.includes(selectedGift)) {
          set({ selectedGift: null });
          return;
        }

        set({
          used: [...used, selectedGift],
          selectedGift: null,
        });
      },
      clearSelectedGift: () => set({ selectedGift: null }),
      availableGifts: () => {
        const { gifts, used } = get();
        return gifts.filter((gift) => !used.includes(gift));
      },
    }),
    {
      name: 'ten-gifts-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        gifts: state.gifts,
        used: state.used,
        selectedGift: state.selectedGift,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
