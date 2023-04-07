import styled from "styled-components";

const Wrapper = styled.button`
  &.btn {
    cursor: pointer;
    border: transparent;
    padding: 0.375em 1.5em;
    box-shadow: var(--shadow-2);
    text-transform: capitalize;
    display: inline-block;
    border-radius: 0.75em;
    margin: 0 10px;
    height: 100%;
    letter-spacing: 1px;
    height: 3em;
  }
  &.btn-danger {
    background: var(--red-light);
    color: var(--red-dark);
  }
  &.btn-danger:hover {
    background: var(--red-dark);
    color: var(--white);
  }
  &.btn-cancel {
    background-color: var(--grey-200);
    color: black;
    border: 1px solid var(--grey-400);
  }
  &.tab-btn {
    top: 2px;
    border-radius: 0;
    padding: 0.375em 0.5em;
    margin: 0 1em;
    background-color: transparent;
    line-height: 2em;
    color: var(--grey-500);
    font-weight: 700;
    transition: 0.25s;
    position: relative; //for :hover to take effect position can't be default (static)
    &:hover {
      color: var(--grey-700);
    }
    &.active {
      font-weight: 700;
      color: var(--grey-700);
      transition: color 0.5s ease-in;
      border-bottom: 2px solid var(--grey-700);
    }
  }
  &.save-btn {
    background-color: white;
    background-color: var(--grey-600);
    margin-left: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 10px;
    &:hover {
      background-color: var(--grey-700);
      box-shadow: var(--shadow-dark);
      transition: 0.5s;
    }
    &.small {
      height: 80%;
      width: 40%;
    }
  }
  &.view-more-btn {
    min-height: 4em;
    background-color: var(--gold-light);
    color: white;
    font-weight: 700;
    letter-spacing: 2px;
    margin: 0;
    width: 100%;
  }
  &.dropdown-btn {
    margin: 0;
    padding: 0.2em 0;
    height: 2em;
    background: transparent;
    border-color: transparent;
    border-radius: 0;
    color: var(--grey-800);
    flex: 1;
    &:hover {
      padding-right: 10px;
      border-right: 3px solid var(--grey-600);
      transition: all 0.3s ease;
    }
  }
  &.search-btn {
    width: 3.5em;
    height: 2em;
    margin: 0;
    margin-left: -3.5em;
    border: none;
    outline: none;
    background: transparent;
  }
  .icon-btn {
    color: var(--grey-100);
  }
  &:hover .icon-btn,
  &:focus .icon-btn {
    color: var(--grey-700);
  }
  &.float-right-btn {
    float: right;
    margin: 1em 0;
  }
  &.select-btn {
    background-color: var(--grey-300);
    &:hover {
      box-shadow: var(--shadow-dark);
    }
  }
  &.disabled {
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.65;
  }

  &.plain-btn {
    cursor: pointer;
    font-size: 1em;
    color: var(--grey-600);
    font-weight: 600;
    background-color: transparent;
    padding: 0;
  }
  @media screen and (min-width: 499px) {
    .icon-btn {
      color: var(--grey-500);
    }
  }
`;

export default Wrapper;
