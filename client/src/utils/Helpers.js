import { useState, useEffect, useRef, useLayoutEffect } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import {
  differenceInCalendarMonths,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  format,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  isEqual,
  getWeek,
  getMonth,
  subDays,
} from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

export const getIndexIfSameDate = (obj, date, type) => {
  if (type === "month") {
    return obj.findIndex((i) => isEqual(i, getMonth(date) + 1));
  }
  // const formatedDate = format(date, "yyyy-MM-dd");
  const dateToUTC = zonedTimeToUtc(date, "UTC").toISOString();
  return obj.findIndex((i) => i === dateToUTC);
};
export const getDatesBetween = (startDate, endDate) => {
  return eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });
};
export const getMonthsBetween = (startDate, endDate) => {
  return eachMonthOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });
};
export const getYearsBetween = (startDate, endDate) => {
  return eachYearOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });
};

export const isNameValid = (name) => {
  let message = [];

  if (!/^[a-zA-Z ]+$/.test(name)) {
    message.push("Name should include only A-Z (a-z) letters");
  }
  if (name.length <= 3 || name.length >= 20) {
    message.push("Name should be between 3 to 20 characters");
  }
  return message;
};
export const isRequired = (val) => {
  let isValid = val !== null && val !== undefined && val !== "";
  if (!isValid) {
    return `This field is required`;
  }
};
export const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isValid = re.test(String(email).toLowerCase());
  if (!isValid) return "Email is invalid (e.g: example@mail.com)";
};

export const isPWValid = (val) => {
  let message = [];
  if (val.length <= 8 || val.length >= 20) {
    message.push("Between 8 to 20 characters");
  }
  if (!/[A-Z]+/.test(val)) {
    message.push("One UPPERCASE letter");
  }

  if (!/[a-z]+/.test(val)) {
    message.push("One lowercase letter");
  }
  if (!/[0-9]+/.test(val)) {
    message.push("One number (0-9)");
  }
  if (!/[^A-Za-z0-9]+/.test(val)) {
    message.push("One special symbol (@ $ ! % * ? &)");
  }
  return message;
};

export const isRetypePWValid = (cpw, pw) => {
  if (cpw !== pw) {
    return "Password do not match";
  }
};

export const getUniqueValues = (obj, key) => {
  let noWhiteSpaceKey = removeWhiteSpace(key);
  return [
    ...new Set(
      obj.map((item) => item[noWhiteSpaceKey]).filter((i) => i !== undefined)
    ),
  ]
    .sort()
    .reduce((o, key) => Object.assign(o, { [key]: key }), {});
}; //https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
export const removeWhiteSpace = (word) => {
  return word.replace(/\/|\s/g, "").trim();
};
export const useClickOutsideComponent = (ref, setIsActive) => {
  //https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsActive(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export const GetSize = () => {
  //https://stackoverflow.com/questions/73247936/how-to-dynamically-track-width-height-of-div-in-react-js
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  // useRef allows us to "store" the div in a constant,
  // and to access it via ref.current
  const ref = useRef(null);

  const handleElementResized = () => {
    if (ref.current.offsetWidth !== width) {
      setWidth(ref.current.offsetWidth);
    }
    if (ref.current.offsetHeight !== height) {
      setHeight(ref.current.offsetHeight);
    }
  };

  // we also instantiate the resizeObserver and we pass
  // the event handler to the constructor
  const resizeObserver = new ResizeObserver(handleElementResized);

  useEffect(() => {
    // the code in useEffect will be executed when the component
    // has mounted, so we are certain ref.current will contain
    // the div we want to observe
    resizeObserver.observe(ref.current);

    // if useEffect returns a function, it is called right before the
    // component unmounts, so it is the right place to stop observing
    // the div
    return function cleanup() {
      resizeObserver.disconnect();
    };
  });
};

export const useSwiperRef = () => {
  const [wrapper, setWrapper] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    setWrapper(ref.current);
  }, []);

  return [wrapper, ref];
};

export const useDynamicSVGImport = (name) => {
  const ImportedIconRef = useRef();

  useEffect(() => {
    const importIcon = async () => {
      try {
        ImportedIconRef.current = (
          await import(`../assets/images/${name}.svg`)
        ).ReactComponent;
      } catch (err) {
        console.log(err);
      }
    };
    importIcon();
  }, [name]);

  return { SvgIcon: ImportedIconRef.current };
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency", //https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
  currency: "USD",
});

export const addSpaceBeforeEachCapitalLetter = (string) => {
  //https://stackoverflow.com/questions/5582228/insert-space-before-capital-letters
  string = string.replace(/([a-z])([A-Z])/g, "$1 $2");
  string = string.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  return string;
};

