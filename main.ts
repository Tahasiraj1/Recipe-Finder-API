import { RecipeService } from "./RecipeService.js";

const recipeService = new RecipeService();

async function main() {
    const searchIngredients = "tomato";
    const recipes = await recipeService.searchRecipe(searchIngredients);
    console.log(`Recipes with ${searchIngredients}:`, recipes);
    

    if (recipes.length > 0) {
        const recipeId = recipes[0].id;
        const recipe = await recipeService.getRecipeById(recipeId);
        if (recipe) {
            console.log(`Details of recipe with id ${recipeId}`, recipe);
        }

        // Toggle favorite status of a recipe
        recipeService.toggleFavourite(recipeId)

        // View favorite recipes
        const favouriteRecipes = recipeService.getFavouriteRecipes();
        console.log("Favourit Recipes:", favouriteRecipes);
    }
}

main();