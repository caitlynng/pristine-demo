import styled from "styled-components";

const Wrapper = styled.section`
  margin: 0 auto;

  .page {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .type-selection-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 3em;
    flex-wrap: wrap;
    margin-top: 1em;
  }
  .form-file-upload {
    height: 20em;
    text-align: center;
    position: relative;
    transition: var(--transition);
  }

  .input-file-upload {
    display: none;
  }

  .upload-icon {
    font-size: 5em;
    color: var(--grey-600);
  }
  .form-file-upload label {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-radius: 1em;
    border-style: dashed;
    border-color: #cbd5e1;
    background-color: white;
  }

  .form-file-upload label p {
    font-size: 1.3em;
    font-weight: 600;
    color: var(--grey-400);
    margin: 0;
  }

  .form-file-upload label.drag-active {
    background-color: #ffffff;
  }

  #drag-file-element {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1em;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
`;
export default Wrapper;
