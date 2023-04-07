import { currencyFormatter } from "../utils/Helpers.js";
import { Wrapper } from "../assets/wrappers/ContentPill.js";

const ContentPill = ({ onClickHandle, category, total, active }) => {
  return (
    <Wrapper active={active}>
      <div
        onClick={onClickHandle}
        className="btn-container"
        category={category}
      >
        <div className="content-container">
          <div className="subtitle">{category}</div>
          <div className="amount">{currencyFormatter.format(total)}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ContentPill;
