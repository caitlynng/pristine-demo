import Wrapper from "../assets/wrappers/Button.js";
const Button = ({
  title,
  onSetActive,
  classList,
  disabled,
  icon,
  type,
  id,
  ariaLabel
}) => {
  return (
    <Wrapper
      data-testid="button-component"
      className={
        disabled
          ? `btn ${classList} disabled ${id ?? ""}`
          : `btn ${classList} ${id ?? ""}`
      }
      onMouseDown={onSetActive}
      type={type}
      aria-label={ariaLabel}
    >
      {title}
      <span className="icon-btn">{icon}</span>
    </Wrapper>
  );
};

export default Button;
