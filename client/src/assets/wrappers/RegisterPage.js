import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  height: 100vh;
  overflow: hidden;
  .right-panel {
    flex: 1;
  }
  .right-panel-container {
    height: 100%;
    max-width: 50em;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-800);
    cursor: pointer;
  }
  @media screen and (min-width: 1000px) {
    .left-panel {
      flex-grow: 0;
      width: 514px;
      background-color: grey;
    }
  }
`;
export default Wrapper
