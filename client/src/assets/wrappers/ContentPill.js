import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  padding: 1em 2em;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  flex: 1;

  ${({ active }) =>
    active
      ? css`
          /* &::before {
            content: "";
            position: absolute;
            background-color: var(--primary-800);
            left: 0px;
            top: 3px;
            bottom: 3px;
            width: 5px;
            border-radius: 0px 6px 6px 0px;
            -webkit-transition: -webkit-transform 150ms ease-in-out 0s;
            -webkit-transition: transform 150ms ease-in-out 0s;
            transition: transform 150ms ease-in-out 0s;
            -webkit-transform: scaleY(1);
            -ms-transform: scaleY(1);
            transform: scaleY(1);
          } */
          & {
            background-color: var(--grey-300);
          }
        `
      : css`
          & {
            border: var(--border);
          }
        `};

  .content-container {
    & .amount {
      padding-right: 1em;
      font-weight: 700;
      font-size: 16px;
      color: var(--grey-600);
      letter-spacing: 1.5px;

      line-height: 1.5;
    }
    & .subtitle {
      /* font-size: 16px; */
    }
  }

  @media (min-width: 370px) {
  }
  @media screen and (min-width: 1000px) {
    padding: 1em;
    .content-container {
      & .amount {
        padding-right: 0;
      }
    }
  }
  /* @media screen and (min-width: 1000px) and (min-height: 1100px) {
    .content-container {
      & .amount {
        padding-right: 1em;
      }
    }
  } */
`;
