import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;

  .doughnut-chart-container {
    background-color: var(--grey-50);
    padding: 1em 0;
    margin: 2em 0;
    border-radius: 10px;
    min-width: 200px;
    min-height: 200px;
    max-width: 500px;
    max-height: 500px;
  }
  .chart-container {
    width: 100%;
    /* min-width: 200px;
    min-height: 200px;
    max-width: 500px;
    max-height: 500px; */
    overflow: auto;
  }
  .legend-container-outer {
    margin-bottom: 2em;
    flex: 1;
  }
  .legend-container-inner {
    width: 80%;
    margin: 0 auto;
  }

  .link-btn-container {
    width: 100%;
  }
  .overview-title {
    margin-bottom: 1em;
    display: flex;
    align-items: end;
    gap: 10px;
  }
  .contentpill-container {
    display: flex;
    gap: 2em;
    flex-wrap: wrap;
  }
  @media (min-width: 650px) {
    .doughnut-chart-container {
      align-items: center;
      display: flex;
      padding-right: 2em;
    }
    .legend-container-outer {
      margin-bottom: 0;
    }
  }
  @media screen and (min-width: 1000px) {
    display: flex;
    flex-direction: column;
    flex: 1;
    .legend-container-outer {
      display: none;
    }

    .contentpill-container {
      gap: 1em;
      flex-wrap: wrap;
    }
    .doughnut-chart-container {
      display: flex;
      background-color: transparent;
      margin: 0;
      border-radius: 10px;
      padding-right: 0;
      overflow: auto;
    }
    .chart-container {
      border-bottom: 1px solid var(--grey-300);
      margin-bottom: 1em;
    }
  }
  /* @media screen and (min-width: 1000px) and (min-height: 1100px) {
    .chart-container {
      border-bottom: none;
      margin-bottom: none;
    }
  }
  @media screen and (min-width: 1300px) and (min-height: 1100px) {
    .contentpill-container {
      flex-direction: column;
    }
  } */
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  padding-left: 10px;
  & .legend-color-box {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin-right: 10px;
    min-width: 15px;
  }
`;
