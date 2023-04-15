import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: none;
  &.active {
    display: block;
    width: 100%;
  }
  .search-form {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    position: relative;
  }
  .search-input {
    width: 100%;
    height: 2.5em;
    background-color: transparent;
    outline: none;
    border: var(--border);
    border-radius: 1.625em;
    padding: 0 3.5em 0 1.5em;
    font-size: 1em;
    &:focus {
      border: 2px solid var(--grey-100);
      box-shadow: var(--shadow-light);
      transition: 0.35s ease;
      &::placeholder {
        transition: opacity 0.45s ease;
        opacity: 0;
      }
    }
  }
  .search-autocomplete {
    position: absolute;
    top: 4em;
    width: 80%;
    background-color: white;
    border-radius: 5px;
    max-height: 15em;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: var(--shadow-dark);
    z-index: 2;
    padding: 1em 0;
    & > li {
      line-height: 2;
      padding: 0 1.5em;
      cursor: pointer;
      color: black;
    }
  }
  input[type="search"]::-webkit-search-cancel-button {
    display: none;
  }
  .clear-search-icon {
    right: 2.5em;
    top: 10px;
    position: absolute;
    background: transparent;
    color: var(--grey-500);
    cursor: pointer;
    & > svg {
      font-size: 15px;
    }
    &:hover,
    &:focus {
      color: var(--grey-600);
    }
  }
  @media screen and (min-width: 499px) {
    margin-left: auto;
    display: block;
    .search-form {
      width: calc(100vw / 2.5);
    }
    .search-autocomplete {
      width: calc(100vw / 2.5);
    }
    .search-input {
      &:focus,
      &:hover {
        border: 1px solid var(--grey-600);
      }
    }
    .search-autocomplete {
      & > li:hover {
        background-color: var(--grey-300);
      }
    }
  }
  @media screen and (min-width: 1000px) {
    margin-left: 0;
    margin-right: auto;
    .search-form {
      width: calc(100vw / 4);
    }
    .search-autocomplete {
      width: calc(100vw / 4);
    }
    /* margin-right: auto;
    .search-form {
      width: calc(100vw / 4);
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
    }
    .search-input {
      width: 100%;
      height: 2.5em;
      background-color: transparent;
      outline: none;
      border: var(--border);
      border-radius: 1.625em;
      padding: 0 3.5em 0 1.5em;
      font-size: 1em;
      &:focus, &:hover {
        border: 1px solid var(--grey-600);
        transition: 0.35s ease;
        background: transparent;
        box-shadow: var(--shadow-light);

        &::placeholder {
          transition: opacity 0.45s ease;
          opacity: 0;
        }
      }
    }
    .search-autocomplete {
      position: absolute;
      top: 3.5em;
      width: calc(100vw / 4);
      background-color: white;
      border-radius: 5px;
      max-height: 15em;
      overflow-y: auto;
      overflow-x: hidden;
      box-shadow: var(--shadow-dark);
      z-index: 2;
      padding: 1em 0;
       & > li {
        line-height: 2;
        padding: 0 1.5em;
        cursor: pointer;
       }
       & > li:hover {
        background-color: var(--grey-300);
       }
    }
    input[type="search"]::-webkit-search-cancel-button {
      display: none;
    }
    .clear-search-icon {
      right: 2.5em;
      top: 10px;
      position: absolute;
      background: transparent;
      color: var(--grey-500);
      cursor: pointer;
      & > svg {
        font-size: 15px;
      }
      &:hover, &:focus {
        color: var(--grey-600)
      }
    } */
  }
`;
