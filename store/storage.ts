import * as SecureStore from "expo-secure-store";

/**
 * Guarda un objeto (se convierte a JSON).
 * @param key clave
 * @param value objeto serializable a JSON
 */
export const setItem = async (key: string, value: unknown): Promise<void> => {
  try {
    const str = JSON.stringify(value);
    await SecureStore.setItemAsync(key, str);
  } catch (error) {
    console.error(`SecureStore.setItem error for key="${key}":`, error);
    throw error;
  }
};

/**
 * Obtiene y parsea el JSON guardado. Devuelve null si no existe.
 * @param key clave
 * @returns el objeto guardado o null
 */
export const getItem = async <T = any>(key: string): Promise<T | null> => {
  try {
    const str = await SecureStore.getItemAsync(key);
    return str ? (JSON.parse(str) as T) : null;
  } catch (error) {
    console.error(`SecureStore.getItem error for key="${key}":`, error);
    throw error;
  }
};

/**
 * Elimina la clave
 * @param key clave
 */
export const removeItem = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`SecureStore.removeItem error for key="${key}":`, error);
    throw error;
  }
};
