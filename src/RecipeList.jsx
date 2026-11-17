import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard.jsx";
import FavouritesBadge from "./FavouritesBadge.jsx";
import SavedDrawer from "./SavedDrawer.jsx";
import { sortRecipes } from "./sortRecipes.js";
import { API, toRecipe } from "./recipes.js";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loadStatus, setLoadStatus] = useState('loading');
  const [search, setSearch] = useState("");
  const [quick, setQuick] = useState(false);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setLoadStatus('loading');

    const controller = new AbortController();

    console.log(`${API}/search.php?s=${encodeURIComponent(search)}`);
    fetch(`${API}/search.php?s=${encodeURIComponent(search)}`, {signal: controller.signal})
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setRecipes((data.meals ?? []).map(toRecipe));
        setLoadStatus('ok');
      })
      .catch((error) => {
        console.error(error);
        setLoadStatus('error');
      });
    
    return () => controller.abort();

  }, [search]); // re-fetch when 'search' changes


  const visible = sortRecipes(
    recipes
      .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()))
      .filter((r) => category === "all" || r.category === status),
    sortBy,
  );

  return (
    <div className="app">
      <header>
        <h1>Recipe Browser 2</h1>

        <FavouritesBadge />

        <label htmlFor="search">Search</label>
        <input id="search" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..." />

        <label>
          <input type="checkbox" checked={quick}
            onChange={(e) => setQuick(e.target.checked)} /> Quick only (&le; 20 min)
        </label>

        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="Chicken">Chicken</option>
          <option value="Dessert">Dessert</option>
          <option value="Pasta">Pasta</option>
          <option value="Seafood">Seafood</option>
          <option value="Vegetarian">Vegetarian</option>
        </select>

        <label htmlFor="sortBy">Sort By</label>
        <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </header>

      <SavedDrawer />

      <main>
        {loadStatus === "loading" && <p>Loading recipes...</p>}
        {loadStatus === "error" && <p>Could not reach API.  Try again.</p>}
        {loadStatus === "ok" && (
        
        visible.length === 0
          ? <p>No matches.</p>
          : <div className="recipe-list">
            {visible.map((r, i) => <RecipeCard key={r.id} recipe={r} priority={i === 0} />)}
          </div>
        )}
      </main>
    </div>
  );
}
