import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaSignal } from "react-icons/fa";

function Header() {
  // State for volume level (0 to 1) and slider visibility
  const [volume, setVolume] = useState(1); // Default volume is 100% (1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state

  // Reference to the audio element
  const audioRef = useRef(null);

  // Update the audio volume whenever the volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Toggle play/pause for the audio
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <FaSignal className="text-green-500 mr-2" />
        <h1 className="text-lg font-bold">Streaming Live: Diesel FM</h1>
      </div>
      <div className="flex space-x-2 relative">
        {/* Audio element (hidden) */}
        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Replace with a real streaming URL
          loop
        />

        {/* Backward Button */}
        <button className="p-2 hover:bg-gray-200 rounded-full">
          <FaBackward />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        {/* Forward Button */}
        <button className="p-2 hover:bg-gray-200 rounded-full">
          <FaForward />
        </button>

        {/* Volume Button and Slider */}
        <div className="relative">
          <button
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <FaVolumeUp />
          </button>
          {showVolumeSlider && (
            <div className="absolute top-10 right-0 bg-white shadow-lg p-2 rounded-lg">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;