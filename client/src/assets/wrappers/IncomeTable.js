import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  margin: 1em 0;
  position: relative;
  z-index: 1;
  background-color: white;
  overflow: auto;

  padding: 2em 1em;
  position: relative;
  .statement-table-container {
    min-width: 40em;
  }
  .statement-table {
    display: grid;
    grid-template-columns: repeat(4, minmax(50px, 1fr));
  }

  .statement-table * {
    padding: 5px 0;
    & .tooltiptext {
      padding: 1em;
      font-style: normal;
    }
  }
  .sub-header {
    font-size: 15px;
  }
  .sub-header-1 {
    grid-column: 3/4;
  }
  .sub-header-2 {
    grid-column: 4/5;
  }
  .title {
    grid-column: 1/5;
    font-size: 18px;
    border-bottom: 2px solid var(--grey-300);
    cursor: pointer;
  }
  .highlight {
    color: var(--primary);
  }
  .border {
    border: var(--border);
  }
  .no-border-left {
    border-left: none;
  }
  .no-border-right {
    border-right: none;
  }
  .col {
    background-color: var(--grey-10);
    margin: 2px 0;
  }
  .col-1 {
    grid-column: 1/3;
    padding-left: 1em;
    cursor: pointer;
  }
  .col-2 {
    grid-column: 3/4;
    padding-left: 1em;
  }
  .col-3 {
    grid-column: 4/5;
  }
  .sub-col {
    padding-left: 2.5em;
  }
  .col-italic {
    font-style: italic;
  }
  .table-title {
    text-align: center;
    padding: 2em 0;
    & p {
      color: var(--grey-300);
      font-style: italic;
      font-weight: 600;
    }
  }

  table thead {
    cursor: pointer;
    text-align: left;
    display: block;
    padding-left: 1.5em;
    line-height: 3em;
    font-size: 16px;
  }

  .firstRow {
    font-weight: 600;
    cursor: pointer;
  }
  .subRows {
    font-style: italic;
    color: var(--grey-500);
    font-size: 12px;
    & td:first-child {
      padding-left: 20px;
    }
  }
  .table-body-containter {
    & tr {
      display: none;
    }
  }

  .table-body-containter.active {
    & tr {
      display: table-row;
    }
  }

  .dashboard-btn {
    height: 3em;
    width: 100%;
    border-radius: 1.5em;
    margin: 2em 0;
  }

  .statements__form {
    padding: 0 0  0 10px;
    & input {
      width: 80%;
      height: 70%;
      text-align: left;
      border: 1px solid var(--grey-300);
      border-radius: 5px;
      padding-left: 5px;
    }
  }
  .user-selection-container {
    grid-column: 1/5;
    width: 95%;
    margin: 1em auto 0;
    padding: 1em;
  }
  .select-btn-container {
    flex-wrap: nowrap;
    max-height: 4em;
    & > * {
      padding: 0.375em 1.5em;
    }
  }
  .statements__btn-container {
    padding: 0
  }
  @media screen and (min-width: 1000px) {
    padding: 3em;
    overflow: hidden;
    .user-selection-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5em;
    }
  }
`;

export const DropDownButton = styled.div`
  display: flex;
  width: 100%;
  .dropdown-icon {
    font-size: 1.5em;
    display: flex;
    align-items: center;
  }
  .category-btn {
    text-transform: capitalize;
  }
  ${({ isFilter }) => (isFilter ? selectedFilter : noneSelectedFilter)}
`;

const selectedFilter = css`
  .dropdown-icon {
    transform: rotate(90deg);
    transition: 0.5s;
  }
  .category-btn,
  .dropdown-icon {
    color: var(--primary);
  }
`;
const noneSelectedFilter = css`
  .dropdown-icon {
    color: var(--blue-700);
    transition: 0.5s;
  }

  .category-btn {
    color: var(--blue-700);
  }
`;
