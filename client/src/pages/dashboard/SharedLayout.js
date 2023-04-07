import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../context/appContext";
import { TopNav, BigSideNav, SmallSideNav, Alert } from "../../components";

const SharedLayout = () => {
  const { showSidebar, showAlert } = useAppContext();

  return (
    <Wrapper>
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
