import Wrapper from "../../assets/wrappers/SharedLayout";
import { useWindowDimensions } from "../../utils/Helpers";
import { useState, useRef, useImperativeHandle } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Joyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  STATUS,
  Step,
} from "react-joyride";
import {
  TopNav,
  BigSideNav,
  SmallSideNav,
  Alert,
  PopUp,
} from "../../components";
import { useEffect } from "react";

const SharedLayout = () => {
  const {
    showSidebar,
    showAlert,
    demoMessage,
    showDemoMessage,
    closeDemoMessage,
    handleScreenResize,
  } = useAppContext();
  const navigate = useNavigate();
  const { width, height } = useWindowDimensions();

  const [stepIndex, setStepIndex] = useState(0);
  const [run, setRun] = useState(false);
  const childRef = useRef();

  const steps = [
    {
      content: "Click Upload",
      target: childRef.current?.uploads,
      placement: "right",
      disableBeacon: true,
    },
    {
      content: "Now you're in Uploads",
      target: ".uploads-header",
      placement: "right",
    },
  ];
  const handleClickStart = () => {
    closeDemoMessage();
    setRun(true);
  };


  const handleJoyrideCallback = (data) => {
    const { action, index, lifecycle, type, status, size } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      if (index === 0) {
        navigate("/demo/uploads");
      }
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
    }
  };

  useEffect(() => {
    showDemoMessage(
      handleClickStart,
      "Let's start a tour",
      "Let's get started",
      "skip"
    );
  }, []);

  useEffect(() => {
    if (width) handleScreenResize(width);
  }, [width]);

  console.log(stepIndex);
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
        stepIndex={stepIndex}
        debug={true}
        disableOverlayClose={true}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      {demoMessage && <PopUp />}
      <SmallSideNav />
      <main className="joyride-start">
        <BigSideNav ref={childRef} />
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
