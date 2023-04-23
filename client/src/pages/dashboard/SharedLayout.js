import Wrapper from "../../assets/wrappers/SharedLayout";
import { useState, useRef, forwardRef } from "react";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import {
  TopNav,
  BigSideNav,
  SmallSideNav,
  Alert,
  PopUp,
} from "../../components";
import { useEffect } from "react";

const SharedLayout = () => {
  const { showSidebar, showAlert, demoMessage, showDemoMessage, closeDemoMessage} = useAppContext();

  const uploadBtnRef = useRef()

  const [{ run, steps }, setState] = useState({
    run: false,
    uploadBtnClicked: false,
    stepIndex: 0,
    steps: [],
  });
  const handleClickStart = () => {
    closeDemoMessage()
    setState({
      run: true,
      steps: [{
        content: <h2>Let's begin our journey!</h2>,
        target: ".joyride-start",
        placement: "center",
      },
      {
        content: "Click Upload",
        target: ".joyride-upload",
      },]
    });
  };
  
  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    console.log(data)
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }
  };
  useEffect(() => {
    showDemoMessage(handleClickStart,"Let's start a tour", "Let's get started" ,"skip")
  },[])

  return (
    <Wrapper>
      <Joyride
        callback={handleJoyrideCallback}
        run={run}
        continuous
        hideCloseButton
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        debug={true}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      {demoMessage && <PopUp />}
      <SmallSideNav />
      <main className="joyride-start">
        <BigSideNav forwardRef={uploadBtnRef}/>
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
