import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import homeBanner from "../assets/images/home_banner.png";
import { Link } from "react-router-dom";
import { Logo, Button } from "../components/index.js";
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 56);
    });
  }, []);

  return (
    <Wrapper>
      <header className={scroll ? "header-fixed" : ""}>
        <nav>
          <Logo />
          <Button title="View A Demo" classList="contact-btn clear-btn hide-smscreen show-650mw" />
          <Button title="Contact Us" classList="contact-btn hide-smscreen show-650mw" />
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
                and aims to keep all aspects of your accounting process running
                smoothly.
              </p>
              <Button title="View a Demo" classList="contact-btn" />
            </div>
            <div className="banner-img">
              <img src={homeBanner}></img>
            </div>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default Landing;
