import { useRef, createRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const NavLinks = forwardRef((props, ref) => {

  const childRefs = useRef([]);

  const links = [
    {
      key: 'routeA',
      text: "dashboard",
      path: "/demo",
      icon: <BsFillGridFill />,
      // ref: dashboardBtnRef,
    },
    {
      key: 'routeB',
      text: "statements",
      path: "statements",
      icon: <FaWpforms />,
      // ref: statementsBtnRef,
    },
    {
      key: 'routeC',
      text: "reports",
      path: "reports",
      icon: <MdQueryStats />,
      // ref: reportsBtnRef,
    },
    {
      key: 'routeD',
      text: "uploads",
      path: "uploads",
      icon: <FiUploadCloud />,
      // ref: uploadsBtnRef,
    },
    {
      key: 'routeE',
      text: "settings",
      path: "settings",
      icon: <MdSettings />,
      // ref: settingsBtnRef,
    },
  ];

  
  useImperativeHandle(ref, () => childRefs.current);

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            end //ensure this component isn't matched as "active" when its descendant paths are matched.
            key={id}
            onClick={props.toggleSidebar}
            className={({ isActive }) =>
              isActive ? `nav-link active ${id}` : `nav-link ${id}`
            }
            ref={(ref) => (childRefs.current[text] = ref)}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
});

export default NavLinks;
