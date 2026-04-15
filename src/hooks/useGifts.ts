import { useMemo } from 'react';

import { useGiftStore } from '../store/giftStore';

export function useGifts() {
  const gifts = useGiftStore((state) => state.gifts);
  const used = useGiftStore((state) => state.used);
  const selectedGift = useGiftStore((state) => state.selectedGift);
  const hydrated = useGiftStore((state) => state.hydrated);

  const saveGifts = useGiftStore((state) => state.saveGifts);
  const drawRandomGift = useGiftStore((state) => state.drawRandomGift);
  const confirmSelectedGift = useGiftStore((state) => state.confirmSelectedGift);

  const available = useGiftStore((state) => state.availableGifts());

  const progressText = useMemo(() => `${used.length} de 10 regalos abiertos`, [used.length]);

  return {
    gifts,
    used,
    selectedGift,
    hydrated,
    available,
    hasCompletedAll: used.length >= 10,
    hasConfiguredGifts: gifts.length === 10,
    progressText,
    saveGifts,
    drawRandomGift,
    confirmSelectedGift,
  };
}
