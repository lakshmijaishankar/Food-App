import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Store a value in AsyncStorage
 * @param key - The key to store the value under
 * @param value - The value to store (will be stringified)
 * @returns Promise<boolean> - Returns true if successful, false otherwise
 */
export const setValue = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch {
    return false;
  }
};

/**
 * Retrieve a value from AsyncStorage
 * @param key - The key to retrieve the value from
 * @returns Promise<T | null> - Returns the parsed value or null if not found/error
 */
export const getValue = async <T = any>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch {
    return null;
  }
};

/**
 * Delete a value from AsyncStorage
 * @param key - The key to delete
 * @returns Promise<boolean> - Returns true if successful, false otherwise
 */
export const deleteValue = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

/**
 * Clear all values from AsyncStorage
 * @returns Promise<boolean> - Returns true if successful, false otherwise
 */
export const clearAll = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch {
    return false;
  }
};

/**
 * Get all keys from AsyncStorage
 * @returns Promise<readonly string[]> - Returns array of keys or empty array on error
 */
export const getAllKeys = async (): Promise<readonly string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch {
    return [];
  }
};
