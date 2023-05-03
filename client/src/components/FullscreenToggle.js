import { RiFullscreenLine, RiFullscreenExitLine } from 'react-icons/ri';

const FullscreenToggle = ({ screenSize, fullscreenActive, enterFullscreen, exitFullscreen }) => {
  if (screenSize <= 450) return null;

  return (
    <>
      {fullscreenActive && screenSize >= 450 ? (
        <div className="chart-settings-icon tooltip" onClick={exitFullscreen}>
          <RiFullscreenExitLine />
          <span className="tooltiptext bottom">Exit full screen</span>
        </div>
      ) : (
        <div className="chart-settings-icon tooltip" onClick={enterFullscreen}>
          <RiFullscreenLine />
          <span className="tooltiptext bottom">Enter full screen</span>
        </div>
      )}
    </>
  );
};

export default FullscreenToggle;





