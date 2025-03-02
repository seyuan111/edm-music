function Tabs({ genres, selectedGenre, setSelectedGenre }) {
    return (
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Radio:</h2>
        <div className="flex space-x-2 overflow-x-auto">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedGenre === genre
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default Tabs;