import styled from "styled-components";
import "rsuite/dist/rsuite.min.css";

const Wrapper = styled.div`
  .rs-picker-toggle {
    border-radius: 20px;
    font-size: 12px;
  }
  .rs-picker-has-value .rs-btn .rs-picker-toggle-value,
  .rs-picker-has-value .rs-picker-toggle .rs-picker-toggle-value {
    color: var(--grey-500) !important;
    font-weight: 600;
  }
  .rs-picker-default .rs-btn,
  .rs-picker-default .rs-picker-toggle,
  .rs-picker-input .rs-btn,
  .rs-picker-input .rs-picker-toggle {
    background-color: var(--grey-100)!important;
  }
  @media screen and (min-width: 1000px) {
  }
`;

export default Wrapper;
