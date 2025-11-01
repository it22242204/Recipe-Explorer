import axios from 'axios';
import { Recipe } from '../types/index';

const API = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});

export const fetchRecipes = async (category?: string): Promise<Recipe[]> => {
  const endpoint = category ? `/filter.php?c=${category}` : '/search.php?s=';
  const { data } = await API.get(endpoint);
  return data.meals || [];
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const { data } = await API.get(`/lookup.php?i=${id}`);
  return data.meals[0];
};