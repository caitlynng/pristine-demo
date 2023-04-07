import styled from "styled-components";

export const Wrapper = styled.div`
  .fullscreen {
    background-color: white;
  }
  .header-wrapper {
    & .title-wrapper {
      & p {
        font-size: 11px;
      }
    }
    position: relative;
  }
  .chart-container {
    background-color: var(--grey-50);
    border-radius: 10px;
    width: 100%;
    overflow: auto;
  }
  .chart-settings-icon {
    height: 100%;
    font-size: 1.3em;
    display: grid;
    place-items: center;
    color: var(--grey-500);
    cursor: pointer;
    &:hover {
      color: var(--grey-600);
    }
  }
  .full-screen {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: 'white'; */
  }

  .viewby-container {
    display: flex;
    align-items: center;
    padding: 0 0.8em;
    cursor: pointer;
    gap: 3px;

    border-radius: 25px;
    background-color: var(--grey-200);
    &:hover {
      box-shadow: var(--shadow-dark);
    }
    & svg {
      font-size: 18px;
    }
  }
  .no-border {
    text-align: center;
    border: none;
    background: transparent;
    /* text-indent: 1px;
    text-overflow: ""; */
    appearance: none;
    padding: 0;
  }
  .header-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1em 0;
    gap: 10px;
    & .title-wrapper {
      margin-right: auto;
      color: var(--grey-900);
      & p {
        font-size: 13px;
        color: var(--grey-400);
      }
    }
  }

  @media screen and (min-width: 600px) {
  }
  @media screen and (min-width: 1000px) {
    border-radius: 1.75em;
    border-radius: var(--borderRadius);
    border: var(--border);
    grid-row: 5/9;
    grid-column: 1/5;
    width: 100%;
    margin-top: -2em;

    display: flex;
    flex-direction: column;

    .chart-container {
      overflow-y: hidden;
      margin-top: auto;
      background-color: transparent;
    }
    .header-wrapper {
      padding: 1em 2em 1em 1.5em;
      border-bottom: 2px solid var(--grey-200);
    }
  }
`;
export const Toggle = styled.div`
  //https://codepen.io/zbluebugz/pen/pojxLwP
  width: 11rem;
  position: relative;
  display: flex;
  margin-left: auto;
  padding: 0;
  position: relative;
  line-height: 2rem;
  border-radius: 10px 10px 0 0;

  & input {
    visibility: hidden;
    position: absolute;
    top: 0;
  }
  & label {
    width: 50%;
    padding: 0;
    margin: 0;
    text-align: center;
    cursor: pointer;
    color: var(--grey-500);
    font-weight: 600;
  }
  .switch-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    z-index: 3;
    cursor: pointer;
  }
  .switch {
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    height: 100%;
    & div {
      width: 100%;
      text-align: center;
      font-weight: 600;
      opacity: 0;
      display: block;
      color: var(--grey-600);
      /* transition: opacity 0.2s cubic-bezier(0.77, 0, 0.175, 1) 0.125s; */
      /* will-change: opacity; */
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  /* slide the switch box from right to left */
  & input:nth-of-type(1):checked ~ .switch-wrapper {
    transform: translateX(0%);
  }

  /* slide the switch box from left to right */
  & input:nth-of-type(2):checked ~ .switch-wrapper {
    transform: translateX(100%);
  }

  /* toggle the switch box labels - first checkbox:checked - show first switch div */
  & input:nth-of-type(1):checked ~ .switch-wrapper .switch div:nth-of-type(1) {
    opacity: 1;
  }

  /* toggle the switch box labels - second checkbox:checked - show second switch div */
  & input:nth-of-type(2):checked ~ .switch-wrapper .switch div:nth-of-type(2) {
    opacity: 1;
  }
  @media screen and (min-width: 1000px) {
  }
`;

// export const Toggle = styled.div`
//   //https://codepen.io/zbluebugz/pen/pojxLwP
//   width: 11rem;
//   position: relative;
//   display: flex;
//   margin-left: auto;
//   padding: 0;
//   position: relative;
//   line-height: 2rem;
//   border-radius: 10px 10px 0 0;

//   & input {
//     visibility: hidden;
//     position: absolute;
//     top: 0;
//   }
//   & label {
//     width: 50%;
//     padding: 0;
//     margin: 0;
//     text-align: center;
//     cursor: pointer;
//     color: var(--primary-1000);
//   }
//   .switch-wrapper {
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     width: 50%;
//     z-index: 3;
//     transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
//     transition: transform 0.5s;
//   }
//   .switch {
//     border-top-left-radius: 1em;
//     border-top-right-radius: 1em;
//     height: 100%;
//     border-bottom: 32px solid white;
//     & div {
//       width: 100%;
//       text-align: center;
//       font-weight: 600;
//       opacity: 0;
//       display: block;
//       color: var(--grey-500);
//       transition: opacity 0.2s cubic-bezier(0.77, 0, 0.175, 1) 0.125s;
//       will-change: opacity;
//       position: absolute;
//       top: 0;
//       left: 0;
//     }
//   }
//   /* slide the switch box from right to left */
//   & input:nth-of-type(1):checked ~ .switch-wrapper {
//     transform: translateX(0%);
//   }

//   /* slide the switch box from left to right */
//   & input:nth-of-type(2):checked ~ .switch-wrapper {
//     transform: translateX(100%);
//   }

//   /* toggle the switch box labels - first checkbox:checked - show first switch div */
//   & input:nth-of-type(1):checked ~ .switch-wrapper .switch div:nth-of-type(1) {
//     opacity: 1;
//   }

//   /* toggle the switch box labels - second checkbox:checked - show second switch div */
//   & input:nth-of-type(2):checked ~ .switch-wrapper .switch div:nth-of-type(2) {
//     opacity: 1;
//   }
//   @media screen and (min-width: 1000px) {
//     border-radius: 3rem;
//     background: var(--primary-400);
//     margin: 0;
//     border-radius: 3rem;
//     & label {
//       color: var(--primary-1000);
//     }
//     .switch {
//       border-radius: 3rem;
//       background: var(--primary-1000);
//       height: 100%;
//       border: none;
//       & div {
//         color: white;
//       }
//     }
//     .switch-wrapper {
//       padding: 0.15rem;

//     }
//   }
// `;
