import styled from "styled-components";

const Wrapper = styled.section`
  /* display: ${(props) => (props.isActive ? "block" : "none")}; */
  margin-bottom: 5em;
  .form-center {
    height: 15em;
    display: flex;
    flex-flow: column nowrap;
    gap: 1em;
    border: var(--border);
    width: 100%;
    max-width: 100%;
    overflow-y: auto;
    background-color: white;
    padding: 1em 2em;
    border-radius: 5px;
    &:hover, &:focus{
      box-shadow: var(--shadow-light);
    }
  }
  .form-items {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 1em;
    & li {
      width: 32%;
      margin: 5px 0;
      display: flex;
      gap: 10px;
      align-items:  baseline;
      & input[type="checkbox"] , label {
        cursor: pointer;
      }
    }
  }
  .header-container {
    display: flex;
    align-items: center;
  }
  @media (min-width: 1000px) {
  }
`;

export default Wrapper;
