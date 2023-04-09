import styled from "styled-components";

export const Wrapper = styled.div`
  .overview-content-container {
    padding: 1em;
    border-radius: var(--borderRadius);
    background-color: white;
  }
  .overview-header {
    margin: 1em 0;
  }
  .profit-title {
    color: var(--grey-600);
    padding-bottom: 1em;
    display: flex;
    flex-direction: row-reverse;
    align-items: baseline;
    justify-content: start;
    gap: 10px;
  }

  @media screen and (min-width: 1000px) {
    margin-top: auto;
    grid-row: 1/9;
    grid-column: 5/ 7;
    display: flex;
    flex-direction: column;
    border: var(--border);
    border-radius: var(--borderRadius);
    margin-left: 2em;
    padding: 2em;
    height: 93.5%;
    .overview-header {
      display: none;
    }
    .profit-title {
      color: var(--grey-600);
      /* padding-bottom: 1em; */
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid var(--primary-300);
      margin-bottom: 1em;
      gap: 0;
      flex:1;
    }
  }
`;
export const MultiColorBar = styled.div`
  /* width: 80%;
  background: #ffffff;
  padding: 0px;
  border-radius: 30px;
  margin: 50px auto;
  border: 1px solid rgba(0, 0, 0, 0.75);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25),
    inset 0 0 5px rgba(0, 0, 0, 0.3), 0 2px 2px rgba(256, 256, 256, 0.45),
    inset 0 10px 20px rgba(0, 0, 0, 0.15);
  position: relative; */

  /* background: linear-gradient(to left, #f2709c, #ff9472); */

  //https://codepen.io/dennisgabil/pen/vaPxwe
`;
