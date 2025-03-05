import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute, FaSignal, FaRedo, FaRandom } from "react-icons/fa";

function Header() {
  // State for volume level (0 to 1), mute state, and previous volume
  const [volume, setVolume] = useState(1); // Default volume is 100% (1)
  const [isMuted, setIsMuted] = useState(false); // Track mute state
  const [previousVolume, setPreviousVolume] = useState(1); // Store volume before muting
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state
  const [isShuffled, setIsShuffled] = useState(false); // Track shuffle state

  // Reference to the audio element
  const audioRef = useRef(null);

  // Update the audio volume whenever the volume or mute state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume; // Set volume to 0 if muted, otherwise use the slider value
    }
  }, [volume, isMuted]);

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
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0); // Automatically mute if volume is set to 0
    if (newVolume > 0) {
      setPreviousVolume(newVolume); // Update previous volume if not muted
    }
  };

  // Handle mute/unmute toggle
  const toggleMute = () => {
    if (isMuted) {
      // Unmute: restore the previous volume
      setVolume(previousVolume);
    } else {
      // Mute: store the current volume and set volume to 0
      setPreviousVolume(volume);
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  // Handle replay (restart the audio)
  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio
      audioRef.current.currentTime = 0; // Reset to the beginning
      audioRef.current.play(); // Play again
      setIsPlaying(true); // Update the play state
    }
  };

  // Handle shuffle toggle (for demonstration; actual shuffle logic depends on playlist implementation)
  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
    console.log("Shuffle toggled:", !isShuffled);
  };

  // Placeholder for waveform (boom volume)
  const WaveformPlaceholder = () => (
    <div className="flex items-center space-x-1 ml-2">
      <div className="h-2 w-1 bg-gray-400"></div>
      <div className="h-4 w-1 bg-gray-400"></div>
      <div className="h-3 w-1 bg-gray-400"></div>
      <div className="h-5 w-1 bg-gray-400"></div>
      <div className="h-2 w-1 bg-gray-400"></div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 p-2 bg-gray-100 rounded-lg">
      {/* Streaming Live Section */}
      <div className="flex items-center mb-2 md:mb-0">
        <FaSignal className="text-green-500 mr-2" />
        <h1 className="text-sm md:text-lg font-bold">Streaming Live: Diesel FM</h1>
        <WaveformPlaceholder />
      </div>

      {/* Control Buttons Section */}
      <div className="flex space-x-2 items-center">
        {/* Audio element (hidden) */}
        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Replace with a real streaming URL
          loop
        />

        {/* Shuffle Button */}
        <button
          onClick={toggleShuffle}
          className={`p-2 hover:bg-gray-300 rounded-full ${isShuffled ? "text-blue-500" : "text-gray-500"}`}
        >
          <FaRandom />
        </button>

        {/* Backward Button */}
        <button className="p-2 hover:bg-gray-300 rounded-full">
          <FaBackward />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="p-2 hover:bg-gray-300 rounded-full"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        {/* Forward Button */}
        <button className="p-2 hover:bg-gray-300 rounded-full">
          <FaForward />
        </button>

        {/* Replay Button */}
        <button
          onClick={handleReplay}
          className="p-2 hover:bg-gray-300 rounded-full"
        >
          <FaRedo />
        </button>

        {/* Volume Button (Mute/Unmute Toggle) */}
        <button
          onClick={toggleMute}
          className="p-2 hover:bg-gray-300 rounded-full"
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>

        {/* Volume Slider (Always Visible) */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 md:w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Header;