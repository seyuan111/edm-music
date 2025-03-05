import { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import StationList from "./components/StationList";
import Banner from './components/Banner';
import "./App.css";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("HOUSE");

  // Sample data for stations (you can replace this with an API call later)
  const stations = [
    { id: 1, name: "Station 1", city: "New York, USA", genre: "HOUSE", bpm: "120-130", rating: 5 },
    { id: 2, name: "Station 2", city: "Berlin, Germany", genre: "TECHNO", bpm: "130-140", rating: 4 },
    { id: 3, name: "Station 3", city: "Tokyo, Japan", genre: "TRANCE", bpm: "110-120", rating: 4 },
    // Add more stations as needed
  ];

  // Filter stations based on selected genre
  const filteredStations = stations.filter(
    (station) => station.genre === selectedGenre
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <Banner />
        <Header />
        <Tabs
          genres={["HOUSE", "TECHNO", "TRANCE", "HARDSTYLE", "JUNGLE", "LOUNGE", "FAVORITE", "INTERNA"]}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
        <StationList stations={filteredStations} />
      </div>
    </div>
  );
}

export default App;
