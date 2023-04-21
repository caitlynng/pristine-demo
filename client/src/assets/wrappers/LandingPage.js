import styled from "styled-components";

const Wrapper = styled.div`
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
  .section-intro {
    margin: 2em auto;
    text-align: center;
    & p {
      font-size: 18px;
    }
  }
  .section-title {
    color: black;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    & b {
      font-weight: 900;
    }
  }
  .feature-content {
    padding: 1em;
    & h3 {
      font-size: 2em;
      margin-left: 0.5em;
    }
    & svg {
      font-size: 2em;
      fill: #0c8b8d;
    }
    & .fill-none {
      fill: none;
    }
    & .dark {
      color: #773509;
    }
    & .color-2 {
      color: #0c8b8d;
    }
    & .color-3 {
      color: #410497;
    }
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
      /* &:before {
        content: " ";
        height: 50vh;
        position: absolute;
        top: 120vh;
        left: 0;
        width: 100vw;
        background-color: #eef5ff;
        z-index: 0;
        border-bottom-left-radius: 5em;
        border-bottom-right-radius: 5em;
      } */
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
      text-align: left;
      width: 40%;
      & h1 {
        font-size: 3em;
        line-height: 55px;
      }
    }
    .banner-img {
      display: block;
      width: 45%;
      padding-bottom: 3em;
      padding-top: 3em;
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
    .functions-container,
    .feature-content-wrapper {
      width: 90%;
    }
    .bgc-bot {
      background-color: #e5ffff;
      padding-bottom: 7em;
      border-bottom-right-radius: 5em;
      position: relative;
      &:before {
        content: " ";
        height: 15em;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        background-color: white;
        z-index: 0;
      }
    }
    .functions-content {
      flex-direction: row;
    }
    .feature-content-wrapper {
      margin: 7em auto;
    }
    .feature-bg {
      border-radius: 3.2em;
      padding: 3em 1em;
    }
    .bgc-1 {
      background-color: #e5ffff;
    }
    .bgc-2 {
      background-color: #f9f5ff;   
    }
    .feature-img-container {
      &.grid {
        display: grid;
      }
    }
    .feature-content {
      & h3 {
        font-size: 2.5em;
      }
      & svg {
        font-size: 3em;
      }
    }
    .features-item {
      flex-direction: row;
    }
  }
  @media (min-width: 1200px) {
    .feature-content-wrapper {
      flex-direction: row;
    }
    .feature-content {
      &.padding-6 {
        padding-left: 6em;
      }
    }
  }
`;
export default Wrapper;
