import styled, { css } from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  background: var(--white);
  border-radius: 1.625em;
  margin: 0.5em;
  position: relative;
  cursor: pointer;

  .form-label-container {
    display: flex;
    align-items: center;
    padding: 5px 20px;
  }
  .form-label {
    text-transform: capitalize;
    padding-left: 10px;
    cursor: pointer;
  }

  .form-dropdown-icon {
    padding: 0 5px;
    font-size: 1.5em;
    display: flex;
    align-items: center;
  }
  .form-dropdown-content {
    margin-top: 10px;
    overflow-y: auto;
    padding: 15px 20px;
    position: absolute;
    cursor: pointer;
    transition: all 0.5s;
    z-index: 20;
    min-width: 10em;
    max-height: 15em;

    border-radius: 5px;
    border: var(--border);
    box-shadow: var(--shadow-dark);
    background: white;
    & > li {
      display: flex;
      gap: 10px;
      margin: 10px 0;
      & * {
        cursor: pointer;
      }
    }
  }

  ${({ isFilter }) => (isFilter ? selectedFilter : noneSelectedFilter)}

  @media screen and (min-width: 1000px) {
  }
`;
const selectedFilter = css`
  border: 1px solid var(--grey-800);
  .form-subtitle,
  .form-dropdown-icon,
  .form-label {
    color: var(--grey-800);
  }
`;
const noneSelectedFilter = css`
  border: 1px solid #dadce0;
  .form-subtitle,
  .form-dropdown-icon,
  .form-label {
    color: var(--grey-500);
  }
`;
export default Wrapper;
