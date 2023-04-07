import { useState } from "react";
import Wrapper from "../assets/wrappers/TopNav";
import { FaUserAlt, FaBars, FaSearch, FaAngleLeft } from "react-icons/fa";
import { useAppContext } from "../context/appContext.js";
import SearchBar from "./SearchBar.js";
import Button from "./Button";
import Logo from "./Logo";
const TopBar = () => {
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const {  showSidebar, toggleSidebar } =
    useAppContext();

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

        <span className="username-display">Demo</span>
        <div
          className="btn-container"
          tabIndex="0" //https://stackoverflow.com/questions/18504139/div-onblur-function
        >
          <FaUserAlt className="user-logout-btn" />
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
            <SearchBar visible={showSearchPanel} setShowSearchPanel={setShowSearchPanel} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default TopBar;
