// types/index.ts
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube?: string;
  [key: string]: any; // for dynamic ingredients
}

export interface Ingredient {
  ingredient: string;
  measure: string;
}