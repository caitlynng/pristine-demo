import styled from "styled-components";

const Wrapper = styled.div`
 .section-container {
      margin: 0.5em;
    }
  @media screen and (min-width: 1000px) {
    .chart-container {
      display: flex;
    }
    .section-container {
      background-color: white;
      padding: 1em;
      margin: 0 0.6em;
    }
  }
`;
export default Wrapper;
