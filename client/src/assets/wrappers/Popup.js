import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1000;
  .popup_inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    border-radius: 8px;
    background-color: white;
    &:has(.welcome-container) {
      width: 90%;
      height: auto;
    }
  }
  .popup_inner .demo-text {
    background-color: white;
    margin-bottom: 0;
    padding: 2em 3em 0.5em 3em;
  }
  .popup_inner p {
    font-size: 0.75em;
    font-weight: 600;
    margin-bottom: 1em;
  }

  .popup-btn-container {
    background-color: white;
    padding-bottom: 2em;
    border-radius: 8px;
  }
  .welcome-container {
    width: 100%;
    height: 100%;
  }
  .welcome-header {
    & svg {
      max-width: 100%;
      height: auto;
      flex: 1;
    }
  }
  .welcome-content {
    margin-top: -1em;
    background-color: white;
    padding: 2em;
    font-size: 17px;
    line-height: 1.7;
  }
  @media screen and (min-width: 850px) {
    .popup_inner p {
      font-size: 0.9em;
    }
    .popup_inner {
      &:has(.welcome-container) {
        width: 60%;
      }
    }
  }
  @media screen and (min-width: 1000px) {
    .popup_inner {
      &:has(.welcome-container) {
        width: 40%;
      }
    }
    .popup_inner p {
      font-size: 1.1em;
    }
  }
`;
export default Wrapper;
