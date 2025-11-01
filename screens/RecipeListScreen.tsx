import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { fetchRecipes } from '../services/api';
import { getFavorites, toggleFavorite } from '../services/storage';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types';

export default function RecipeListScreen({ navigation }: any) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchRecipes();
      setRecipes(data);
      const favs = await getFavorites();
      setFavorites(favs);
    } catch (e) {
      setError('Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    const isNowFavorite = await toggleFavorite(id);
    setFavorites(prev => 
      isNowFavorite ? [...prev, id] : prev.filter(f => f !== id)
    );
  };

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error) return <Text style={styles.center}>{error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            isFavorite={favorites.includes(item.idMeal)}
            onPress={() => navigation.navigate('Detail', { id: item.idMeal })}
            onToggleFavorite={() => handleToggleFavorite(item.idMeal)}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});