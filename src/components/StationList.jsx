import StationItem from "./StationItem";

function StationList({ stations }) {
  return (
    <div className="overflow-x-auto">
      {/* Header Row - Hidden on mobile, displayed as grid on larger screens */}
      <div className="hidden items-center justify-center md:grid md:grid-cols-6 gap-2 font-semibold text-gray-600 border-b pb-2 text-md">
        <div></div> {/* Empty column for consistency */}
        <div>Station Name</div>
        <div>City/Country</div>
        <div>Genre</div>
        <div>BPM</div>
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