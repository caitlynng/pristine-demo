import styled from "styled-components";

const Wrapper = styled.div`
  height: 200vh;
  font-size: 16px;
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
    font-size: 15px;
    margin: 25px auto;
    width: 75%;
  }
  .banner-img {
    display: none;
  }
  .functions-container {
    box-shadow: var(--shadow-dark);
    padding: 2em;
    border-radius: 1em;
    line-height: 2em;
    z-index: 1;
    background-color: white;
    position: relative;
    text-align: center;
  }
  .cubicle {
    flex: 1;
    text-align: center;
    & p {
      margin-top: 1em;
    }
  }
  .functions-content {
    margin: 4em 2em;
    gap: 6em;
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
        background-color: #eef5ff;
        z-index: 0;
      }
    }
    .section-container {
      max-width: 1616px;
      margin: 0 auto;
    }
    .banner-container {
      display: flex;
    }
    .banner-heading {
      text-align: left;
      width: 40%;
      & h1 {
        font-size: 3em;
        line-height: 55px;
      }
    }
    .banner-img {
      display: block;
      width: 50%;
      padding-bottom: 9em;
      padding-top: 7em;
      & img {
        width: 100%;
        z-index: 100;
        position: relative;
        border: 3px solid black;
        border-top-width: 1.75em;
        border-radius: 10px;
      }
    }
    .banner-text {
      width: 100%;
      font-size: 20px;
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
    .functions-container {
      width: 80%;
    }
    .functions-content {
      flex-direction: row;
    }
  }
`;
export default Wrapper;
