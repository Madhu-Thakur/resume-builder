import React from 'react';

function Logo({ size = 'normal', className = '' }) {
  const sizeClasses = {
    small: 'text-lg',
    normal: 'text-2xl',
    large: 'text-3xl',
    hero: 'text-4xl md:text-6xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Resume Icon */}
      <div className="relative">
        <div className="w-8 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg shadow-lg transform rotate-1"></div>
        <div className="absolute top-1 left-1 w-6 h-8 bg-gradient-to-br from-indigo-300 to-purple-400 rounded opacity-80"></div>
        {/* Document lines */}
        <div className="absolute top-2 left-2 w-4 h-0.5 bg-white opacity-60 rounded"></div>
        <div className="absolute top-3 left-2 w-3 h-0.5 bg-white opacity-40 rounded"></div>
        <div className="absolute top-4 left-2 w-5 h-0.5 bg-white opacity-60 rounded"></div>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <h1 className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight`}>
          ElevateCV
        </h1>
        {size === 'hero' && (
          <p className="text-xs text-gray-600 font-medium ml-1">Professional Resume Builder</p>
        )}
      </div>
    </div>
  );
}

export default Logo;