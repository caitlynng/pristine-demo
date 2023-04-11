import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  height: var(--nav-height);
  z-index: 10;
  position: sticky;
  top: 0;
  margin-bottom: 1.5em;
  background-color: white;
  border-bottom: 1px solid #ececec;
  box-shadow: 0 2px 4px 0 #0000000a;

  .nav-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1em;
    /* & svg {
      color: var(--grey-100);
    } */
  }
  .user-logout-btn {
    /* display: none; */
  }
  .dropdown {
    /* display: none; */
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.3em;
    color: var(--grey-600);
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0;
  }
  .toggle-btn.active {
    color: var(--orange-light);
  }

  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 27px;
    width: 27px;
    border-radius: 50%;
    padding: 5px;
    background: var(--blue-700);
    cursor: pointer;
    & svg {
      color: var(--grey-100);
    }
  }
  .user-logout-btn {
    position: relative;
    height: 12px;
    width: 12px;
  }
  .username-display {
    display: none;
  }
  .btn-container:hover,
  .btn-container.dropdown-active {
    background-color: var(--grey-900);
  }
  .btn-container .dropdown .show-dropdown {
    background-color: var(--grey-100);
  }

  .search-overlay-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
  }
  .search-overlay {
    transition: 1s ease-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #333;
    color: #eee;
    overflow: auto;
    padding: 1em;
    display: flex;
    align-items: start;
  }
  .back-btn {
    background: transparent;
    border-color: transparent;
    font-size: 2em;
    color: var(--grey-100);
    cursor: pointer;
  }
  .logo {
    display: none;
  }
  .logo-name {
    margin-left: 10px;
  }
  .logo-container {
    svg {
      fill: var(--primary);
    }
  }
  .logo-container {
    margin: 0;
  }

  @media (min-width: 499px) {
    .btn-container.smallscreen {
      display: none;
    }
  }

  @media screen and (min-width: 1000px) {
    .toggle-btn {
      display: none;
    }

    .logo-name,
    .logo,
    .logo-container {
      display: none;
    }
    .username-display {
      display: block;
      font-weight: 600;
      text-transform: capitalize;
    }
    .nav-container {
      padding: 0 2em;
      gap: 1em;
    }
  }
`;
export default Wrapper;
