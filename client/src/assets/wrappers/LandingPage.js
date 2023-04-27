import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  header {
    z-index: 1000;
    position: sticky;
    top: -2px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  nav {
    margin: 0 auto;
    max-width: 95%;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: transparent !important;
  }
  .left-nav {
    margin-right: auto;
  }

  .logo-container {
    background-color: transparent;
    padding: 0;
    height: 2em;
    width: 14em;
    & .logo {
      margin-right: 0;
      fill: var(--primary);
    }
  }
  .header-fixed {
    left: 0;
    width: 100%;
    box-shadow: 0 7px 6px rgba(0, 0, 0, 0.11);
    background: #fff !important;
  }
  .wrapper {
    max-width: 100vw;
    margin-bottom: 3em;
  }
  .section-container {
    margin: 2em 0;
    padding-right: 10px;
    padding-left: 10px;
    position: relative;
  }
  .banner-container {
    display: block;
  }
  .banner-heading {
    padding-top: 50px;
    text-align: center;
    & h1 {
      font-family: "Inter", sans-serif;
      font-size: 2.5em;
      line-height: 40px;
      font-weight: 700;
      color: black;
      text-transform: none;
      & .gradient-text {
        background: linear-gradient(91.42deg, #2b56f3 18.38%, #a505d8 62.2%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .banner-text {
    margin: 25px auto;
    width: 75%;
    &:before {
      content: "";
      display: block;
      position: relative;
      margin: 0 auto;
      margin-bottom: 25px;
      width: 92px;
      height: 1.4px;
      background: #000;
    }
  }
  .banner-img {
    display: block;
    width: 90%;
    padding-bottom: 3em;
    padding-top: 3em;
    & img {
      width: 100%;
      z-index: 100;
      position: relative;
    }
  }
  footer {
    background-color: var(--blue-700);
    margin-top: 3em;
    height: 3em;
    color: var(--grey-400);
    margin-top: auto;
  }

  @media (min-width: 1000px) {
    .wrapper {
      &:after {
        content: " ";
        height: 99vh;
        position: absolute;
        top: 0;
        right: 0;
        width: 40vw;
        background-color: #e5ffff;
        z-index: 0;
      }
    }
    .section-container {
      max-width: 1616px;
      margin: 5em auto;
      padding-right: 3em;
      padding-left: 3em;
    }
    .banner-container {
      display: flex;
    }
    .banner-heading {
      text-align: center;
      width: 57%;
      z-index: 10;
      & h1 {
        font-size: 5em;
        line-height: 65px;
      }
    }
    .banner-img {
      width: 60%;
      & img {
        transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0)
          scaleX(1.1) scaleY(1.1);
      }
    }
    .banner-text {
      width: 100%;
      font-size: 20px;
    }
  }
`;
export default Wrapper;
