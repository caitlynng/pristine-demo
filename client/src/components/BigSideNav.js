import { useAppContext } from "../context/appContext.js";
import { forwardRef, useRef, useImperativeHandle } from "react";
import NavLinks from "./NavLinks";
import Wrapper from "../assets/wrappers/BigSideNav";
import Logo from './Logo'
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const BigSideNav =  forwardRef((props, ref) => {
  const { showSidebar, toggleSidebar, screenSize } = useAppContext();
  const grandChildRef = useRef(null);

  useImperativeHandle(ref, () => grandChildRef.current);

  return (
    <Wrapper className="primary-dark">
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container hide-sidebar"
        }
      >
        <Logo />
        <div className="content">
          <NavLinks toggleSidebar={screenSize < 1000 && toggleSidebar} ref={grandChildRef}/>
        </div>
      </div>
      <span data-testid="toggle-icon" className="toggle-icon" onClick={toggleSidebar}>
        {showSidebar ? <MdArrowLeft /> : <MdArrowRight />}
      </span>
    </Wrapper>
  );
})
export default BigSideNav;
