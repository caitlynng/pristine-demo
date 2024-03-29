import styled from "styled-components";

export const Wrapper = styled.div`
  .fullscreen {
    background-color: white;
  }
  .header-wrapper {
    & .title-wrapper {
      & p {
        font-size: 11px;
      }
    }
    position: relative;
  }
  .main-chart-container {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .chart-settings-icon {
    height: 100%;
    font-size: 1.3em;
    display: grid;
    place-items: center;
    color: var(--blue-700);
    cursor: pointer;
    &:hover {
      color: var(--grey-600);
    }
  }
  .header-wrapper {
    justify-content: flex-end;
    padding: 1em;
    gap: 10px;
    & .title-wrapper {
      margin-right: auto;
      color: var(--grey-900);
      & p {
        font-size: 13px;
        color: var(--grey-400);
      }
    }
  }

  @media screen and (min-width: 1000px) {
    flex: 4;
    display: flex;
    flex-direction: column;
    min-width: 0; //https://stackoverflow.com/questions/38382734/flex-items-not-shrinking-when-window-gets-smaller
    .main-chart-container {
      overflow-y: hidden;
      margin: auto;
      background-color: white;
    }
  }
`;
