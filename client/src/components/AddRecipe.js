import React, { useState } from "react";
import "../styles/Addrecipe.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import { api } from "../api";
const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const handleAddIngredient = () => {
    const lastIngredient = recipe.ingredients[recipe.ingredients.length - 1];
    if (lastIngredient !== "") {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ""],
      });
    }
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;
    setRecipe({
      ...recipe,
      ingredients: updatedIngredients,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to add the recipe to the server

    const nonEmptyIngredients = recipe.ingredients.filter(
      (ingredient) => ingredient.trim() !== ""
    );

    if (nonEmptyIngredients.length === 0) {
      toast.warn("Please provide at least one non-empty ingredient.");
      return;
    }

    try {
      const response = await api.post('/auth/recipe', recipe); // pass `recipe` data here
    
      const data = response.data;
    
      if (data.success) {
        toast.success("Recipe added successfully");
    
        setTimeout(() => {
          window.location.href = "/recipes";
        }, 4000);
      } else {
        toast.error(data.message || "Failed to add recipe.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An error occurred while adding the recipe."
      );
    }
    
  };

  return (
    <div className="add-recipe">
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Ingredients:</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              type="text"
              key={index}
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Add Recipe</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddRecipe;
