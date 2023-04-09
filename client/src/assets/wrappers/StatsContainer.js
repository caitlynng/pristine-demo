import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  margin-top: auto;
  height: 75%;
  .swiper {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .swiper-slide {
    background-color: transparent;
   border: var(--border);
    border-radius: var(--borderRadius);
    cursor: pointer;
    display: flex;
    min-height: 100px;
  }

  .swiper-pagination,
  .prev-button,
  .next-button {
    display: none;
  }
  @media screen and (min-width: 1000px) {
    grid-row: 3/5;
    grid-column: 1/5;
    .swiper {
    padding-bottom: 4em;
    }
    .next-button,
    .prev-button {
      position: absolute;
      bottom: 0;
      background: transparent;
      z-index: 20;
      svg {
        font-size: calc(18px + 0.3vw);
        color: var(--grey-600);
      }
    }
    .swiper-pagination {
      bottom: 5% !important;
    }
    .next-button {
      right: 35%;
    }
    .prev-button {
      left: 35%;
    }
    &:hover .swiper-pagination,
    &:hover .prev-button,
    &:hover .next-button {
      display: inline;
    }
  }
  @media (min-width: 1250px) {
  }
`;
export default Wrapper;
