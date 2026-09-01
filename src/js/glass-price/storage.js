import { STORAGE_KEYS } from "./constants.js";

export function readStorageItem(key) {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.warn(`Unable to read ${key} from localStorage`, error);
    return null;
  }
}

export function writeStorageItem(key, value) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Unable to save ${key} in localStorage`, error);
  }
}

export function readEntries() {
  return readStorageItem(STORAGE_KEYS.entries) ?? [];
}

export function saveEntries(entries) {
  writeStorageItem(STORAGE_KEYS.entries, entries);
}

export function readCounter() {
  return readStorageItem(STORAGE_KEYS.counter) ?? 0;
}

export function saveCounter(counter) {
  writeStorageItem(STORAGE_KEYS.counter, counter);
}

export function clearEntries() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(STORAGE_KEYS.entries);
  window.localStorage.removeItem(STORAGE_KEYS.counter);
}
