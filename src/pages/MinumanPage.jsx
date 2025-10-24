// src/pages/MinumanPage.jsx
import { useState, useEffect } from 'react';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/minuman/RecipeGrid';

export default function MinumanPage({ onRecipeClick, favorites, onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const itemsPerPage = 3;

  const allMinuman = Object.values(ResepMinuman.resep);

  useEffect(() => {
    const filter = () => {
      let filtered = allMinuman;

      // Filter by search
      if (searchQuery.trim() !== '') {
        const lowercasedQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(recipe =>
          recipe.name.toLowerCase().includes(lowercasedQuery)
        );
      }

      // Filter by ingredient count
      if (filterType !== 'all') {
        filtered = filtered.filter(recipe => {
          const count = recipe.ingredients.length;
          switch (filterType) {
            case 'low': return count < 5;
            case 'medium': return count >= 5 && count <= 7;
            case 'high': return count > 7;
            default: return true;
          }
        });
      }

      setFilteredRecipes(filtered);
      setCurrentPage(1); // Reset to first page when filter changes
    };

    filter();
  }, [searchQuery, filterType]);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Cari resep..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Semua Bahan</option>
              <option value="low">Kurang dari 5 bahan</option>
              <option value="medium">5-7 bahan</option>
              <option value="high">Lebih dari 7 bahan</option>
            </select>
          </div>
        </div>

        <RecipeGrid recipes={paginatedRecipes} onRecipeClick={onRecipeClick} favorites={favorites} onToggleFavorite={onToggleFavorite} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
