import { useState } from "react";
import { FaHeart } from "react-icons/fa";

function StationItem({ station }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ));
  };

  return (
    <div className="py-3">
      {/* Mobile Layout: Stacked */}
      <div className="md:hidden flex items-start space-x-3">
        <input type="checkbox" className="h-5 w-5 text-blue-500 mt-1" />
        <div className="flex-1">
          <div className="font-semibold text-gray-800">{station.name}</div>
          <div className="text-sm text-gray-600">{station.city}</div>
          <div className="text-sm text-gray-600">Genre: {station.genre}</div>
          <div className="text-sm text-gray-600">BPM: {station.bpm}</div>
          <div className="flex items-center space-x-2 mt-1">
            <div>{renderStars(station.rating)}</div>
            <button onClick={() => setIsFavorite(!isFavorite)}>
              <FaHeart
                className={
                  isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
                }
              />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout: Grid */}
      <div className="hidden md:grid md:grid-cols-6 gap-4 items-center">
        <div>
          <input type="checkbox" className="h-5 w-5 text-blue-500" />
        </div>
        <div>{station.name}</div>
        <div>{station.city}</div>
        <div>{station.genre}</div>
        <div>{station.bpm}</div>
        <div className="flex items-center space-x-2">
          <div>{renderStars(station.rating)}</div>
          <button onClick={() => setIsFavorite(!isFavorite)}>
            <FaHeart
              className={
                isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StationItem;