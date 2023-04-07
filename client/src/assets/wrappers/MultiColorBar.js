import styled from "styled-components";

const Wrapper = styled.div`
  .multicolorbar-container {
    margin: 5% 0;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .values .value {
    float: left;
    &:last-child {
      visibility: hidden;
    }
  }

  .scale .graduation {
    float: left;
    text-align: center;
    &:last-child {
      display: none;
    }
  }

  .bars .bar {
    float: left;
    height: 8px;
    border-radius: 5px;
    &:first-child {
      background-color: var(--grey-600);
    }
    &:last-child {
      background-color: var(--grey-300);
    }
  }

  /* .bars div.bar:first-of-type {
    border-radius: 5px;
  }

  .bars div.bar:last-of-type {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  } */

  .legends {
    text-align: center;
  }

  .legends .legend {
    display: inline-block;
    margin: 0 5px;
    text-align: center;
  }

  .legends .legend .dot {
    font-size: 25px;
    vertical-align: middle;
  }

  .legends .legend .label {
    margin-left: 2px;
    vertical-align: middle;
  }
`;

export default Wrapper;
