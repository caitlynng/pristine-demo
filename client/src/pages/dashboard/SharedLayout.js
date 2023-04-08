import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../context/appContext";
import {
  TopNav,
  BigSideNav,
  SmallSideNav,
  Alert,
  PopUp,
} from "../../components";

const SharedLayout = () => {
  const { showSidebar, showAlert, demoMessage } = useAppContext();

  return (
    <Wrapper>
      {demoMessage && <PopUp />}
      <SmallSideNav />
      {/* <TopNav /> */}
      <main>
        <BigSideNav />
        {/* <div className="curved-background"></div> */}
        <div
          className={
            showSidebar
              ? "dashboard-container toggle-sidebar"
              : "dashboard-container"
          }
        >
          <TopNav />
          {showAlert && <Alert />}
          <Outlet />
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
