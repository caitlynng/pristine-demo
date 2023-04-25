import styled from "styled-components";

const Wrapper = styled.section`
  background: var(--white);
  .dashboard-container {
    width: 100%;
    height: 100%;
    margin-left: 0; //transition to left when .toggle-sidebar is removed
    transition: 0.5s;
    background-color: #fafafa;
    min-height: 100vh;
  }

  @media (min-width: 400px) {
    .dashboard-container.toggle-sidebar {
      /*push the page content to the right when open the side navigation */
      /* transition: margin-left 0.5s; */
      margin-left: var(--smallSidebar-width);
    }
    .dashboard-container.toggle-sidebar:after {
      content: "";
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 11;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  @media screen and (min-width: 1000px) {
    background: var(--grey-50);
    min-height: 100vh;
    position: relative;
    main {
      display: grid;
      grid-template-columns: auto 1fr;

      & > aside {
        position: sticky;
        top: 0;
        align-self: start;
      }
    }
    .dashboard-container {
      padding: 0;
    }

    .dashboard-container.toggle-sidebar {
      margin-left: 0;
    }
    .dashboard-container.toggle-sidebar:after {
      content: none;
    }
    .walkthrough-icon {
      position: fixed;
      bottom: 5%;
      right: 1em;
      z-index: 1001 !important;
      background-color: var(--blue-700);
      height: auto;
      width: auto;
      max-width: 400px;
      max-height: 400px;
      padding: 1em 0.9em 0.5em 0.9em;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: var(--shadow-light);
      & svg {
        fill: var(--primary);
        font-size: 3.5em;
      }
    }
    .support-container {
      z-index: 1000 !important;
      position: fixed;
      bottom: 13%;
      right: 0;
      height: 70%;
      margin: 1em;

      opacity: 0;
      transform: translateY(100%);
      transition: opacity 0.3s, transform 0.5s;
      &.show {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .support-header {
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
    .support-content {
      height: calc(100% - 120px);
      background-color: white;
      padding: 3em 1em;
      box-shadow: var(--shadow-dark);
      border-radius: 0 0 16px 16px;
      & > div {
        background-color: var(--grey-10);
        padding: 8px 14px;
        width: 80%;
        border-radius: 16px;
        & > p {
          margin: 0.5em 0;
        }
        & * {
          line-height: 32px;
          font-size: 17px;
        }
      }
      & > p {
        padding-left: 12px;
        font-size: 15px;
        color: var(--grey-600);
      }
    }
  }
`;
export default Wrapper;
