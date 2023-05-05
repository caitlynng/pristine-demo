import { forwardRef, useRef, useImperativeHandle } from "react";
import Wrapper from "../assets/wrappers/SmallSideNav";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext.js";
import NavLinks from "./NavLinks";

const SmallSideNav = forwardRef((props, ref) => {
  const { showSidebar, toggleSidebar } = useAppContext();
  const grandChildRef = useRef(null);

  useImperativeHandle(ref, () => grandChildRef.current);
  return (
    <Wrapper>
      <div
        className={
          showSidebar
            ? "small-sidebar-container show-sidebar"
            : "small-sidebar-container"
        }
      >
        <div className="content" ref={grandChildRef}>
          <button className="close-btn" onClick={toggleSidebar} aria-label="Close">
            <FaTimes />
          </button>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
});

export default SmallSideNav;
