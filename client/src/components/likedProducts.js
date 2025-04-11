import React, { useState, useEffect } from "react";
import "../styles/likedProducts.css";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../api";

const LikedProducts = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  const fetchLikedProducts = async () => {
    try {
      const response = await api.get("/auth/likedRecipes");

      if (response.data.success) {
        setLikedProducts(response.data.allLikedRecipes || []);
      } else {
        toast.error("Failed to fetch liked products");
      }
    } catch (error) {
      toast.error("Error fetching liked products");
      console.error(error);
    }
  };

  const handleRemoveItem = async (recipeId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you wanna remove this recipe from favourites??"
      );

      if (!confirmDelete) return;

      const response = await api.delete(`/auth/removeLiked/${recipeId}`);

      if (response.data.success) {
        toast.success("Item removed successfully");
        fetchLikedProducts();
      } else {
        toast.error(response.data.error || "Failed to remove item");
      }
    } catch (error) {
      toast.error("Error removing item from liked products");
      console.error(error);
    }
  };

  return (
    <div className="likedRecipes">
      <h2>Favourites</h2>
      <ul>
        {likedProducts.map((product) => (
          <li key={product._id} className="list">
            <div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <img src={product.imageUrl} alt={product.title} />
              <h4>Ingredients:</h4>
              <ul className="ingredients-list">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>

              <div className="instructions-container">
                <h4>Instructions:</h4>
                <div className="instructions-list">
                  {product.instructions.split("\n").map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
              </div>

              <button
                className="remove-item-button"
                onClick={() => handleRemoveItem(product._id)}
              >
                Remove Item
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default LikedProducts;
