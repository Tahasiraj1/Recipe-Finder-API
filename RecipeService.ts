import axios from "axios";
import { Recipe } from "./Recipe.js";

const API_KEY = "Your API Key";
const BASE_URL = "https://api.spoonacular.com/recipes";

export class RecipeService {
    private recipes: Recipe[] = [];

    async searchRecipe(ingredients: string): Promise<Recipe[]> {
        try {
            const response = await axios.get(`${BASE_URL}/complexSearch`, {
                params: {
                    apiKey: API_KEY,
                    includeIngredients: ingredients,
                    number: 10,
                },
            });

            console.log(response.data);
            

            if (Array.isArray(response.data.results)) {
                return response.data.result.map((item: any) => ({
                id: item.id,
                title: item.title,
                image: item.image,
                ingredients: [],
                instruction: "",
                isFavourite: false,   
            }));
            } else {
                console.error('Unexpected response format:', response.data);
                return [];
            }     
        } catch (error) {
            console.error("Error fetching recipes:", error);
            return [];
        }
    }

    async getRecipeById(id: number): Promise<Recipe | undefined> {
        try {
            const response = await axios.get(`${BASE_URL}/${id}/information`, {
                params: {
                    apiKey: API_KEY,
                },
            });
            
            const data = response.data;
            return {
                id: data.id,
                title: data.title,
                image: data.image,
                ingredients: data.extendedIngredients.map((ing: any) => ing.original),
                instructions: data.instructions,
                isFavourite: false,
            };
        }catch (error) {
            console.error("Error fetching recipe details:", error);
            return undefined;
        }
    }

    toggleFavourite(id: number): void {
        const recipe = this.recipes.find(recipe => recipe.id === id);
        if(recipe) {
            recipe.isFavourite = !recipe.isFavourite;
        }
    }

    getFavouriteRecipes(): Recipe[] {
        return this.recipes.filter(recipe => recipe.isFavourite);
    }
}

