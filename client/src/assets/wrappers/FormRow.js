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
    border: 1px solid var(--grey-200);
    padding: 4px 1em;
    border-radius: 8px;
    background-color: var(--grey-200);
    margin: 1em 0;
    min-width: 100%;
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
  .form-input.input-height,
  .form-input.text-height,
  .form-input.email-height,
  .form-input.password-height {
    height: 40px;
  }
  .form-input.textarea-height {
    height: 80px;
  }
  .error-message {
    color: var(--error-text);
    font-weight: bold;
    font-size: 0.9em;
    display: block;
    margin-top: 5px;
    & span:nth-child(2) {
      color: var(--grey-600);
    }
  }
  @media screen and (min-width: 1000px) {
    .error-message {
      padding: 1em;
      margin: 0 2em;
      background-color: #f8d7daa9;
    }
  }
`;

export default Wrapper;
