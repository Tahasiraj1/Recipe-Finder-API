import axios from "axios";
const API_KEY = "defd0840b07044e6a5d9b9c5cac36082";
const BASE_URL = "https://api.spoonacular.com/recipes";
export class RecipeService {
    recipes = [];
    async searchRecipe(ingredients) {
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
                return response.data.result.map((item) => ({
                    id: item.id,
                    title: item.title,
                    image: item.image,
                    ingredients: [],
                    instruction: "",
                    isFavourite: false,
                }));
            }
            else {
                console.error('Unexpected response format:', response.data);
                return [];
            }
        }
        catch (error) {
            console.error("Error fetching recipes:", error);
            return [];
        }
    }
    async getRecipeById(id) {
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
                ingredients: data.extendedIngredients.map((ing) => ing.original),
                instructions: data.instructions,
                isFavourite: false,
            };
        }
        catch (error) {
            console.error("Error fetching recipe details:", error);
            return undefined;
        }
    }
    toggleFavourite(id) {
        const recipe = this.recipes.find(recipe => recipe.id === id);
        if (recipe) {
            recipe.isFavourite = !recipe.isFavourite;
        }
    }
    getFavouriteRecipes() {
        return this.recipes.filter(recipe => recipe.isFavourite);
    }
}
