import styled from 'styled-components'

const Wrapper = styled.aside`
  .small-sidebar-container {
    position: fixed;
    background: rgba(0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 0.5s;
    width: 0;
    left: -150px;
    z-index: 99;
  }
  .show-sidebar {
    opacity: 1;
    width: 100%;
    left: 0;
  }

  .content {
    background: var(--white);
    height: 100vh;
    width: 100%;
    /* border-radius: var(--borderRadius); */
    padding: 6em 2em;
    /* position: relative; */
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 22px;
    right: 20px;
    background: transparent;
    border-color: transparent;
    font-size: 1.5em;
    color: var(--grey-100);
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2em;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-400);
    padding: 1em 0;
    text-transform: capitalize;
    transition: var(--transition);
    text-decoration: none;
  }
  .icon {
    font-size: 1.5em;
    margin-right: 1.5em;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active,
  .active .icon {
    color: var(--gold-light);
    font-weight: 600;
  }
  .nav-link:hover {
    color: var(--grey-200);
  }
  @media (min-width: 400px) {
    .show-sidebar {
      width: var(--smallSidebar-width);
    }
  }

  @media screen and (min-width: 1000px) {
    display: none;
  }
`;
export default Wrapper
