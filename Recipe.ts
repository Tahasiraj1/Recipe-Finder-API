export interface Recipe {
    id: number;
    title: string;
    image: string;
    ingredients: string[];
    instructions: string;
    isFavourite: boolean;
}