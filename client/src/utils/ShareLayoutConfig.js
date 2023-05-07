import header from "../assets/images/header.svg";
import SVG from "react-inlinesvg";

export const welcomeMsg = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-header flex align-center justify-center">
        <SVG src={header} alt="popup-header"></SVG>
      </div>
      <div className="welcome-content">
        <p>Welcome to Pristine! </p>
        <p>
          Come and join us for a quick tour to explore all the exciting features
          and learn how to make the most out of our app!
        </p>
      </div>
    </div>
  );
};

export const contactUsSuccessMsg = (
  <div className="success-msg">
    <p> Welcome on board! </p>
    <p>Your registration has been successfully completed!</p>
    <p>
      Our team will be reaching out to you shortly with more information, so
      please keep an eye out for our message.
    </p>
  </div>
);

export const registerSuccessMsg = (
  <div className="success-msg">
    <p> Thank you for sending us a message! </p>
    <p>
      We appreciate your interest and value your input. Your message has been
      received and we will respond to it as quickly as possible.
    </p>
  </div>
);

export const finishJoyrideSuccessMsg = (
  <div className="success-msg">
    <p> Great job completing the tour!</p>
    <p>
      If you need a refresher, simply click the chat icon at the bottom right.
      We're always here to help!
    </p>
    <p>Thank you for choosing our platform!</p>
  </div>
);
