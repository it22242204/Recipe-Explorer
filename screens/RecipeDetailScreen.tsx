import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet, Linking } from 'react-native';
import { fetchRecipeById } from '../services/api';
import { getFavorites, toggleFavorite } from '../services/storage';
import FavoriteButton from '../components/FavoriteButton';

export default function RecipeDetailScreen({ route, navigation }: any) {
  const { id } = route.params;
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      const data = await fetchRecipeById(id);
      setRecipe(data);
      const favs = await getFavorites();
      setIsFavorite(favs.includes(id));
    } catch (e) {
      alert('Failed to load recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    const newState = await toggleFavorite(id);
    setIsFavorite(newState);
  };

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  const ingredients = Object.keys(recipe)
    .filter(key => key.includes('strIngredient') && recipe[key])
    .map(key => ({
      ingredient: recipe[key],
      measure: recipe[key.replace('Ingredient', 'Measure')] || '',
    }));

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.strMeal}</Text>
        <Text style={styles.subtitle}>{recipe.strCategory} • {recipe.strArea}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {ingredients.map((ing, i) => (
            <Text key={i} style={styles.item}>• {ing.ingredient} - {ing.measure}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructions}>{recipe.strInstructions}</Text>
        </View>

        {recipe.strYoutube && (
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(recipe.strYoutube)}
          >
            Watch on YouTube
          </Text>
        )}
      </View>

      <FavoriteButton isFavorite={isFavorite} onPress={handleToggle} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#666', marginBottom: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  item: { marginLeft: 8, marginBottom: 4 },
  instructions: { lineHeight: 22 },
  link: { color: '#FF6B35', fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});