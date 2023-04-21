import { useState, useEffect, useRef } from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import { useNavigate } from "react-router-dom";
import { Logo, Button } from "../components/index.js";
import { IoIosAnalytics } from "react-icons/io";
import {HiOutlineReceiptTax} from 'react-icons/hi'
import {TbReportSearch} from 'react-icons/tb'
import SVG from "react-inlinesvg";
import homeBanner from "../assets/images/home_banner.png";
import uploadIcon from "../assets/images/upload-icon.svg";
import costIcon from "../assets/images/cost-icon.svg";
import chartIcon from "../assets/images/chart-icon.svg";
import analytics from "../assets/images/analytics.svg";
import statements from "../assets/images/statements.svg";
import report from "../assets/images/report.svg";

//https://www.emburse.com/
//https://quickbooks.intuit.com/
//https://www.rydoo.com/expense/
//https://www.ynab.com/
//https://goodbudget.com/what-you-get/

const Landing = () => {
  const navigate = useNavigate()
  const [scroll, setScroll] = useState(false);
  const scrollToRef = [];
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 56);
    });
  }, []);

  const executeScroll = (ind) => {
    scrollToRef[ind].scrollIntoView({ behavior: "smooth" });
    //to prevent window.scrollBy from cancelling on scrollIntoView if the latter hasn't finished scrolling before former runs
    setTimeout(() => {
      window.scrollBy(0, -80);
    }, 500);
  };
  const navigateToDemo = () => navigate("/demo")
  return (
    <Wrapper>
      <header className={scroll ? "header-fixed" : ""}>
        <nav>
          <div className="left-nav flex align-center">
            <Logo />
            <Button
              title="How it works"
              classList="plain-btn hide-smscreen show-1000mw nav-btn"
              onSetActive={() => executeScroll(0)}
            />
            <Button
              title="What you get"
              classList="plain-btn hide-smscreen show-1000mw nav-btn"
              onSetActive={() => executeScroll(1)}
            />
          </div>
          <Button
            title="View A Demo"
            classList="contact-btn clear-btn hide-smscreen show-850mw"
            onSetActive={() => navigateToDemo()}
          />
          <Button
            title="Contact Us"
            classList="contact-btn hide-smscreen show-850mw"
          />
        </nav>
      </header>
      <div className="wrapper">
        <section className="section-container">
          <div
            className={`w-full align-center justify-between banner-container`}
          >
            <div className="banner-heading">
              <h1>
                Save Time, Track Money, and Get{" "}
                <span className="gradient-text">Important Insights</span>
              </h1>
              <p className="banner-text">
                Pristine streamlines how you record your income and expenditure
                and keeps all aspects of your accounting process running
                smoothly.
              </p>
              <Button title="View a Demo" classList="contact-btn" />
            </div>
            <div className="banner-img">
              <img src={homeBanner}></img>
            </div>
          </div>
        </section>
        {/* how it works */}
        <section
          className="section-container"
          ref={(el) => (scrollToRef[0] = el)}
        >
          <div className="functions-container flex flex-column align-center justify-between margin-auto">
            <div className="section-intro">
              <h2 className="section-title">
                Experience <b>less</b> financial stress
              </h2>
              <p>
                Pristine lets you keep track of your sales and expenses in 3
                simple steps
              </p>
            </div>
            <div className="w-full flex functions-content flex-column">
              <div className="cubicle">
                <SVG src={uploadIcon} alt="upload-icon" />
                <p>Upload your reports from Paypal and third-party shippings</p>
              </div>
              <div className="cubicle">
                <SVG src={costIcon} alt="total-cost-icon" />
                <p>Input total cost of goods sold for the selected period</p>
              </div>
              <div className="cubicle">
                <SVG src={chartIcon} alt="chart-icon" />
                <p>Get insights of how your business is performing</p>
              </div>
            </div>
          </div>
        </section>
        {/* what you get */}
        <section
          className="section-container"
          ref={(el) => (scrollToRef[1] = el)}
        >
          <div className="features-container w-full">
            <div className="section-intro">
              <h2 className="section-title">
                Stay in complete <b>control</b>
              </h2>
              <p>
                Pristine lets you keep track of your sales and expenses in 3
                simple steps
              </p>
            </div>

            <div className="feature-content-wrapper flex align-center flex-column-rev feature-bg bgc-1">
              <div className="feature-img-container hide-smscreen show-850mw flex-2 grid grid-center">
                <SVG src={analytics} alt="dashboard-img" />
              </div>
              <div className="feature-content flex-1">
                <div className="flex align-center row-margin-2">
                  <IoIosAnalytics className="color-2"/>
                  <h3 className="color-2">Analytics</h3>
                </div>
                <p>
                  Test your native hybrid of web mobile apps using LambdaTest’s
                  online real device cloud and virtual mobile device platform of
                  emulators and simulators. Eliminating your in-house device
                  labs and bring high scalability to your mobile app testing.
                </p>
              </div>
            </div>

            <div className="feature-content-wrapper flex align-center flex-column">
              <div className="feature-content flex-1 padding-6">
                <div className="flex align-center row-margin-2">
                  <HiOutlineReceiptTax className="fill-none dark"/>
                  <h3 className="dark">Statements</h3>
                </div>
                <p>
                  Test your native hybrid of web mobile apps using LambdaTest’s
                  online real device cloud and virtual mobile device platform of
                  emulators and simulators. Eliminating your in-house device
                  labs and bring high scalability to your mobile app testing.
                </p>
              </div>
              <div className="feature-img-container hide-smscreen show-850mw grid grid-center flex-1">
                <img src={statements}></img>
              </div>
            </div>
            
            <div className="feature-content-wrapper flex align-center flex-column-rev feature-bg bgc-2">
              <div className="feature-img-container hide-smscreen show-850mw flex-2 grid grid-center">
                <img src={report} alt="dashboard-img" />
              </div>
              <div className="feature-content flex-1">
                <div className="flex align-center row-margin-2">
                  <TbReportSearch className="color-3 fill-none"/>
                  <h3 className="color-3">Reports</h3>
                </div>
                <p>
                  Test your native hybrid of web mobile apps using LambdaTest’s
                  online real device cloud and virtual mobile device platform of
                  emulators and simulators. Eliminating your in-house device
                  labs and bring high scalability to your mobile app testing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default Landing;
