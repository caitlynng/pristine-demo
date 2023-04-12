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
  }
`;
export default Wrapper;
