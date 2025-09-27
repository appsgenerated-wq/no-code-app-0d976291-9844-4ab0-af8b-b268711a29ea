import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, recipes, onLogout, onLoadRecipes, onCreateRecipe, onDeleteRecipe }) => {
  const [formState, setFormState] = useState({ title: '', description: '', ingredients: '', instructions: '', prepTime: '', photo: null });

  useEffect(() => {
    onLoadRecipes();
  }, [onLoadRecipes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
        setFormState(prevState => ({ ...prevState, photo: e.target.files[0] }));
    }
  };

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    if (!formState.title || !formState.ingredients || !formState.instructions) {
        alert('Title, Ingredients, and Instructions are required.');
        return;
    }
    const recipeData = {
        ...formState,
        prepTime: parseInt(formState.prepTime, 10) || 0,
    };
    await onCreateRecipe(recipeData);
    setFormState({ title: '', description: '', ingredients: '', instructions: '', prepTime: '', photo: null });
    e.target.reset(); // Reset file input
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user.name}!
            </h1>
            <p className="text-gray-600">Your personal recipe dashboard.</p>
          </div>
          <div className="flex items-center space-x-4">
             <a 
              href={`${config.BACKEND_URL}/admin`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-10">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a New Recipe</h2>
              <form onSubmit={handleCreateRecipe} className="space-y-4">
                <input type="text" name="title" placeholder="Recipe Title" value={formState.title} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
                <textarea name="description" placeholder="A short description" value={formState.description} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" rows="2" />
                <textarea name="ingredients" placeholder="Ingredients (one per line)" value={formState.ingredients} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" rows="4" required />
                <textarea name="instructions" placeholder="Instructions" value={formState.instructions} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" rows="6" required />
                <input type="number" name="prepTime" placeholder="Prep time (mins)" value={formState.prepTime} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Recipe Photo</label>
                  <input type="file" name="photo" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Recipe</button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Recipes</h2>
            {recipes.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">No recipes yet. Add your first one!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {recipes.map(recipe => (
                  <div key={recipe.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col sm:flex-row relative">
                    {recipe.photo?.thumbnail && <img src={recipe.photo.thumbnail.url} alt={recipe.title} className="h-48 w-full sm:w-48 object-cover" />}
                    <div className="p-6 flex-grow">
                      <h3 className="font-bold text-lg text-gray-900">{recipe.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">by {recipe.owner?.name || 'Unknown'}</p>
                      <p className="text-sm text-gray-700 mt-2 line-clamp-2">{recipe.description}</p>
                    </div>
                    {user.id === recipe.owner?.id && (
                        <button onClick={() => onDeleteRecipe(recipe.id)} className='absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                        </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
