import { useState } from "react";
import { Link } from "react-router-dom"; // ← new

import StarRating from "./StarRating";
import { useFavouriteStore, useIsFavourite } from "./stores/favourites.js";

export default function RecipeCard({ recipe, priority }) {
    const [cooked, setCooked] = useState(0);
    const [rating, setRating] = useState(0);
    const isFavourite = useIsFavourite(recipe.id);
    const toggle = useFavouriteStore((state) => state.toggle);
    return (
        <article className="recipe-card">
            <img src={`${recipe.image}/medium`} alt={recipe.title} height="160" loading={priority ? "eager" : "lazy"}
fetchPriority={priority ? "high" : "auto"} />
            <div className="body">
                <h2>{recipe.title}</h2>
                <p className="meta">{recipe.category} · {recipe.area}</p>
                <p className="description">{recipe.description}</p>
                <StarRating value={rating} onChange={setRating} />
                <button onClick={() => toggle(recipe)}>{isFavourite ? "★ Favourited" : "☆ Favourite"}</button>
                <button onClick={() => setCooked((prev) => prev + 1)}>cooked {cooked}×</button>
                <Link to={`/recipes/${recipe.id}`}>View recipe <span className="sr-only"> for {recipe.title}</span> →</Link>
                {/* ← new */}
            </div>
        </article>
    );
}