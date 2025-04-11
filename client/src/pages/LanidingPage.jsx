import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Heart, PlusCircle, Search } from 'lucide-react';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to DishDynamo</h1>
          <p>Discover, Create, and Share Your Favorite Recipes</p>
          <div className="hero-buttons">
            <Link to="/signup" className="cta-button">Get Started</Link>
            <Link to="/recipes" className="secondary-button">Browse Recipes</Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Delicious Food"
          />
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose DishDynamo?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Search className="feature-icon" />
            <h3>Discover Recipes</h3>
            <p>Explore thousands of recipes from around the world</p>
          </div>
          <div className="feature-card">
            <PlusCircle className="feature-icon" />
            <h3>Create & Share</h3>
            <p>Add your own recipes and share them with the community</p>
          </div>
          <div className="feature-card">
            <Heart className="feature-icon" />
            <h3>Save Favorites</h3>
            <p>Keep track of your favorite recipes in one place</p>
          </div>
          <div className="feature-card">
            <ChefHat className="feature-icon" />
            <h3>Cook Like a Pro</h3>
            <p>Step-by-step instructions for perfect results</p>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="showcase-content">
          <h2>Featured Recipes</h2>
          <div className="showcase-grid">
            <div className="showcase-card">
              <img 
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Italian Pasta"
              />
              <h3>Italian Pasta</h3>
            </div>
            <div className="showcase-card">
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Perfect Pizza"
              />
              <h3>Perfect Pizza</h3>
            </div>
            <div className="showcase-card">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Healthy Salad"
              />
              <h3>Healthy Salad</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;