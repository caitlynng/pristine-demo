import styled from 'styled-components'

const Wrapper = styled.aside`
  display: none;
  @media screen and (min-width: 1000px) {
    display: block;
    position: relative;
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
    .logo,
    .logo-name {
      svg {
        fill: white;
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
      color: var(--grey-400);
      font-weight: 600;
      text-transform: capitalize;
      height: 100%;
      text-decoration: none;
    }

    .icon {
      color: var(--grey-400);
      font-weight: 300;
      font-size: 1.5em;
      margin-right: 1.5em;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }

    .active .icon,
    .nav-link.active,
    .nav-link.active:hover,
    .nav-link.active:hover .icon {
      color: var(--primary);
      font-weight: 700;
      background-color: var(--blue-700);
    }
    /* .nav-link.active::before {
      content: "";
      position: absolute;
      background-color: var(--primary);
      left: 0px;
      top: 3px;
      bottom: 3px;
      width: 5px;
      border-radius: 0px 6px 6px 0px;
      transition: transform 150ms ease-in-out 0s;
      transform: scaleY(1);
    } */
    .nav-link:hover {
      color: var(--grey-200);
      .icon {
        color: var(--grey-200);
      }
    }
    .sidebar-container ~ .toggle-icon {
      position: absolute;
      display: grid;
      place-items: center;
      bottom: 8%;
      height: 1.1em;
      width: 1.1em;
      border: 2px solid var(--primary);
      font-size: 2em;
      background-color: white;
      border-radius: 50%;
      color: var(--primary);
      cursor: pointer;
      left: 178px;
      transition: left 0.5s ease-in;
    }
    .sidebar-container.hide-sidebar ~ .toggle-icon {
      left: 55px;
      transition: left 0.5s ease-in;
    }
  }
`;
export default Wrapper
