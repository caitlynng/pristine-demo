import { isFirstDayOfMonth, isLastDayOfMonth } from "date-fns";

export const isFirstAndLastDayOfMonth = (firstDate, secondDate) => {
  const startDate = new Date(firstDate);
  const endDate = new Date(secondDate);
  return isFirstDayOfMonth(startDate) && isLastDayOfMonth(endDate);
};

export const getTotalSum = (arr, prop) => {
  return arr.reduce(function (a, b) {
    return a + b[prop];
  }, 0);
};

//https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const getDates = (startDate, endDate) => {
  let dateArray = new Array();
  let currentDate = new Date(startDate);
  let stopDate = new Date(endDate);
  //work when changing the clocks (summer to winter)
  while (currentDate.setHours(0, 0, 0) <= stopDate.setHours(0, 0, 0)) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
};

export const addSpaceBeforeEachCapitalLetter = (string) => {
  //https://stackoverflow.com/questions/5582228/insert-space-before-capital-letters
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
  return string;
};

export const removeWhiteSpace = (word) => {
  return word.replace(/\/|\s/g, "").trim()
}

export const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isPWValid = (val) => {
  return (
    val.length >= 8 &&
    val.length <= 20 &&
    /[A-Z]+/.test(val) &&
    /[a-z]+/.test(val) &&
    /[0-9]+/.test(val) &&
    /[^A-Za-z0-9]+/.test(val)
  );
};

export const isRetypePWValid = (cpw, pw) => cpw !== pw;

export const extract = ({ name, email }) => ({ name, email });

export const isNameValid = (name) => {
 return /^[a-zA-Z]+$/.test(name) && name.length >= 3 && name.length <= 20 
};