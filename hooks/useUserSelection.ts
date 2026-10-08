"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "team-directory-selected";
const EMPTY_SELECTION: number[] = [];

let cachedValue: string | null = null;
let cachedSelection: number[] = EMPTY_SELECTION;

function getSnapshot(): number[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === cachedValue) {
    return cachedSelection;
  }

  cachedValue = stored;

  try {
    const parsed: unknown = JSON.parse(stored ?? "[]");

    if (
      Array.isArray(parsed) &&
      parsed.every(
        (id) =>
          typeof id === "number" &&
          Number.isInteger(id)
      )
    ) {
      cachedSelection = [...new Set<number>(parsed)];
    } else {
      cachedSelection = EMPTY_SELECTION;
    }
  } catch {
    cachedSelection = EMPTY_SELECTION;
  }

  return cachedSelection;
}

function getServerSnapshot(): number[] {
  return EMPTY_SELECTION;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);

  window.addEventListener(
    "team-directory-selection-change",
    callback
  );

  return () => {
    window.removeEventListener("storage", callback);

    window.removeEventListener(
      "team-directory-selection-change",
      callback
    );
  };
}

function updateSelection(ids: number[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));

  window.dispatchEvent(
    new Event("team-directory-selection-change")
  );
}

export function useUserSelection() {
  const selectedIds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  function toggleSelection(id: number) {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    updateSelection(updated);
  }

  function clearSelection() {
    updateSelection([]);
  }

  return {
    selectedIds,
    toggleSelection,
    clearSelection,
  };
}