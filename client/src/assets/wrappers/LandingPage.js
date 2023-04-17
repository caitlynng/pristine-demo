import styled from "styled-components";

const Wrapper = styled.div`
  height: 200vh;
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
  .logo-container {
      margin-right: auto;
      background-color: transparent;
      padding: 0;
      height: 3em;
      width: 14em;
      & .logo {
        margin-right: 0;
        fill: var(--primary)
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
  }
  .section-container {
    max-width: 1616px;
    margin: 0 auto;
    padding-right: 25px;
    padding-left: 25px;
    position: relative;
  }
  .banner-container {
    display: block;
  }
  .banner-heading {
    padding-top: 50px;
    padding-right: 10px;
    text-align: center;
    & h1 {
      font-family: "Inter", sans-serif;
      font-size: 3em;
      line-height: 65px;
      color: black;
      font-weight: 700;
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
      font-size: 20px;
      margin: 25px auto;
      width: 75%;
    }
  .banner-img {
    display: none;
  }
  @media (min-width: 1000px) {
    .wrapper {
      &:after {
        content: " ";
        height: 100vh;
        position: absolute;
        top: 0;
        right: 0;
        width: 40vw;
        background-color: #eef5ff;
        z-index: 0;
      }
    }
    .banner-container {
      display: flex;
    }
    .banner-heading {
      text-align: left;
      width: 40%;
    }
    .banner-img {
      display: block;
      width: 50%;
      padding-bottom: 90px;
      padding-top: 60px;
      & img {
        width: 100%;
        z-index: 100;
        position: relative;
      }
    }
    .banner-text {
      width: 100%;
      &:before {
        content: "";
        display: block;
        position: relative;
        margin-bottom: 25px;
        width: 92px;
        height: 1.4px;
        background: #000;
      }
    }
  }
`;
export default Wrapper;
