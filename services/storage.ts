// services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites';

export const getFavorites = async (): Promise<string[]> => {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
};

export const saveFavorites = async (favorites: string[]): Promise<void> => {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const toggleFavorite = async (id: string): Promise<boolean> => {
  const favorites = await getFavorites();
  const exists = favorites.includes(id);
  const updated = exists
    ? favorites.filter(f => f !== id)
    : [...favorites, id];
  await saveFavorites(updated);
  return !exists;
};