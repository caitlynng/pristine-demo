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
          & {
            background-color: var(--blue-700);
            color: var(--grey-200);
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
    max-height: 7em;
    .content-container {
      & .amount {
        padding-right: 0;
      }
    }
  }
  @media screen and (min-width: 1000px) and (min-height: 1100px) {
    padding: 2em 1em;
    .content-container {
      & .amount {
        padding-right: 1em;
      }
    }
  }
`;
