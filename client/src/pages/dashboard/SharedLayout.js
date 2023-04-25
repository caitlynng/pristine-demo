import Wrapper from "../../assets/wrappers/SharedLayout";
import {
  TopNav,
  BigSideNav,
  SmallSideNav,
  Alert,
  PopUp,
  Button
} from "../../components";
import logo from '../../assets/images/logo.svg'
import {BiMessageDots, BiX} from 'react-icons/bi'
import { useWindowDimensions } from "../../utils/Helpers";
import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Joyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  STATUS,
  Step,
} from "react-joyride";
import SVG from "react-inlinesvg";

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
  const [showSupportWidget, setShowSupportWidget] = useState(false)
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
      target: ".uploads-joyride",
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
      content: "Now you're in Dashboard",
      target: ".dashboard-joyride",
      placement: "top-end",
      spotlightPadding: 0
    },
    {
      content: "date range picker",
      target: ".daterangpicker-joyride",
      placement: "top",
    },
    {
      content: "compare to",
      target: "#comparedTo",
      placement: "top",
    },
    {
      content: "mainchart",
      target: ".mainchart-joyride",
      placement: "right",
    },
    {
      content: "chart",
      target: ".main-chart-container",
      placement: "right",
    },
    {
      content: "view by",
      target: "#viewBy",
      placement: "top",
    },
    {
      content: "chart type",
      target: "#chartType",
      placement: "top",
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
      placement: "bottom",
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
      placement: "top-end",
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
      placement: "right-start",
    },
    {
      content: "profiles",
      target: ".manageUploads-joyride",
      placement: "right-start",
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
        navigate("/demo");
      } else if (index === 16) {
        navigate("/demo/statements");
      } else if (index === 18) {
        navigate("/demo/reports");
      } else if (index === 21) {
        navigate("/demo/settings");
      }

        setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
      
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
    }
  };

  useEffect(() => {
    if (width) handleScreenResize(width);
  }, [width]);

  // useEffect(() => {
  //   //callback,defaultText, callbackBtnText, closeBtnText
  //   if (width && width > 1000) {
  //     showDemoMessage({
  //       callback: handleClickStart,
  //       defaultText: "Let's start a tour",
  //       callbackBtnText: "Let's get started",
  //       closeBtnText: "skip",
  //     });
  //   } else {
  //     showDemoMessage({ defaultText: "Demo test" });
  //   }
  // }, [width]);

  const supportHandle = (e) => {
    e.preventDefault()
    setShowSupportWidget(!showSupportWidget)
  }

  console.log(showSupportWidget)
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
        // debug
        disableOverlayClose
        spotlightClicks
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
      <div className="walkthrough-icon flex align-center" tabIndex='0' onBlur={supportHandle} onClick={supportHandle}>{ showSupportWidget ?  <BiX/> : <BiMessageDots />}</div>
      <div className={`support-container ${showSupportWidget? 'show' : ''}`}> 
          <div className="support-header flex align-center">
            <div><SVG src={logo} alt='logo-pristine'  /></div>
            <div className="header-text flex flex-column">
              <p>PristineDept Tech Support</p>
              <p>We'll be happy to assist</p>
            </div>
          </div>
          <div className="support-content flex flex-column justify-end">
            <p>PristineDept Support</p>
            <div className="flex flex-column">
              <p>Hello! How can we help?</p>
              <Button title="An app walkthrough tour"  classList="support-btn"/>
              <Button title="Register for a full version" classList="support-btn"/>
              <Button title="Something else" classList="support-btn"/>
            </div>
          </div>
      </div>
    </Wrapper>
  );
};

export default SharedLayout;
