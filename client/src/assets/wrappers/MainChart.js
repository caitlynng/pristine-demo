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
  .chart-container {
    width: 100%;
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
  .full-screen {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: 'white'; */
  }

  .viewby-container {
    display: flex;
    align-items: center;
    padding: 0 0.8em;
    cursor: pointer;
    gap: 3px;

    border-radius: 25px;
    background-color: var(--grey-10);
    &:hover {
      box-shadow: var(--shadow-dark);
    }
    & svg {
      font-size: 18px;
    }
  }
  .no-border {
    text-align: center;
    border: none;
    background: transparent;
    /* text-indent: 1px;
    text-overflow: ""; */
    appearance: none;
    padding: 0;
  }
  .header-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
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
    width: 100%;
    flex: 3;
    display: flex;
    flex-direction: column;

    .chart-container {
      overflow-y: hidden;
      margin: auto;
      background-color: transparent;
    }
  }
`;
