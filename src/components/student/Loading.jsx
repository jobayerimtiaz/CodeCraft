import { useState, useEffect } from "react";
import { FaSpinner, FaLeaf, FaCloud, FaSun, FaMoon } from "react-icons/fa";
import { GiFlowerPot } from "react-icons/gi";

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [activeIcon, setActiveIcon] = useState(0);
  const icons = [FaLeaf, FaCloud, FaSun, FaMoon, GiFlowerPot];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length);
    }, 800);

    return () => clearInterval(iconInterval);
  }, [icons.length]);

  const ActiveIcon = icons[activeIcon];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secondary text-primary-content">
      <div className="text-center p-8 rounded-2xl bg-base-100 bg-opacity-90 shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <ActiveIcon className="text-6xl text-primary animate-pulse" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Welcome</h1>
        <p className="mb-6">Loading your experience...</p>

        <div className="w-full bg-base-200 rounded-full h-4 mb-4">
          <div
            className="bg-primary h-4 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm text-base-content">
          <span>{progress}%</span>
          <span className="flex items-center">
            <FaSpinner className="animate-spin mr-2" />
            Loading
          </span>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          {icons.map((Icon, index) => (
            <Icon
              key={index}
              className={`text-xl ${
                index === activeIcon
                  ? "text-primary"
                  : "text-base-content opacity-30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 text-sm text-primary-content opacity-70">
        Crafted with care for you
      </div>
    </div>
  );
};

export default Loading;
