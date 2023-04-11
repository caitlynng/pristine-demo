import { useAppContext } from "../context/appContext.js";

import NavLinks from "./NavLinks";
import Wrapper from "../assets/wrappers/BigSideNav";
import Logo from './Logo'

const BigSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper className="primary-dark">
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container hide-sidebar"
        }
        onClick={toggleSidebar}
      >
        <Logo />
        <div className="content">
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
