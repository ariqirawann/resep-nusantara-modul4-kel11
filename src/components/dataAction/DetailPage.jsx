import { ArrowLeft, Clock, ChefHat, Heart } from 'lucide-react';

export default function DetailPage({ recipe, onBack, onToggleFavorite, isFavorite }) {
  if (!recipe) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>

        <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl">
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={recipe.image_url}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-slate-400'}`} />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${
                recipe.type === 'minuman'
                  ? 'text-green-700 bg-green-100/90'
                  : 'text-blue-700 bg-blue-100/90'
              }`}>
                {recipe.type === 'minuman' ? 'Minuman' : 'Makanan'}
              </span>
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.ingredients.length} bahan</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ChefHat className="w-4 h-4" />
                  <span>{recipe.steps.length} langkah</span>
                </div>
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-6">
              {recipe.name}
            </h1>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Bahan-bahan</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-slate-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Langkah-langkah</h2>
                <ol className="space-y-3">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-slate-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
