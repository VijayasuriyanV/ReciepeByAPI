import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./ReciepeDetails.css";
import {Api} from "../G_api";
import {Recipe} from "../types/reciepetypes";
import {useNavigate} from "react-router-dom";

const ReciepeDetails = () => {
  const {id} = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${Api}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch recipe.");
        const data: Recipe = await response.json();
        setRecipe(data);
      } catch {
        setError("Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading recipe...</p>;
  if (error || !recipe) return <p>{error || "Recipe not found."}</p>;

  return (
    <main className="recipe-container" style={{padding: "3.5rem 0"}}>
      <section className="row-1">
        <figure className="recipe-image">
          <img src={recipe.image} alt={recipe.name} />
        </figure>

        <section className="recipe-details">
          <h1>{recipe.name}</h1>
          <p>
            <strong>Cuisine:</strong> {recipe.cuisine}
          </p>
          <p>
            <strong>Difficulty:</strong> {recipe.difficulty}
          </p>
          <p>
            <strong>Prep Time:</strong> {recipe.prepTimeMinutes} min
          </p>
          <p>
            <strong>Cook Time:</strong> {recipe.cookTimeMinutes} min
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings}
          </p>
          <p>
            <strong>Calories:</strong> {recipe.caloriesPerServing}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {recipe.rating} ({recipe.reviewCount} reviews)
          </p>
          <p>
            <strong>Tags:</strong> {recipe.tags.join(", ")}
          </p>
          <p>
            <strong>Meal Type:</strong> {recipe.mealType.join(", ")}
          </p>
        </section>
      </section>

      <section className="row-2 details">
        <article className="Ingredients">
          <h3 className="DetailsHead">Ingredients</h3>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="Instruction">
          <h3 className="DetailsHead">Instructions</h3>
          <ol>
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </article>
      </section>
      <button className="recipe-button" onClick={() => navigate("/")}>
        See More Recipes
      </button>
    </main>
  );
};

export default ReciepeDetails;
