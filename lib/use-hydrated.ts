"use client";
import { useEffect, useState } from "react";

// Evita diferencias entre el HTML del servidor y el estado guardado en localStorage.
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
