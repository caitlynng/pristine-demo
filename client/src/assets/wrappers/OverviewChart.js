import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;

  .doughnut-chart-container {
    overflow: auto;
  }
  .chart-container {
    width: 100%;
    min-width: 200px;
    min-height: 200px;
    max-width: 400px;
    max-height: 400px;
    overflow: auto;
    margin: 0 auto;
  }
  .legend-container-outer {
    margin-bottom: 2em;
    flex: 1;
  }
  .legend-container-inner {
    width: 50%;
    margin: 0 auto;
  }

  .link-btn-container {
    width: 100%;
  }
  .overview-title {
    display: none;
  }
  .contentpill-container {
    display: flex;
    gap: 2em;
    flex-wrap: wrap;
    padding: 1em;
  }
  @media (min-width: 650px) {
    .doughnut-chart-container {
      align-items: center;
      display: flex;
    }
    .chart-container {
      max-width: 50%;
      overflow: hidden;
    }
    .legend-container-outer {
      margin-bottom: 0;
    }
  }
  @media screen and (min-width: 1000px) {
    display: flex;
    flex-direction: column;
    flex: 10;
    justify-content: space-around;
    .legend-container-outer {
      display: none;
    }

    .contentpill-container {
      gap: 1em;
      flex-wrap: wrap;
      padding: 0;
    }
    .doughnut-chart-container {
      display: flex;
      background-color: transparent;
      margin: 0;
      border-radius: 10px;
      padding: 0;
      overflow: auto;
    }
    .chart-container {
      border-bottom: 1px solid var(--grey-300);
      margin-bottom: 1em;
      overflow: auto;
      max-width: 100%;
    }
    .overview-title {
      margin-bottom: 1em;
      display: flex;
      align-items: end;
      gap: 10px;
      color: var(--blue-700);
    }
  }

  @media screen and (min-width: 1300px) and (min-height: 1100px) {
    .contentpill-container {
      flex-direction: column;
    }
    .overview-title {
      margin-top: -2em;
    }
  }
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
