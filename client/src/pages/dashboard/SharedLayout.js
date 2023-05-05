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
import logo from "../../assets/images/logo.svg";
import header from "../../assets/images/header.svg";
import { BiMessageDots, BiX } from "react-icons/bi";
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
import { registerFields, contactUsFields } from "../../utils/Helpers";
import LogoFormHeader from "../../components/LogoFormHeader";

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
  const [showSupportWidget, setShowSupportWidget] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  const BigSideNavRef = useRef();

  const steps = [
    {
      content: (
        <div className="font-16">
          <p>
            To get insights of how your business has been doing, it's important
            to first upload all of your reports.
          </p>
          <p>Please click "Next" to continue."</p>
        </div>
      ),
      target: BigSideNavRef.current?.uploads,
      placement: "right",
      disableBeacon: true,
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
            Once your files are uploaded, you can navigate to Dashboard to gain
            insights of your business performance.
          </p>
          <p>Please click "Next" to continue."</p>
        </div>
      ),
      target: BigSideNavRef.current?.dashboard,
      placement: "right",
      disableBeacon: true,
    },
    {
      content:
        "Dashboard provides reliable results and aims to aid you in tracking and monitoring the performance of your business strategies.",
      target: ".dashboard-joyride",
      placement: "top-end",
      spotlightPadding: 0,
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
    // {
    //   content: "compare to",
    //   target: "#comparedTo",
    //   placement: "top",
    // },
    {
      content:
        "This main chart can be a useful tool for tracking your business profits and expenses and makes it easier to see trends and identify areas where you can cut costs or increase revenue!",
      target: ".mainchart-joyride",
      placement: "right",
    },
    {
      content:
        "If you want to see just the Revenues or Expenses data, simply click on the legend located at the bottom of the chart.",
      target: ".main-chart-container",
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
    // {
    //   content: "doughnut-chart-container",
    //   target: ".doughnut-chart-container",
    //   placement: "left",
    // },
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
          <p>Please click "Next" to continue."</p>
        </div>
      ),
      target: BigSideNavRef.current?.statements,
      placement: "right",
      disableBeacon: true,
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
          <p>Please click "Next" to continue."</p>
        </div>
      ),
      target: BigSideNavRef.current?.reports,
      placement: "right",
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
      target: ".search-form",
      placement: "right",
      disableOverlay: true,
    },
    // {
    //   content: "Click Settings",
    //   target: BigSideNavRef.current?.settings,
    //   placement: "right",
    //   disableBeacon: true,
    // },
    // {
    //   content: "profiles",
    //   target: ".profiles-joyride",
    //   placement: "right-start",
    // },
    // {
    //   content: "profiles",
    //   target: ".manageUploads-joyride",
    //   placement: "right-start",
    // },
  ];
  const handleClickStart = () => {
    closeDemoMessage();
    setShowContactUs(false);
    setShowRegister(false);
    setRun(true);
  };
  const handleRegister = () => {
    closeDemoMessage();
    setShowContactUs(false);
    setRun(false);
    setShowRegister(true);
  };
  const handleContactUs = () => {
    closeDemoMessage();
    setShowContactUs(true);
    setShowRegister(false);
    setRun(false);
  };

  const handleJoyrideCallback = (data) => {
    const { action, index, lifecycle, type, status, size } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      if (index === 0) {
        navigate("/uploads");
      } else if (index === 3) {
        navigate("/");
      } else if (index === 14) {
        navigate("/statements");
      } else if (index === 16) {
        navigate("/reports");
      } else if (index === 19) {
        navigate("/settings");
      }
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      if (status === "finished") {
        showDemoMessage({
          defaultText:
            "Great job completing the tour! If you need a refresher, simply click the chat icon at the bottom right. We're always here to help. Thanks for choosing our platform!",
          closeBtnText: "Got it",
        });
      }
      setRun(false);
    }
  };

  useEffect(() => {
    if (width) handleScreenResize(width);
  }, [width]);

  const welcomeMessage = (width) => {
    const bigScreenMsg =
      "Come and join us for a quick tour to explore all the exciting features and learn how to make the most out of our app!";
    const smScreenMsg =
      "We've got you covered with our comprehensive desktop tour to help you discover and explore all of our features. We encourage you to take advantage of this opportunity!";
    return (
      <div>
        <div className="welcome-header">
          <SVG src={header} alt="popup-header"></SVG>
        </div>
        <div className="welcome-content">
          <p>Welcome to Pristine! </p>
          <p>{width > 1000 ? bigScreenMsg : smScreenMsg}</p>
        </div>
      </div>
    );
  };
  useEffect(() => {
    if (width && width > 1000) {
      showDemoMessage({
        callback: handleClickStart,
        callbackBtnText: "start the tour",
        closeBtnText: "explore by myself",
        demoContent: welcomeMessage(width),
      });
    } else {
      showDemoMessage({ demoContent: welcomeMessage(width) });
    }
  }, [width]);

  const supportHandle = (e) => {
    e.preventDefault();
    setShowSupportWidget(!showSupportWidget);
  };
  const handleSubmit = () => {
    setShowRegister(false);
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
      <div
        className="walkthrough-icon flex align-center"
        tabIndex="0"
        onBlur={supportHandle}
        onClick={supportHandle}
      >
        {showSupportWidget ? <BiX /> : <BiMessageDots />}
      </div>
      <div className={`support-container ${showSupportWidget ? "show" : ""}`}>
        <LogoFormHeader
          headerText="We'll be happy to assist"
          headerTitle="PristineDept Tech Support"
        />
        <div className="support-content flex flex-column justify-end">
          <p>PristineDept Support</p>
          <div className="flex flex-column">
            <p>Hello! How can we help?</p>
            <Button
              title="An app walkthrough tour"
              classList="support-btn"
              onSetActive={handleClickStart}
            />
            <Button
              title="Register"
              classList="support-btn"
              onSetActive={handleRegister}
            />
            <Button
              title="Something else"
              classList="support-btn"
              onSetActive={handleContactUs}
            />
          </div>
        </div>
      </div>
      {showRegister && (
        <div className="contact-form">
          <LogoFormHeader
            
            headerTitle="Register"
          />
          <InputForm
            formRows={registerFields}
            handleSubmit={handleSubmit}
            btnTitle="register"
            isDefault={false}
            isDefaultHandle={() => setShowRegister(false)}
          />
        </div>
      )}
      {showContactUs && (
        <div className="contact-form">
          <LogoFormHeader
            headerTitle="Contact Us"
          />
          <InputForm
            formRows={contactUsFields}
            handleSubmit={handleSubmit}
            btnTitle="send"
            isDefault={false}
            isDefaultHandle={() => setShowContactUs(false)}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default SharedLayout;
