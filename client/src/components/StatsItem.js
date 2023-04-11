import Wrapper from "../assets/wrappers/StatsItem";
import SVG from "react-inlinesvg";

const StatsItem = ({
  amount,
  title,
  icon,
  color,
  bgc,
  isActive,
}) => {

  return (
    <Wrapper
      isActive={isActive.isActive}
      className="item-box"
    >
      <div className="icon-container">{icon}</div>

      <div className="stats-content-container">
        <div className="subtitle">{title}</div>
        <div className="amount">{amount}</div>
      </div>
    </Wrapper>
  );
};

export default StatsItem;
