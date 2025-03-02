import StationItem from "./StationItem";

function StationList({ stations }) {
  return (
    <div className="overflow-x-auto">
      {/* Header Row - Hidden on mobile, displayed as grid on larger screens */}
      <div className="hidden md:grid md:grid-cols-6 gap-4 font-semibold text-gray-600 border-b pb-2">
        <div></div>
        <div>Name of the Station</div>
        <div>City & Country Origin</div>
        <div>Genre</div>
        <div>Bpm Range</div>
        <div>Rating</div>
      </div>

      {/* Station List */}
      {stations.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {stations.map((station) => (
            <StationItem key={station.id} station={station} />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No stations found for this genre.
        </div>
      )}
    </div>
  );
}

export default StationList;