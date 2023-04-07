import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  .set-header-btn {
    background-color: transparent;
    & svg {
      font-size: 1.5em;
    }
  }
  .detail-panel-container {
    font-size: 13;
    text-align: left;
    padding: 2% 10% 2% 2%;
    border-bottom: 2px solid black;
  }
  .detail-panel-row {
    display: flex;
    flex-wrap: wrap;
  }
  .detail-panel-title {
    width: 25%;
    font-weight: 600;
  }
  .detail-panel-desc {
    padding-left: 2em;
    border-left: 1px solid var(--grey-300);
  }
  .onbackbtn-container {
    display: flex;
    align-items: center;
  }
  @media screen and (min-width: 600px) {
    .detail-panel-container {
      &:hover {
        background-color: var(--grey-300);
      }
    }
    .report-table-container {
        margin-top: 1em;
    }
  }
`;
export default Wrapper;
