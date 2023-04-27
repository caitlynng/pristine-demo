import Wrapper from "../assets/wrappers/LandingPage";
import { useNavigate } from "react-router-dom";
import { Logo, Button} from "../components/index.js";
import homeBanner from "../assets/images/banner.png";

const Landing = () => {
  const navigate = useNavigate();
  const navigateToDemo = () => navigate("/demo");
  
  return (
    <Wrapper className="flex flex-column">
      <header>
        <nav>
          <div className="left-nav flex align-center">
            <Logo />
          </div>
        </nav>
      </header>
      <div className="wrapper">
        <section className="section-container">
          <div
            className={`w-full align-center justify-center banner-container`}
          >
            <div className="banner-heading">
              <h1>
                Save Time, Track Money, and Get <br></br>
                <span className="gradient-text">Important Insights</span>
              </h1>
              <p className="banner-text">
                Pristine streamlines how you record your income and expenditure
                and keeps all aspects of your accounting process running
                smoothly.
              </p>
              <Button
                title="View a Demo"
                classList="contact-btn"
                onSetActive={navigateToDemo}
              />
            </div>
          </div>
        </section>
        <div className="banner-img flex align-center w-full margin-auto">
          <img src={homeBanner} alt="dashboard-screenshot"></img>
        </div>
      </div>
      <footer className="grid grid-center">
        <p className="flex-1">All rights reserved</p>
      </footer>
    </Wrapper>
  );
};

export default Landing;
