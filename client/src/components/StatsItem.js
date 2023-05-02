import Wrapper from "../assets/wrappers/StatsItem";

const StatsItem = ({
  amount,
  title,
  icon,
  isActive,
}) => {

  return (
    <Wrapper
      isActive={isActive.isActive}
      className="item-box flex flex-wrap"
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
