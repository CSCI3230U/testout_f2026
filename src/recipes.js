export const API = import.meta.env.VITE_API_URL;

export function toRecipe(m) {
  return {
    id: m.idMeal,
    title: m.strMeal,
    image: m.strMealThumb,
    category: m.strCategory,
    area: m.strArea,
    description: m.strInstructions ?? '',
  };
}

// export const recipes = [
//   {
//     id: 1, image: "/images/Spaghetti_alla_carbonara.jpg", title: "Spaghetti Carbonara", category: "Pasta",
//     cookTime: 25, description: "Eggs, cheese, pork, pepper." },
//   {
//     id: 2, image: "/images/Greek_salad.jpg",
//     title: "Greek Salad", category: "Salad",
//     cookTime: 10, description: "Tomato, cucumber, olives, feta." },
//   {
//     id: 3, image: "/images/Fish_tacos.jpg",
//     title: "Fish Tacos",category: "Mexican", cookTime: 20, description: "White fish, lime crema, cabbage." },
// ];