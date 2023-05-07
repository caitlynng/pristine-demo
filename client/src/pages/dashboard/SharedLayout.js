import { Outlet, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Joyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  STATUS,
  Step,
} from "react-joyride";

import Wrapper from "../../assets/wrappers/SharedLayout";
import {
  TopNav,
  BigSideNav,
  SmallSideNav,
  Alert,
  PopUp,
  Button,
  InputForm,
} from "../../components";

import { BiMessageDots, BiX } from "react-icons/bi";
import { useAppContext } from "../../context/appContext";
import { useWindowDimensions } from "../../utils/Helpers";
import LogoFormHeader from "../../components/LogoFormHeader";

import {
  registerFields,
  contactUsFields,
  useClickOutsideComponent,
} from "../../utils/Helpers";
import {
  welcomeMsg,
  contactUsSuccessMsg,
  registerSuccessMsg,
  finishJoyrideSuccessMsg,
} from "../../utils/ShareLayoutConfig";

const SharedLayout = () => {
  const {
    showSidebar,
    toggleSidebar,
    showAlert,
    demoMessage,
    showPopupMessage,
    closeDemoMessage,
    handleScreenResize,
  } = useAppContext();
  const navigate = useNavigate();
  const { width, height } = useWindowDimensions();

  const [stepIndex, setStepIndex] = useState(0);
  const [run, setRun] = useState(false);
  const [showSupportWidget, setShowSupportWidget] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);

  const BigSideNavRef = useRef();
  const SmallSideNavRef = useRef();
  const TopNavRef = useRef();
  const supportContainerRef = useRef();

  useClickOutsideComponent(supportContainerRef, setShowSupportWidget);

  const getJoyrideStepTarget = (stepInd, others) => {
    if (width > 1000) {
      switch (stepInd) {
        case 0:
          return BigSideNavRef.current?.uploads;
        case 3:
          return BigSideNavRef.current?.dashboard;
        case 12:
          return BigSideNavRef.current?.statements;
        case 14:
          return BigSideNavRef.current?.reports;
        case 17:
          return ".search-form";
      }
    }
    if (others) return TopNavRef.current;
    return SmallSideNavRef.current;
  };
  const steps = [
    {
      content: (
        <div className="font-16">
          <p>
            To get insights of how your business has been doing, it's important
            to first upload all of your reports.
          </p>
          <p>Please click "Next" to continue.</p>
        </div>
      ),
      disableBeacon: true,
      disableOverlay: true,
      target: getJoyrideStepTarget(0),
      placement: width < 1000 ? "center" : "right",
    },
    {
      content:
        "You can then choose the file type when you're ready to upload your files.",
      target: ".uploads-joyride",
    },
    {
      content:
        "It's helpful to take a look at the file requirements before uploading! You can click on the info icon anytime for more instructions.",
      target: ".upload-requirement",
      placement: "right",
      disableOverlay: true,
    },
    {
      content: (
        <div className="font-16">
          <p>
            Dashboard provides reliable results and aims to aid you in tracking
            and monitoring the performance of your business strategies.
          </p>
          <p>Please click "Next" to continue.</p>
        </div>
      ),
      disableBeacon: true,
      target: getJoyrideStepTarget(3),
      placement: width < 1000 ? "center" : "right",
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      content:
        "These metrics can provide valuable insights into customer behavior and help you make data-driven decisions to improve your bottom line.",
      target: ".statscontainer-joyride",
      placement: "bottom",
    },
    {
      content:
        "You can choose the time period that works for you to check out the business activities.",
      target: ".daterangpicker-joyride",
      placement: "top",
      disableOverlay: true,
    },
    {
      content: (
        <div className="font-16">
          <p>
            This main chart can be a useful tool for tracking your business
            profits and expenses and makes it easier to see trends and identify
            areas where you can cut costs or increase revenue!
          </p>
          <p>
            If you want to see just the Revenues or Expenses data, simply click
            on the legend located at the bottom of the chart.
          </p>
        </div>
      ),
      target: ".mainchart-joyride",
      placement: "right",
    },
    {
      content:
        "You can also check out the data by selecting different time frames.",
      target: "#viewBy",
      placement: "top",
      disableOverlay: true,
    },
    {
      content:
        "Switching between a Line or Bar chart can make it easier for you to compare data. Simply choose the type of chart that works best for you.",
      target: "#chartType",
      placement: "top",
      disableOverlay: true,
    },
    {
      content:
        "This side chart makes it simple to compare the breakdown of Total sales and Total expenses, and see how they contribute to the total.",
      target: ".sidechart-joyride",
      placement: "left",
    },
    {
      content:
        "To customize your view of the doughnut chart, you can click on either the Total sales or Total expenses button to choose which data sets to display.",
      target: ".contentpill-container",
      placement: "left",
      disableOverlay: true,
    },
    {
      content:
        "The ratio section is a key metric in evaluating the financial health of a business. It shows how efficiently your business is operating, and whether your revenue streams are generating enough profits to cover your expenses.",
      target: ".multicolorbar-joyride",
      placement: "left",
      disableOverlay: true,
    },
    {
      content: (
        <div className="font-16">
          <p>
            The "Statements" tab gives you access to more detailed information
            about the breakdown of your sales and expenses.
          </p>
          <p>Please click "Next" to continue</p>
        </div>
      ),
      disableBeacon: true,
      target: getJoyrideStepTarget(12),
      placement: width < 1000 ? "center" : "right",
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      content:
        "This table provides a snapshot of your business financial performance over a specific period of time. It can also be used to identify tax-deductible expenses, which can help you to minimize your tax liability.",
      target: ".statements-joyride",
      placement: "bottom",
    },
    {
      content: (
        <div className="font-16">
          <p>
            The Reports section provides a centralized location for you to
            easily keep track of all your transaction records.
          </p>
          <p>Please click "Next" to continue.</p>
        </div>
      ),
      target: getJoyrideStepTarget(14),
      placement: width < 1000 ? "center" : "right",
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      disableBeacon: true,
    },
    {
      content:
        "With just one click of a button, you can easily search, filter, adjust headers, and download all of your report data.",
      target: ".reports-joyride",
      placement: "top-end",
    },
    {
      content:
        "You also have the option to search for transactions by various criteria, such as the customer's name, email, shipping address, tracking number, or transaction ID",
      target: getJoyrideStepTarget(17, true),
      placement: "right",
      disableOverlay: true,
    },
  ];
  const handleClickStart = () => {
    if (width < 1000) toggleSidebar();
    closeDemoMessage();
    setShowSupportWidget(false);
    setShowContactUs(false);
    setShowRegister(false);
    setRun(true);
  };
  const handleRegister = () => {
    closeDemoMessage();
    setShowSupportWidget(false);
    setShowContactUs(false);
    setRun(false);
    setShowRegister(true);
  };
  const handleContactUs = () => {
    closeDemoMessage();
    setShowSupportWidget(false);
    setShowContactUs(true);
    setShowRegister(false);
    setRun(false);
  };

  const handleJoyrideCallback = (data) => {
    const { action, index, lifecycle, type, status, size } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      if (index === 0) {
        navigate("/uploads");
        if (width < 1000) {
          toggleSidebar();
        }
      } else if (index === 2 && width < 1000) {
        toggleSidebar();
      } else if (index === 3) {
        navigate("/");
        if (width < 1000) {
          toggleSidebar();
        }
      } else if (index === 11 && width < 1000) {
        toggleSidebar();
      } else if (index === 12) {
        navigate("/statements");
        if (width < 1000) {
          toggleSidebar();
        }
      } else if (index === 13 && width < 1000) {
        toggleSidebar();
      } else if (index === 14) {
        navigate("/reports");
        if (width < 1000) {
          toggleSidebar();
        }
      }
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      if (status === "finished") {
        showPopupMessage({
          demoContent: finishJoyrideSuccessMsg,
          closeBtnText: "Ok",
        });
      }
      setRun(false);
    }
  };
  useEffect(() => {
    if (width) handleScreenResize(width);
  }, [width]);

  useEffect(() => {
    showPopupMessage({
      callback: handleClickStart,
      callbackBtnText: "start the tour",
      closeBtnText: "explore by myself",
      demoContent: welcomeMsg(),
    });
  }, []);

  const supportHandle = () => {
    setShowSupportWidget(!showSupportWidget);
  };
  const handleContactUsSubmit = (val) => {
    console.log(val);
    setShowContactUs(false);
    showPopupMessage({
      callbackBtnText: "ok",
      demoContent: contactUsSuccessMsg,
    });
  };
  const handleRegisterSubmit = (val) => {
    setShowRegister(false);
    showPopupMessage({
      callbackBtnText: "ok",
      demoContent: registerSuccessMsg,
    });
  };

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
        styles={{
          options: {
            zIndex: 1000,
          },
        }}
      />
      {demoMessage && <PopUp />}
      <SmallSideNav ref={SmallSideNavRef} />
      <main className="joyride-start">
        <BigSideNav ref={BigSideNavRef} />
        <div
          className={
            showSidebar
              ? "dashboard-container toggle-sidebar"
              : "dashboard-container"
          }
        >
          <TopNav ref={TopNavRef} />
          {showAlert && <Alert />}
          <Outlet />
        </div>
        <div
          className="walkthrough-icon flex align-center"
          tabIndex="0"
          onClick={supportHandle}
        >
          {showSupportWidget ? <BiX /> : <BiMessageDots />}
        </div>
        <div
          className={`support-container ${showSupportWidget ? "show" : ""}`}
          ref={supportContainerRef}
        >
          <LogoFormHeader
            headerText="We'll be happy to assist"
            headerTitle="PristineDept Tech Support"
            showLogo={true}
          />
          <div className="support-content flex flex-column justify-end">
            <p>PristineDept Support</p>
            <div className="flex flex-column">
              <p>Hello! How can we help?</p>
              <Button
                title="An app walkthrough tour"
                classList="support-btn"
                onSetActive={handleClickStart}
                ariaLabel="walkthrough-btn"
              />
              <Button
                title="Register"
                classList="support-btn"
                onSetActive={handleRegister}
                ariaLabel="register"
              />
              <Button
                title="Something else"
                classList="support-btn"
                onSetActive={handleContactUs}
                ariaLabel="contact-us"
              />
            </div>
          </div>
        </div>
        {showRegister && (
          <div className="blur">
            <div className="contact-form">
              <LogoFormHeader showLogo={false} headerTitle="Register" />
              <InputForm
                formRows={registerFields}
                handleSubmit={handleRegisterSubmit}
                btnTitle="register"
                isDefault={false}
                isDefaultHandle={() => setShowRegister(false)}
              />
            </div>
          </div>
        )}
        {showContactUs && (
          <div className="blur">
            <div className="contact-form">
              <LogoFormHeader headerTitle="Contact Us" showLogo={false} />
              <InputForm
                formRows={contactUsFields}
                handleSubmit={handleContactUsSubmit}
                btnTitle="send"
                isDefault={false}
                isDefaultHandle={() => setShowContactUs(false)}
              />
            </div>
          </div>
        )}
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
