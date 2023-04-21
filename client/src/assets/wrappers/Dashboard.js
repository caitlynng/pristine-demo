import styled from "styled-components";

const Wrapper = styled.div`

  @media screen and (min-width: 1000px) {
    max-width: calc(99vw - var(--nav-height));
    .chart-container {
      display: flex;
    }
    .section-container {
      background-color: white;
      padding: 1em;
      margin: 0 2em;
    }
  }
`;
export default Wrapper;
