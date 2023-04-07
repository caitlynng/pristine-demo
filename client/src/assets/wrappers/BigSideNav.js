import styled from 'styled-components'

const Wrapper = styled.aside`
  display: none;
  @media screen and (min-width: 1000px) {
    display: block;
    background-color: var(--grey-300);
    .sidebar-container {
      height: 100%;
      width: 200px;
      transition: 0.5s ease-in;
      overflow: hidden;
      min-height: 100vh; //for big screen
    }
    .content {
      position: sticky;
      top: 0;
    }
    .sidebar-container.hide-sidebar {
      width: 70px;
    }
    /* .sidebar-container:hover {
      width: 200px;
    } */
    .logo {
      svg {
        fill: var(--grey-900);
      }
    }
    .nav-links {
      padding-top: calc(100vh / 6);
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 1.8em;
      min-height: 50px;
      color: var(--grey-500);
      font-weight: 600;
      text-transform: capitalize;
      height: 100%;
      text-decoration: none;
    }

    .icon {
      color: var(--grey-500);
      font-weight: 300;
      font-size: 1.5em;
      margin-right: 1.5em;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }

    .active .icon,
    .nav-link.active {
      color: var(--grey-900);
      font-weight: 700;
    }
    .nav-link.active::before {
      content: "";
      position: absolute;
      background-color: var(--grey-900);
      left: 0px;
      top: 3px;
      bottom: 3px;
      width: 5px;
      border-radius: 0px 6px 6px 0px;
      transition: transform 150ms ease-in-out 0s;
      transform: scaleY(1);
    }
    .nav-link:hover {
      color: var(--grey-900);
      .icon {
        color: var(--grey-900);
      }
    }
    .nav-link.active:hover {
      color: var(--grey-700);
      .icon {
        color: var(--grey-700);
      }
    }
  }
  /* @media (min-width: 950px) {
    display: block;
    .sidebar-container {
      width: 230px;
    }
    .sidebar-container:hover {
      width: 230px;
    }
  } */
`;
export default Wrapper
