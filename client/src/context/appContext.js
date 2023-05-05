import React, { useReducer, useContext } from "react";
import {
  sessionStorageDate,
  getDate,
  groupedByCategory,
  addNewCategoryToStatementTable,
  addPaypalFeeToIncomeTableData,
  getChartDataAndLabels,
  isValue,
  getDatesBetween,
  getIndexIfSameDate,
  getMonthsBetween,
  getWeeksBetween,
} from "../utils/Helpers";

import { differenceInWeeks, startOfWeek } from "date-fns";

import reducer from "./reducer";
import axios from "axios";

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  TOGGLE_SIDEBAR,
  LOADING_BEGIN,
  GET_REPORT_SUCCESS,
  SHOW_STATS_SUCCESS,
  HANDLE_DATE_CHANGE,
  HANDLE_SCREEN_RESIZE,
  HANDLE_SEARCH_TO_REPORT,
  MANAGE_UPLOADS_SUCCESS,
  LOADING_ERROR,
  SHOW_DEMO_MESSAGE,
  CLOSE_DEMO_MESSAGE,
} from "./actions";
import {
  differenceInCalendarDays,
  differenceInMonths,
  isEqual,
} from "date-fns";


export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  demoMessage: false,
  showSidebar: false,
  screenSize: 0,

  noData: false,

  //report
  reportData: [],
  activeHeaders: [],
  filterHeaders: [],
  defaultHeaders: [],
  isCheckedHeaders: [],
  isBack: false,

  //dashboard
  dashboardDate: [],
  dashboardStats_Sales: [],
  dashboardTable_TotalSales: 0,
  dashboardTable_TotalExpenses: 0,
  dashboardTable_TotalProfits: 0,
  dashboardLineChart_Date: [],
  dashboardLineChart_SalesData: [],
  dashboardLineChart_ExpensesData: [],
  dashboardDoughnutChart_SalesData: {},
  dashboardDoughnutChart_ExpensesData: {},
  monthsDuration: 0,
  weeksDuration: 0,

  //statements
  statementTable_ExpensesData: [],
  statementTable_SalesData: [],
  cogs: 0,
  //uploads
  fileType: ["Paypal transaction reports", "Shipping reports"],
  shippingCompany: ["Pirate", "Fedex", "USPS", "UPS"],

  //settings
  uploads: [],

  //demo popup
  defaultDemoText: "",
  callbackBtnText: "",
  closeBtnText: "",
  callbackDemo: "",
  demoContent: ""
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios
  const axiosFetch = axios.create({
    baseURL: "/api/v1/demo",
  });
  //axios interceptor to control error response
  axiosFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      return Promise.reject(error);
    }
  );

  const showDemoMessage = ({
    callback,
    defaultText,
    callbackBtnText,
    closeBtnText,
    demoContent
  }) => {
    dispatch({
      type: SHOW_DEMO_MESSAGE,
      payload: {
        defaultDemoText: defaultText ?? "This is only a demo version. Please register for a full version to use all the features.",
        callbackDemo: callback ?? undefined,
        callbackBtnText: callbackBtnText ?? null,
        closeBtnText: closeBtnText ?? "Got it",
        demoContent: demoContent
      },
    });
  };
  const closeDemoMessage = () => {
    dispatch({ type: CLOSE_DEMO_MESSAGE });
  };
  const getAPISuggestions = async (query) => {
    const { data } = await axiosFetch.post("/autocomplete", {
      query,
    });
    return data.result;
  };
  const handleSearchResults = async (query) => {
    if (query) {
      dispatch({ type: LOADING_BEGIN });
      try {
        const { data } = await axiosFetch.post("/search", {
          query,
        });

        // const dataWithScoreGT1 = data.result.filter((i) => {
        //   if (i.score >= 1) return i;
        // });
        console.log(data.result);
        dispatch({
          type: HANDLE_SEARCH_TO_REPORT,
          payload: {
            reportData: data.result,
          },
        });
      } catch (error) {
        dispatch({
          type: LOADING_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  };

  const handleDateChange = (dates) => {
    const inputDate = getDate(dates);
    showStats(inputDate);
    getReport();
    const formatedDate = [new Date(inputDate[0]), new Date(inputDate[1])];

    dispatch({
      type: HANDLE_DATE_CHANGE,
      payload: {
        formatedDate,
      },
    });
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 5000);
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const handleScreenResize = (screenSize) => {
    dispatch({ type: HANDLE_SCREEN_RESIZE, payload: screenSize });
  };

  const manageUpload = async () => {
    dispatch({ type: LOADING_BEGIN });
    try {
      const { data } = await axiosFetch.get("/settings/manage-upload");

      let result = data.uploads.length > 0 ? data.uploads : [];
      dispatch({
        type: MANAGE_UPLOADS_SUCCESS,
        payload: {
          uploads: result,
        },
      });
    } catch (error) {
      dispatch({
        type: LOADING_ERROR,
        payload: {
          msg: "There was an error. Please try again later",
        },
      });
    }
    clearAlert();
  };

  const getReport = async () => {
    dispatch({ type: LOADING_BEGIN });
    try {
      const dates = sessionStorageDate();
      const { data } = await axiosFetch.post("/reports", {
        dates,
      });

      const reportData = data.result;
      const activeHeaders = data.headers[0].paypalActiveHeaders;
      const filterHeaders = data.headers[0].paypalFilterHeaders;

      dispatch({
        type: GET_REPORT_SUCCESS,
        payload: {
          activeHeaders,
          reportData,
          filterHeaders,
        },
      });
    } catch (error) {
      //if 401 or 500 error, no alert, just log user out
      // logoutUser();
    }
    clearAlert();
  };

  const showStats = async (dates) => {
    dispatch({ type: LOADING_BEGIN });
    try {
      const datesDuration =
        differenceInCalendarDays(new Date(dates[1]), new Date(dates[0])) + 1;

      const today = new Date();
      const yesterday = today.setDate(today.getDate() - 1);
      //prepare line chart data
      const monthsDuration =
        differenceInMonths(new Date(dates[1]), new Date(dates[0])) + 1;
      const weeksDuration =
        differenceInWeeks(
          new Date(dates[1]),
          startOfWeek(new Date(dates[0]), { weekStartsOn: 0 })
        ) + 1;

      const { data } = await axiosFetch.post("/analytics", {
        yesterday,
        dates,
      });
      console.log(data);

      let expensesData = isValue(data.expenses[0]);
      let salesData = isValue(data.sales[0]);
      let shippingData = isValue(data.shippings[0]);

      if (expensesData === 0 && salesData === 0) {
        dispatch({
          type: LOADING_ERROR,
          payload: {
            msg: `No records to display`,
          },
        });
        return;
      }

      //prepare stats container data
      const expensesStats = expensesData?.refunds;
      const salesStats = salesData?.groupByStats[0];
      const stats = {
        ...(salesStats ? { ...salesStats } : {}),
        ...(expensesStats ? { ...expensesStats } : {}),
      };

      //Statements Table data
      const statementsTable__sales = groupedByCategory(salesData?.groupByType);
      let statementsTable__expenses = groupedByCategory(
        expensesData?.groupByType
      );

      const datesArr = ((startD, endD) => {
        let dates = { day: [], week: [], month: [], year: [] };

        if (monthsDuration >= 2) {
          dates.month.push(...getMonthsBetween(startD, endD));
        }
        if (weeksDuration >= 2) {
          dates.week.push(...getWeeksBetween(startD, endD));
        }
        dates.day.push(...getDatesBetween(startD, endD));
        return dates;
      })(dates[0], dates[1]);

      console.log(datesArr);
      let cogs = statementsTable__sales.total
        ? statementsTable__sales.total * 0.15
        : 0;

      let final_expensesLineChart_data = {
        day: [],
        week: [],
        month: [],
      };
      let final_salesLineChart_data = {
        day: [],
        week: [],
        month: [],
      };
      function getExpensesAddOn(duration) {
        return (
          (cogs && cogs / duration) +
          (salesData?.groupByStats[0].fees &&
            salesData?.groupByStats[0].fees / duration)
        );
      }
      if (datesArr) {
        for (const dateType in datesArr) {
          if (datesArr[dateType].length) {
            const expensesAddedOn =
              dateType === "week"
                ? getExpensesAddOn(weeksDuration)
                : dateType === "month"
                ? getExpensesAddOn(monthsDuration)
                : getExpensesAddOn(datesDuration);
            datesArr[dateType].forEach((d) => {
              let exp_ind = getIndexIfSameDate(
                expensesData[dateType][0].labels,
                d,
                dateType
              );
              let sales_ind = getIndexIfSameDate(
                salesData[dateType][0].labels,
                d,
                dateType
              );

              if (exp_ind > -1) {
                final_expensesLineChart_data[dateType].push(
                  expensesData[dateType][0].data[exp_ind] + expensesAddedOn
                );
              } else {
                final_expensesLineChart_data[dateType].push(expensesAddedOn);
              }

              if (sales_ind > -1) {
                final_salesLineChart_data[dateType].push(
                  salesData[dateType][0].data[sales_ind]
                );
              } else {
                final_salesLineChart_data[dateType].push(0);
              }
            });
          }
        }
      }

      // console.log(final_expensesLineChart_data);

      //add shipping cost to Statement Table
      if (shippingData && shippingData !== 0) {
        statementsTable__expenses = addNewCategoryToStatementTable(
          statementsTable__expenses,
          "Third-party Shipping",
          shippingData.groupByCompany,
          shippingData.total[0].sum
        );
        //add shipping cost to Line chart expenses
        datesArr.day.forEach((date) => {
          const ind = shippingData.groupByDay.findIndex((i) =>
            isEqual(new Date(i._id), date)
          );
          if (ind > -1) {
            final_expensesLineChart_data[ind] +=
              shippingData.groupByDate[ind].total;
          }
        });
      }
      //add COGS
      if (cogs || cogs === 0) {
        cogs = +cogs.toFixed(2);
        statementsTable__expenses = addNewCategoryToStatementTable(
          statementsTable__expenses,
          "Direct Material Cost",
          "Estimated Cost",
          cogs
        );
      }
      //paypal fees are categorized as "Credit" under "Express Checkout Payment"
      //so need to swap them out to put them under Expense, Partner fees
      addPaypalFeeToIncomeTableData(
        statementsTable__expenses,
        salesData?.groupByStats[0].fees
      );

      //Doughnut Chart Data
      const doughnutChartData__sales = getChartDataAndLabels(
        statementsTable__sales?.incomeTableData
      );
      const doughnutChartData__expenses = getChartDataAndLabels(
        statementsTable__expenses?.incomeTableData
      );
      //profit
      const totalProfits =
        statementsTable__sales?.total - statementsTable__expenses?.total;
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          dashboardTable_TotalSales: statementsTable__sales.total,
          dashboardTable_TotalExpenses: statementsTable__expenses.total,
          dashboardTable_TotalProfits: totalProfits,

          dashboardStats_Sales: stats,

          dashboardLineChart_Date: datesArr,
          dashboardLineChart_SalesData: final_salesLineChart_data,
          dashboardLineChart_ExpensesData: final_expensesLineChart_data,

          dashboardDoughnutChart_SalesData: doughnutChartData__sales,
          dashboardDoughnutChart_ExpensesData: doughnutChartData__expenses,

          statementTable_SalesData: statementsTable__sales.incomeTableData,
          statementTable_ExpensesData:
            statementsTable__expenses.incomeTableData,

          cogs: cogs,
          monthsDuration: monthsDuration,
          weeksDuration: weeksDuration
        },
      });
    } catch (error) {
      let msg = error.response.data;
      console.log(error.response.data);

      dispatch({
        type: LOADING_ERROR,
        payload: {
          msg: `${msg ? msg : "There was an error. Try again later"}`,
        },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        toggleSidebar,
        getReport,
        showStats,
        handleDateChange,
        handleScreenResize,
        getAPISuggestions,
        handleSearchResults,
        showDemoMessage,
        closeDemoMessage,
        manageUpload,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
