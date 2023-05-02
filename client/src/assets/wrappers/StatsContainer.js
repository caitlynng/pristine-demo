import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  .swiper {
    width: 100%;
    height: 100%;
    background-color: transparent;
    padding: 1em;
  }
  .swiper-slide {
    background-color: transparent;
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

    .swiper {
      padding: 1em 0;
    }
    .next-button,
    .prev-button {
      position: absolute;
      bottom: 0;
      background: transparent;
      z-index: 20;
      border: none;
      svg {
        font-size: calc(18px + 0.3vw);
        color: var(--grey-600);
      }
    }
    .swiper-pagination {
      bottom: 15% !important;
    }
    .next-button {
      right: 35%;
      bottom: 13%;
    }
    .prev-button {
      left: 35%;
      bottom: 13%;
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
