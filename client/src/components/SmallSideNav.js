import Wrapper from "../assets/wrappers/SmallSideNav";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext.js";

import Logo from "./Logo";
import NavLinks from './NavLinks'

const SmallSideNav = () => {
  //toggleSidebar: close the smallSidebar on click
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "small-sidebar-container show-sidebar" : "small-sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          {/* <header>
            <Logo />
          </header>  */}
          <NavLinks toggleSidebar={toggleSidebar}/> 
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideNav;
