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
  const BigSideNavRef = useRef();

  const steps = [
    {
      content: "Click Upload",
      target: BigSideNavRef.current?.uploads,
      placement: "right",
      disableBeacon: true,
    },
    {
      content: "Now you're in Uploads",
      target: ".uploads-header",
      placement: "right",
    },
    {
      content: "Select file type",
      target: "#fileType",
      placement: "right",
    },
    {
      content: "Click Dashboard",
      target: BigSideNavRef.current?.dashboard,
      placement: "right",
      disableBeacon: true,
    },
    {
      content: "date range picker",
      target: ".daterangpicker-joyride",
      placement: "bottom",
    },
    {
      content: "compare to",
      target: "#comparedTo",
      placement: "bottom",
    },
    {
      content: "mainchart",
      target: ".mainchart-joyride",
      placement: "right",
    },
    {
      content: "view by",
      target: "#viewBy",
      placement: "bottom",
    },
    {
      content: "chart type",
      target: "#chartType",
      placement: "bottom",
    },
    {
      content: "chart",
      target: ".main-chart-container",
      placement: "right",
    },
    {
      content: "side chart",
      target: ".sidechart-joyride",
      placement: "left",
    },
    {
      content: "side chart",
      target: ".contentpill-container",
      placement: "left",
    },
    {
      content: "doughnut-chart-container",
      target: ".doughnut-chart-container",
      placement: "left",
    },
    {
      content: "multicolorbar",
      target: ".multicolorbar-joyride",
      placement: "left",
    },
    {
      content: "statscontainer-joyride",
      target: ".statscontainer-joyride",
      placement: "bottom",
    },
    {
      content: "Click Statements",
      target: BigSideNavRef.current?.statements,
      placement: "right",
      disableBeacon: true,
    },
    {
      content: "statements-joyride",
      target: ".statements-joyride",
      placement: "top",
    },
    {
      content: "Click Reports",
      target: BigSideNavRef.current?.reports,
      placement: "right",
      disableBeacon: true,
    },
    {
      content: "reports-joyride",
      target: ".reports-joyride",
      placement: "top",
    },
    {
      content: "search",
      target: ".search-form",
      placement: "right",
    },
    {
      content: "Click Settings",
      target: BigSideNavRef.current?.settings,
      placement: "right",
      disableBeacon: true,
    },
    {
      content: "profiles",
      target: ".profiles-joyride",
      placement: "bottom",
    },
    {
      content: "profiles",
      target: ".manageUploads-joyride",
      placement: "bottom",
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
      } else if (index === 3) {
        navigate('/demo')
      } else if (index === 15) {
        navigate('/demo/statements')
      } else if (index === 18) {
        navigate('/demo/reports')
      } else if (index === 21) {
        navigate('/demo/settings')
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
        debug
        disableOverlayClose
        spotlightClicks
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      {demoMessage && <PopUp />}
      <SmallSideNav />
      <main className="joyride-start">
        <BigSideNav ref={BigSideNavRef} />
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
