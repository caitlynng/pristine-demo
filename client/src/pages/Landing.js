import { useState, useEffect, useRef } from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import homeBanner from "../assets/images/home_banner.png";
import { Link } from "react-router-dom";
import { Logo, Button } from "../components/index.js";
import SVG from "react-inlinesvg";
import uploadIcon from "../assets/images/upload-icon.svg";
import costIcon from "../assets/images/cost-icon.svg";
import chartIcon from "../assets/images/chart-icon.svg";


//https://www.emburse.com/
//https://quickbooks.intuit.com/
//https://www.rydoo.com/expense/
//https://www.ynab.com/
//https://goodbudget.com/what-you-get/

const Landing = () => {
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
      window.scrollBy(0, -100);
    }, 500);
  };
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
            />
          </div>
          <Button
            title="View A Demo"
            classList="contact-btn clear-btn hide-smscreen show-850mw"
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
        <section
          className="section-container"
          ref={(el) => (scrollToRef[0] = el)}
        >
          <div className="functions-container flex flex-column align-center justify-between margin-auto">
            <h3>Experience Less Financial Stress</h3>
            <p>
              Pristine lets you keep track of your sales and expenses in 3
              simple steps
            </p>
            <div className="w-full flex functions-content flex-column">
              <div className="cubicle">
                <SVG src={uploadIcon} alt="upload-icon" />
                <p>Upload your reports from Paypal and third-party shippings</p>
              </div>
              <div className="cubicle">
                {" "}
                <SVG src={costIcon} alt="total-cost-icon" />
                <p>Input total cost of goods sold for the selected period</p>
              </div>
              <div className="cubicle">
                {" "}
                <SVG src={chartIcon} alt="chart-icon" />
                <p>Get insights of how your business is performing</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default Landing;
