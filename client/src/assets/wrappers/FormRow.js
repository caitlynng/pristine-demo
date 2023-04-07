import styled from "styled-components";

const Wrapper = styled.div`
  /* border-bottom: 1.5px solid var(--grey-200); */
  line-height: 1.5;

  .form-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .form-label {
    text-transform: capitalize;
    font-weight: 600;
    width: 12em;
  }
  .form-input {
    flex: 1;
    height: 40px;
    border: 1px solid var(--grey-200);
    padding: 4px 1em;
    border-radius: 8px;
    background-color: var(--grey-200);
    margin: 1em 0;
    &:focus,
    &:hover {
      background-color: white;
      outline: none;
      border-color: var(--grey-300);
      box-shadow: 0 0 0 4px var(--grey-200);
    }
    &.has-error {
      /* border-color: var(--error-color); */
      box-shadow: 0 0 0 4px var(--error-border);
    }
  }
  .error-message {
    color: var(--error-text);
    font-weight: bold;
    font-size: 0.9em;
    display: block;
    margin-top: 5px;
    padding-left: 15em;
    & span:nth-child(2){
      color: var(--grey-600);
    }
  }
`;

export default Wrapper;
