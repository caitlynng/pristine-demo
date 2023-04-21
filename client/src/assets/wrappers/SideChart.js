import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  padding: 2em;

  .doughnut-chart-container {
    overflow: auto;
  }
  .chart-container {
    min-width: 200px;
    min-height: 200px;
    max-width: 450px;
    max-height: 450px;
    overflow: auto;
    margin: 0 auto;
    padding: 15%;
  }
  .legend-container-outer {
    margin-bottom: 2em;
    flex: 1;
  }
  .legend-container-inner {
    width: 50%;
    margin: 0 auto;
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
    }
    .chart-container {
      overflow: hidden;
      flex: 1;
    }
    .legend-container-outer {
      margin-bottom: 0;
    }
    .legend-container-inner {
    width: 100%;
  }
  }
  @media screen and (min-width: 1000px) {
    display: flex;
    flex-direction: column;
    flex: 1;
    .legend-container-outer {
      display: none;
    }
    .doughnut-chart-container {
      background-color: transparent;
      margin: 0;
      border-radius: 10px;
      padding: 0;
      overflow: auto;
    }
    .chart-container {
        padding: 20%;
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