export const useElementSize = () => {
  const target = useRef(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const setRoundedSize = ({ width, height }) => {
    setSize({ width: Math.round(width), height: Math.round(height) });
  };

  useLayoutEffect(() => {
    target.current && setRoundedSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => {
    const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
    setRoundedSize({ width, height });
  });

  return [target, size];
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export const getTotalAndTypeOnly = (arr) => {
  return arr.map(({ total, type }) => ({ total, type }));
};

export const isFullMonth = (firstDate, secondDate) => {
  const startDate = new Date(firstDate);
  const endDate = new Date(secondDate);
  return (
    isFirstDayOfMonth(startDate) &&
    isLastDayOfMonth(endDate) &&
    differenceInCalendarMonths(endDate, startDate) === 0
  );
};

export const sessionStorageDate = () => {
  return JSON.parse(sessionStorage.getItem("selectedDate"));
};
export const addUserToLocalStorage = ({ user, token }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const saveDataToSessionStorage = (name, data, options) => {
  if (options) {
    if (options === "push") {
      let item = JSON.parse(sessionStorage.getItem(name));
      if (!item) {
        sessionStorage.setItem(name, JSON.stringify([data]));
      } else {
        console.log(name);
        item.push(data);
        sessionStorage.setItem(name, JSON.stringify(item));
      }
    }
  } else {
    sessionStorage.setItem(name, JSON.stringify(data));
  }
};
export const toLowerCaseAndCompare = (firstW, secondW) => {
  return firstW
    .toString()
    .toLowerCase()
    .startsWith(secondW.toString().toLowerCase());
};
export const getDate = (dates) => {
  // const defaultDate = ["2023/01/01", "2023/01/31"];
  const today = new Date();
  const yesterday = today.setDate(today.getDate() - 1);
  const defaultDate = [subDays(new Date(), 7), yesterday];
  let updatedDates = [];
  if (dates) {
    updatedDates = [
      format(dates[0], "yyyy/MM/dd"),
      format(dates[1], "yyyy/MM/dd"),
    ];
    saveDataToSessionStorage("selectedDate", updatedDates);
  } else if (sessionStorageDate()) {
    updatedDates = sessionStorageDate();
  } else {
    updatedDates = defaultDate;
    saveDataToSessionStorage("selectedDate", defaultDate);
  }
  return updatedDates;
};

export const isValue = (value) => {
  const isNotEmpty =
    value &&
    Object.values(value)
      .map((i) => i.length > 0)
      .filter(Boolean); //filter out falsy values
  if (value && isNotEmpty.length) return value;
  return 0;
};
export const groupedByCategory = (arr) => {
  let incomeTableData = [];
  let total = 0;

  arr.forEach((i) => {
    total += i.Sum;
    let foundCategory = incomeTableData.findIndex(
      (n) => n.category === i.category[0]
    );
    if (foundCategory === -1) {
      incomeTableData.push(createRow(i.category[0], i.Sum, i._id, total));
    } else {
      incomeTableData[foundCategory].total += i.Sum;
      incomeTableData[foundCategory].subRows.push(createSubRow(i._id, i.Sum));
    }
  });

  return { incomeTableData, total };
};

export const getCOGS = (data) => {
  if (data.length > 0) {
    return +getTotalSum(data, "COGSPerDay").toFixed(2);
  }
  return 0;
};
export const addPaypalFeeToIncomeTableData = (obj, totalPaypalFee) => {
  return obj.incomeTableData.findIndex((i) => {
    if (i.category === "Fees") {
      i.total += totalPaypalFee;
      i.subRows.push(createSubRow("Paypal Partner Fees", totalPaypalFee));
    }
  });
};

export const filteredByType = (arr) => {
  return Object.values(
    arr.reduce((acc, curr) => {
      let item = acc[curr.type];
      if (item) {
        item.total += curr.total;
      } else {
        acc[curr.type] = curr;
      }

      return acc;
    }, {})
  );
};

export const createRow = (category, total, type, subRowTotal) => {
  return {
    _id: Math.floor(Math.random() * 200),
    category: category,
    total: total,
    subRows:
      typeof type !== "object"
        ? [createSubRow(type, subRowTotal)]
        : type.map((i) => createSubRow(i.type, i.total)),
  };
};
export const createSubRow = (type, subRowTotal) => {
  return {
    type: type,
    total: subRowTotal,
    _id: Math.floor(Math.random() * 400),
  };
};
export const addNewCategoryToStatementTable = (obj, category, type, total) => {
  obj["total"] += total;
  obj.incomeTableData.push(createRow(category, total, type, total));
  return obj;
};

export const getChartDataAndLabels = (arr) => {
  let result = { data: [], labels: [] };
  arr.map((i) => {
    result.data.push(i.total);
    result.labels.push(i.category);
  });
  return result;
};
export const getTotalSum = (arr, prop) => {
  return arr.reduce(function (a, b) {
    return a + b[prop];
  }, 0);
};
