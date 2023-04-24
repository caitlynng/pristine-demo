import Wrapper from '../assets/wrappers/Button.js'
import SVG from "react-inlinesvg";

const Button = ({
  title,
  onSetActive,
  classList,
  disabled,
  icon,
  type,
  id
}) => {
  return (
    <Wrapper
      className={
        disabled
          ? `btn ${classList} disabled ${id}`
          : `btn ${classList} ${id}`
      }
      onMouseDown={onSetActive}
      type={type}
    >
      {title}
      <span className="icon-btn">{icon}</span>
    </Wrapper>
  );
};

export default Button