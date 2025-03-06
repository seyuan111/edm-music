import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute, FaSignal, FaRedo, FaRandom } from "react-icons/fa";

function Header() {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

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

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (newVolume > 0) {
      setPreviousVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
    console.log("Shuffle toggled:", !isShuffled);
  };

  // Waveform Component with playing/paused states
  const Waveform = ({ isPlaying }) => (
    <div className="flex items-center space-x-1 ml-2">
      <style>{`
        @keyframes wave {
          0% { height: 0.5rem; }
          50% { height: 1.25rem; }
          100% { height: 0.5rem; }
        }
        .wave-bar {
          width: 0.25rem;
          height: 0.75rem; /* Fixed height when not playing */
          background-color: ${isPlaying ? "#10B981" : "#9CA3AF"}; /* Green when playing, gray when paused */
          ${isPlaying ? "animation: wave 0.8s infinite ease-in-out;" : ""} /* Animation only when playing */
        }
        .wave-bar:nth-child(1) { animation-delay: 0s; }
        .wave-bar:nth-child(2) { animation-delay: 0.1s; }
        .wave-bar:nth-child(3) { animation-delay: 0.2s; }
        .wave-bar:nth-child(4) { animation-delay: 0.3s; }
        .wave-bar:nth-child(5) { animation-delay: 0.4s; }
      `}</style>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 p-2 bg-gray-100 rounded-lg">
      {/* Streaming Live Section */}
      <div className="flex items-center mb-2 md:mb-0">
        <FaSignal className="text-green-500 mr-2" />
        <h1 className="text-sm md:text-lg font-bold">Streaming Live: Diesel FM</h1>
        <Waveform isPlaying={isPlaying} /> {/* Always show waveform, pass isPlaying prop */}
      </div>

      {/* Control Buttons Section */}
      <div className="flex space-x-2 items-center">
        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          loop
        />

        <button
          onClick={toggleShuffle}
          className={`p-2 hover:bg-gray-300 rounded-full ${isShuffled ? "text-blue-500" : "text-gray-500"}`}
        >
          <FaRandom />
        </button>

        <button className="p-2 hover:bg-gray-300 rounded-full">
          <FaBackward />
        </button>

        <button
          onClick={togglePlayPause}
          className="p-2 hover:bg-gray-300 rounded-full"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button className="p-2 hover:bg-gray-300 rounded-full">
          <FaForward />
        </button>

        <button
          onClick={handleReplay}
          className="p-2 hover:bg-gray-300 rounded-full"
        >
          <FaRedo />
        </button>

        <button
          onClick={toggleMute}
          className="p-2 hover:bg-gray-300 rounded-full"
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>

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