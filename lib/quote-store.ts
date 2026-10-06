"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Unit } from "@/data/types";

export type QuoteItem = {
  id: string; // productSlug::variantSku
  productSlug: string;
  productName: string;
  variantSku: string;
  variantLabel: string;
  qty: number;
  unit: Unit;
  notes: string;
};

type QuoteState = {
  items: QuoteItem[];
  add: (item: Omit<QuoteItem, "id" | "notes"> & { notes?: string }) => void;
  update: (id: string, patch: Partial<Pick<QuoteItem, "qty" | "unit" | "notes">>) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useQuote = create<QuoteState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const id = `${item.productSlug}::${item.variantSku}`;
          const existing = state.items.find((i) => i.id === id && i.unit === item.unit);
          if (existing) {
            return { items: state.items.map((i) => (i === existing ? { ...i, qty: i.qty + item.qty } : i)) };
          }
          return { items: [...state.items, { ...item, id, notes: item.notes ?? "" }] };
        }),
      update: (id, patch) => set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: "elsauz-cotizacion", storage: createJSONStorage(() => localStorage), version: 1 },
  ),
);
