import React, { useEffect, useState } from "react";
import "../styles/RecipeStyle.css";
import { Link } from "react-router-dom";
import "../styles/Searchbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../api";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const response = await api.get("/auth/recipe", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
        ,
      });
      if (response.data.success) {
        setRecipes(response.data.allRecipes || []);
      }
       else {
        toast.error("Failed to load recipes.");
      }
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      toast.error("Something went wrong while fetching recipes.");
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const response = await api.delete(`/auth/recipe/${recipeId}`);
        if (response.status === 200) {
          toast.success("Recipe deleted successfully");
          getRecipes();
        } else {
          toast.error("Failed to delete recipe.");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the recipe");
        console.error(error);
      }
    }
  };

  const handleAddToFavorites = async (recipeId) => {
    try {
      const response = await api.post(`/auth/likedRecipes/${recipeId}`);
      if (response.status === 200) {
        toast.success("Recipe added to favorites");
        setTimeout(() => {
          window.location.href = "/favouriteRecipes";
        }, 4000);
      }
    } catch (error) {
      if (error.response?.data?.error === "Recipe already exists in your favorites") {
        toast.warn("Recipe already exists in your favorites");
      } else {
        toast.error("Failed to add recipe to favorites");
      }
    }
  };

  const SearchRecipes = async (e) => {
    const query = e.target.value;
    if (!query) {
      getRecipes();
      return;
    }

    try {
      const response = await api.get(`/auth/searchRecipes/${query}`);
      if (!response.data.message) {
        setRecipes(response.data);
      } else {
        setRecipes([]);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="Recipes">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search recipes"
          onChange={SearchRecipes}
        />
      </div>

      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe._id} className="Recipe">
            <h2>{recipe.title}</h2>
            <img src={recipe.imageUrl} alt={recipe.title} />
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <div className="instructions-container">
              <h3>Instructions:</h3>
              {recipe.instructions.match(/^\d+\./) ? (
                <div className="instructions-text">
                  {recipe.instructions.split("\n").map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
              ) : (
                <ol className="instructions-list">
                  {recipe.instructions.split("\n").map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              )}
            </div>

            <button
              className="delete-button"
              onClick={() => handleDeleteRecipe(recipe._id)}
            >
              Delete
            </button>
            <button
              className="add-to-favorites-button"
              onClick={() => handleAddToFavorites(recipe._id)}
            >
              Add to Favorites
            </button>
            <Link to="/addRecipe">Add more recipes</Link>
          </div>
        ))
      ) : (
        <h2 className="no-recipes">No Recipes Found</h2>
      )}
      <ToastContainer />
    </div>
  );
};

export default Recipes;
