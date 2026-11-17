import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { API, toRecipe } from "./recipes.js";

export default function RecipeDetail() {
    const { id } = useParams();    // the ":id" segment - always a STRING
    const [recipe, setRecipe] = useState(null);
    const [loadStatus, setLoadStatus] = useState('loading');

    useEffect(() => {
        setLoadStatus('loading');

        const controller = new AbortController();

        fetch(`${API}/lookup.php?i=${id}`, { signal: controller.signal})
          .then((response) => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
          })
          .then((data) => {
            setRecipe(data.meals ? toRecipe(data.meals[0]) : null);
            setLoadStatus('ok');
          })
          .catch((error) => {
            if (error.name === 'AbortError') return;
            console.error(error);
            setLoadStatus('error');
          });
        
        return () => controller.abort();
    }, [id]); // re-fetch when 'id' changes

    if (loadStatus === 'loading') return <p>Loading...</p>
    if (loadStatus === 'error') {
        return <p>Could not load this recipe: <Link to="/">Back</Link></p>;
    }
    
    if (!recipe) {
        return <p>No such recipe. <Link to="/">Back</Link></p>
    }

    return (
      <main className="recipe-detail">
        <Link to="/">← Back to recipes</Link>
        <h1>{recipe.title}</h1>
        <img src={`${recipe.image}/medium`} alt={recipe.title} loading="lazy" />
        <p>{recipe.category} · {recipe.area}</p>
        <p>{recipe.description}</p>
      </main>
    );
}