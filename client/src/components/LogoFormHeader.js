import logo from "../assets/images/logo.svg";
import SVG from "react-inlinesvg";
import Wrapper from "../assets/wrappers/LogoFormHeader";

const LogoFormHeader = ({headerTitle, headerText, showLogo}) => {
  return (
    <Wrapper className="flex align-center justify-center">
      {showLogo && (
        <div className="support-header-logo">
          <SVG src={logo} alt="logo-pristine" />
        </div>
      )}
      <div className="support-header-content flex flex-column">
        <p>{headerTitle}</p>
        {headerText && <p>{headerText}</p>}
      </div>
    </Wrapper>
  );
};

export default LogoFormHeader;
