import styled from "styled-components";

const Wrapper = styled.section`
  background: var(--white);
  position: relative;
  .dashboard-container {
    width: 100%;
    height: 100%;
    margin-left: 0; //transition to left when .toggle-sidebar is removed
    transition: 0.5s;
    background-color: #fafafa;
    min-height: 100vh;
  }

  .walkthrough-icon {
    display: none;
  }
  .walkthrough-icon {
    display: block;
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
    bottom: 9em;
    right: 0;
    height: 70%;
    margin: 1em;
    max-height: 40em;
    opacity: 0;
    transform: translateY(100%);
    transition: opacity 0.3s, transform 0.5s;
    &.show {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .support-content {
    height: calc(100% - 120px);
    background-color: white;
    padding: 3em 1em;
    box-shadow: var(--shadow-dark);
    border-radius: 0 0 8px 8px;
    & > div {
      background-color: var(--grey-10);
      padding: 8px 14px;
      width: 80%;
      border-radius: 8px;
      & > p,
      button {
        margin: 0.5em 0;
        font-size: 1em;
        line-height: 32px;
      }
    }
    & > p {
      padding-left: 12px;
      font-size: 15px;
      color: var(--grey-600);
    }
  }
  .contact-form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: var(--shadow-dark);
    border-radius: 16px;
    z-index: 1000;
    width: 90%;
  }
  .blur {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.4);
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 900;
  }
  .success-msg {
    text-align: left;
    padding: 2em 3em 0.5em 3em;
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
    .support-content {
      & > div {
        & > p,
        button {
          font-size: 1.2em;
        }
      }
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
    .contact-form {
      max-width: 40%;
    }
    .support-content {
      & > div {
        & > p,
        button {
          font-size: 1.5em;
        }
      }
    }
  }
`;
export default Wrapper;
