import { useState, useEffect } from 'react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/makanan/RecipeGrid';

export default function FavoritesPage({ onRecipeClick, favorites, onToggleFavorite }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const itemsPerPage = 3;

  useEffect(() => {
    const allMakanan = Object.values(ResepMakanan.resep).map(recipe => ({ ...recipe, type: 'makanan' }));
    const allMinuman = Object.values(ResepMinuman.resep).map(recipe => ({ ...recipe, type: 'minuman' }));

    const allRecipes = [...allMakanan, ...allMinuman];
    const favoriteRecipes = allRecipes.filter(recipe => favorites.includes(recipe.id));

    setFilteredRecipes(favoriteRecipes);
    setCurrentPage(1); // Reset to first page when favorites change
  }, [favorites]);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
          Resep Favorit
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
          Kumpulan resep favoritmu dari makanan dan minuman Nusantara.
        </p>
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

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">Belum ada resep favorit. Tambahkan resep favoritmu!</p>
          </div>
        )}
      </main>
    </div>
  );
}
