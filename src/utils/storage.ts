/**
 * Safe LocalStorage Utility
 * Protects against SecurityError (private browsing/iframes), QuotaExceededError,
 * and JSON parsing exceptions that cause blank white screens.
 */

export function safeGetStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }
    const item = window.localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.warn(`[safeStorage] Failed to read key "${key}":`, err);
    return fallback;
  }
}

export function safeGetString(key: string, fallback: string = ''): string {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }
    const val = window.localStorage.getItem(key);
    return val !== null ? val : fallback;
  } catch (err) {
    console.warn(`[safeStorage] Failed to read string key "${key}":`, err);
    return fallback;
  }
}

export function safeSetStorage<T>(key: string, value: T): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`[safeStorage] Failed to save key "${key}":`, err);
    return false;
  }
}

export function safeSetString(key: string, value: string): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    window.localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`[safeStorage] Failed to save string key "${key}":`, err);
    return false;
  }
}

export function safeRemoveStorage(key: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[safeStorage] Failed to remove key "${key}":`, err);
  }
}
