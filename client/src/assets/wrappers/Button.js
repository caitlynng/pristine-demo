import styled from "styled-components";

const Wrapper = styled.button`
  &.btn {
    cursor: pointer;
    border: transparent;
    padding: 0.375em 1.5em;
    text-transform: capitalize;
    margin: 0 10px;
    height: 100%;
    letter-spacing: 1px;
    height: 2.5em;
    font-size: 1.2em;
    border-radius: 10px;
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
    background-color: var(--blue-700);
    margin-left: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    &:hover {
      background-color: var(--grey-700);
      box-shadow: var(--shadow-dark);
      transition: 0.5s;
    }
    &.small {
      height: 80%;
      width: 40%;
      font-size: 0.9em;
    }
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
      border-right: 3px solid var(--primary);
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
    color: var(--primary);
    font-weight: 600;
    background-color: transparent;
    padding: 0;
  }
  &.contact-btn {
    background-color: black;
    color: white;
    font-weight: 600;
    &:hover {
      background: linear-gradient(90deg,#235af4,#a208d9);
      transition: 0.3s all;
    }
  }
  &.clear-btn {
    background: transparent;
    border: 2px solid black;
    color: black;
    &:hover {
      box-shadow: var(--shadow-dark);
      background: var(--grey-100);
    }
  }
  &.nav-btn {
    color: black;
    letter-spacing: normal;
    &:hover {
      color: var(--primary)
    }
  }
  &.support-btn {
    color: var(--primary);
    text-align: left;
    padding: 7px 16px;
    background-color: #fff;
    border: solid 1px #e1e1e1;
    vertical-align: middle;
    margin: 0 4px 10px;
    cursor: pointer;
    max-width: 97%;
    &:hover {
      border: 1.5px solid;
    }
  }
  @media screen and (min-width: 499px) {
    .icon-btn {
      color: var(--grey-500);
    }
    &:hover .icon-btn,
    &:focus .icon-btn {
      color: var(--grey-700);
    }
  }
`;

export default Wrapper;
