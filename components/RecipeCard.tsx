import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Recipe } from '../types';
import FavoriteButton from './FavoriteButton';

interface Props {
  recipe: Recipe;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function RecipeCard({ recipe, onPress, isFavorite, onToggleFavorite }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.strMeal}</Text>
        <Text style={styles.category}>{recipe.strCategory}</Text>
      </View>
      <FavoriteButton isFavorite={isFavorite} onPress={onToggleFavorite} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, overflow: 'hidden', elevation: 3 },
  image: { width: '100%', height: 180 },
  content: { padding: 12 },
  title: { fontSize: 18, fontWeight: 'bold' },
  category: { color: '#666', marginTop: 4 },
});