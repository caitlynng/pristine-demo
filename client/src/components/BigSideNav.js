import { useAppContext } from "../context/appContext.js";

import NavLinks from "./NavLinks";
import Wrapper from "../assets/wrappers/BigSideNav";
import Logo from './Logo'
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const BigSidebar = () => {
  const { showSidebar, toggleSidebar, screenSize } = useAppContext();
  return (
    <Wrapper className="primary-dark">
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container hide-sidebar"
        }
      >
        <Logo />
        <div className="content">
          <NavLinks toggleSidebar={screenSize < 1000 && toggleSidebar} />
        </div>
      </div>
      <span className="toggle-icon" onClick={toggleSidebar}>
        {showSidebar ? <MdArrowLeft /> : <MdArrowRight />}
      </span>
    </Wrapper>
  );
};

export default BigSidebar;
