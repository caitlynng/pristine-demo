import styled, { css } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 2em;
  cursor: pointer;
  padding: 2em;

  .icon-container {
    display: none;
  }
  .stats-content-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .amount {
    font-weight: 700;
    font-size: calc(12px + 3vw);
    color: var(--grey-500);
    margin-top: auto;
  }
  .subtitle {
    font-size: 1em;
    color: var(--grey-600);
  }
  @media screen and (min-width: 1000px) {
    align-items: center;
    .icon-container {
      display: inline-block;
      width: 23%;
      height: 4em;
      background: var(--grey-300);
      padding: 1em;
      border-radius: 1.5em;

      & svg {
        color: var(--grey-600);
        height: 100%;
        width: 100%;
      }
    }
    .amount {
      font-size: calc(12px + 1vw);
    }
    ${({ isActive }) =>
      isActive &&
      css`
        border-radius: 1em;
        .icon-container {
          background-color: var(--gold-light);
          /* svg {
            color: var(--gold-light);
          } */
        }
      `}
  }
  @media screen and (min-width: 1500px) {
    .icon-container {
      height: 4.5em;
    }
  }
`;

export default Wrapper;
