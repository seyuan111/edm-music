function Tabs({ genres, selectedGenre, setSelectedGenre }) {
  return (
    <div className="mb-4">
      <style>{`
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .ripple-effect {
          animation: ripple 0.6s ease-out;
        }
      `}</style>
      <h2 className="text-lg font-semibold mb-6">Radio:</h2>
      <div className="flex space-x-2 overflow-x-auto">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
              ${
                selectedGenre === genre
                  ? "bg-blue-500 text-white scale-105 shadow-lg shadow-blue-500/50"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-102"
              }
              active:scale-95 active:shadow-inner`}
          >
            <span className="relative z-10">{genre}</span>
            {selectedGenre === genre && (
              <>
                <span className="absolute inset-0 rounded-full bg-blue-600 animate-pulse opacity-25" />
                <span className="absolute inset-0 rounded-full bg-blue-400 ripple-effect" />
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tabs;