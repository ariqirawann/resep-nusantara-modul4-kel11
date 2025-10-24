// src/main.jsx
import { StrictMode, useState, createContext, useContext, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MakananPage from './pages/MakananPage';
import MinumanPage from './pages/MinumanPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import DetailPage from './components/dataAction/DetailPage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css'
import PWABadge from './PWABadge';

// Create context for profile pictures
export const ProfileContext = createContext();

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [profilePictures, setProfilePictures] = useState(() => {
    const saved = localStorage.getItem('teamProfilePictures');
    return saved ? JSON.parse(saved) : [null, null, null, null];
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSelectedRecipe(null);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentPage('detail');
  };

  const handleToggleFavorite = (recipeId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const handleProfilePictureChange = (index, dataUrl) => {
    setProfilePictures(prev => {
      const updated = [...prev];
      updated[index] = dataUrl;
      localStorage.setItem('teamProfilePictures', JSON.stringify(updated));
      return updated;
    });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'makanan':
        return <MakananPage onRecipeClick={handleRecipeClick} favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
      case 'minuman':
        return <MinumanPage onRecipeClick={handleRecipeClick} favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
      case 'favorites':
        return <FavoritesPage onRecipeClick={handleRecipeClick} favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
      case 'detail':
        return <DetailPage recipe={selectedRecipe} onBack={() => setCurrentPage('makanan')} onToggleFavorite={handleToggleFavorite} isFavorite={favorites.includes(selectedRecipe?.id)} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <ProfileContext.Provider value={{ profilePictures, handleProfilePictureChange }}>
      <div className="min-h-screen bg-gray-50">
        {/* Desktop Navbar */}
        <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />

        {/* Main Content */}
        <main className="min-h-screen">
          {renderCurrentPage()}
        </main>

        {/* Mobile Navbar */}
        <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />

        <PWABadge />
      </div>
    </ProfileContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)