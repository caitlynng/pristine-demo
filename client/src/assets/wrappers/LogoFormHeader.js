import styled from "styled-components";

const Wrapper = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: var(--blue-700);
  height: 120px;
  padding: 0 20px;
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  & svg {
    width: 4em;
    height: 4em;
    margin: 0 1em;
    padding-top: 0.9em;
    fill: var(--primary);
  }
  .header-text {
    color: white;
    & p {
      margin-top: 0;
    }
    & p:first-child {
      font-size: 1.7em;
    }
  }
  .support-header-content {
    color: white;
    & p {
      margin: 0;
      font-size: 1.2em;
    }
    & p:first-child {
      font-size: 1.7em;
    }

  }
  @media screen and (min-width: 1000px) {
    .support-header-content {
      & p:first-child {
        font-size: 2.2em;
      }
    }
  }
`;

export default Wrapper;
