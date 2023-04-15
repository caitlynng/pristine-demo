import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  gap: 1em;
  padding: 1em;

  .banner-container {
    display: none;
  }
  @media screen and (min-width: 1000px) {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(8, 1fr);
    max-height: calc(100vh - var(--nav-height));
    min-height: 900px;
    height: 95%;
    padding: 2em;

    .analytics__date-picker-container {
      justify-self: end;
      grid-row: 1;
      grid-column: 4/5;
    }
    .analytics__page-header {
      grid-row: 1;
      grid-column: 1/7;
      margin: 0;
    }
    .banner-container {
      grid-row: 1/3;
      grid-column: 1/5;
      height: 73%;
      display: flex;
      margin-top: auto;
      & .banner-content {
        flex: 1;
        padding: 1.5em;
        line-height:1.7;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
      }
      & svg {
        height: 100%;
        flex: 1;
      }
    }
  }
`;
export default Wrapper;
