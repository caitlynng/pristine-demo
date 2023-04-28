import logo from "../assets/images/logo.svg";
import SVG from "react-inlinesvg";

const LogoFormHeader = ({headerTitle, headerText}) => {
  return (
    <div className="support-header flex align-center">
      <div>
        <SVG src={logo} alt="logo-pristine" />
      </div>
      <div className="header-text flex flex-column">
        <p>{headerTitle}</p>
        <p>{headerText}</p>
      </div>
    </div>
  );
};

export default LogoFormHeader;
