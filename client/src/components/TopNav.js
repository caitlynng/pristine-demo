import { useState } from "react";
import Wrapper from "../assets/wrappers/TopNav";
import { FaUserAlt, FaBars, FaSearch, FaAngleLeft } from "react-icons/fa";
import { useAppContext } from "../context/appContext.js";
import SearchBar from "./SearchBar.js";
import Button from "./Button";
import Logo from "./Logo";
const TopBar = () => {
  const [showSearchPanel, setShowSearchPanel] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
  const { showSidebar, toggleSidebar, showDemoMessage } = useAppContext();

  const handleDropDown = () => {
    setShowLogout(!showLogout);
  };
  return (
    <Wrapper>
      <button
        type="button"
        className={showSidebar ? "toggle-btn active" : "toggle-btn"}
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>
      <Logo />
      <div className="nav-container max-width">
        <button
          className="btn-container smallscreen"
          type="button"
          onClick={() => setShowSearchPanel(true)}
        >
          <FaSearch />
        </button>

        <SearchBar visible={showSearchPanel} />

        <span className="username-display">Demo User</span>
        <div
          className="btn-container"
          tabIndex="0" //https://stackoverflow.com/questions/18504139/div-onblur-function
          onClick={handleDropDown}
          onBlur={handleDropDown}
        >
          <FaUserAlt className="user-logout-btn" />
          {showLogout && (
            <div className="dropdown nav-btn-height">
              <Button
                onSetActive={showDemoMessage}
                classList="dropdown-btn"
                title="log out"
              />
              <Button
                title="settings"
                classList="dropdown-btn"
                onSetActive={showDemoMessage}
              />
            </div>
          )}
        </div>
      </div>
      {showSearchPanel && (
        <div className="search-overlay-wrapper">
          <div className="search-overlay">
            <button
              className="back-btn"
              onClick={() => setShowSearchPanel(false)}
            >
              <FaAngleLeft />
            </button>
            <SearchBar
              visible={showSearchPanel}
              setShowSearchPanel={setShowSearchPanel}
            />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default TopBar;
