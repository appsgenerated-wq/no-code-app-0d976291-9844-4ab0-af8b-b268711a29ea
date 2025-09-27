import React from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="relative isolate min-h-screen">
        <div 
          className="absolute inset-0 -z-10 overflow-hidden bg-gray-900 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2070&q=80')`}}
        >
          <div className="absolute inset-0 bg-gray-900/60"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center justify-center text-center min-h-screen">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Welcome to FoodieApp
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-200 max-w-2xl">
            Discover, create, and share your favorite recipes. Join a community of food lovers and start your culinary adventure today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => onLogin('user@manifest.build', 'password')}
              className="rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-colors"
            >
              Try Demo User
            </button>
            <a
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold leading-6 text-white hover:text-gray-300"
            >
              Admin Panel <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
