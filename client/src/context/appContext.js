import React, { useReducer, useContext } from "react";
import {
  sessionStorageDate,
  getDate,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  saveDataToSessionStorage,
  getCOGS,
  groupedByCategory,
  addNewCategoryToStatementTable,
  addPaypalFeeToIncomeTableData,
  getChartDataAndLabels,
  isValue,
  getUniqueValues,
  removeWhiteSpace,
  toLowerCaseAndCompare,
  addSpaceBeforeEachCapitalLetter,
  getDatesBetween,
  getIndexIfSameDate,
  getMonthsBetween,
  getWeeksBetween,
  getYearsBetween,
} from "../utils/Helpers";

import reducer from "./reducer";
import axios from "axios";


import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  TOGGLE_SIDEBAR,
  LOADING_BEGIN,
  SETUP_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  LOGOUT_USER,
  GET_REPORT_SUCCESS,
  UPLOAD_FILE_SUCCESS,
  UPDATE_COLUMN_HIDDEN,
  SHOW_STATS_SUCCESS,
  HANDLE_DATE_CHANGE,
  HANDLE_ELEMENT_SIZE,
  HANDLE_SCREEN_RESIZE,
  HANDLE_DATA_SUCCESS,
  HANDLE_SEARCH_TO_REPORT,
  MANAGE_UPLOADS_SUCCESS,
  LOADING_ERROR,
} from "./actions";
import {
  differenceInCalendarDays,
  differenceInCalendarYears,
  differenceInMonths,
  isEqual,
} from "date-fns";

const token = "HDJ4567FGH456VBNYT";
// const user = localStorage.getItem("user");

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: true,
  screenSize: 0,

  // user: user ? JSON.parse(user) : null,
  token: token,
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
  yearsDuration: 0,

  //statements
  statementTable_ExpensesData: [],
  statementTable_SalesData: [],
  cogs: 0,
  //uploads
  fileType: ["Paypal transaction reports", "Shipping reports"],
  shippingCompany: ["Pirate", "Fedex", "USPS", "UPS"],

  //settings
  uploads: [],
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
        const dataWithScoreGT1 = data.result.filter((i) => {
          if (i.score >= 1) return i;
        });
        // console.log(data)
        dispatch({
          type: HANDLE_SEARCH_TO_REPORT,
          payload: {
            reportData: dataWithScoreGT1,
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
    getReport(inputDate);
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
    // clearAlert(3000);
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const handleScreenResize = (screenSize) => {
    dispatch({ type: HANDLE_SCREEN_RESIZE, payload: screenSize });
  };

  const getReport = async () => {
    dispatch({ type: LOADING_BEGIN });
    try {
      const dates = sessionStorageDate();
      const { data } = await axiosFetch.post("/reports", {
        dates,
      });

      const reportData = data.result;
      const activeHeaders = data.headers.paypalActiveHeaders;
      const filterHeaders = data.headers.paypalFilterHeaders;

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

      const today =  new Date()
      const yesterday = today.setDate(today.getDate() - 1);

      if (datesDuration > 730){
        dispatch({
          type: LOADING_ERROR,
          payload: {
            msg: "Out of range: selected time frame should not be more than two years."
          },
        });
        return
      }
      if (new Date(dates[1]) > yesterday){
        dispatch({
          type: LOADING_ERROR,
          payload: {
            msg: "Out of range: selected date cannot be greater than today's date."
          },
        });
        return
      }

      //prepare line chart data
      const monthsDuration =
        differenceInMonths(new Date(dates[1]), new Date(dates[0])) + 1;
      const yearsDuration =
        differenceInCalendarYears(new Date(dates[1]), new Date(dates[0])) + 1;

      const { data } = await axiosFetch.post("/analytics", {
        yesterday,dates
      });
      console.log(data);

      let cogs = 0
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

      // let expensesLineChart_data = expensesData?.groupByDay[0].data;
      // let expensesLineChart_date = expensesData?.groupByDay[0].labels;
      // let salesLineChart_date = salesData?.groupByDay[0].labels;
      // let salesLineChart_data = salesData?.groupByDay[0].data;

      // if (monthsDuration > 6) {
      //   expensesLineChart_data = expensesData?.groupByMonth[0].data;
      //   expensesLineChart_date = expensesData?.groupByMonth[0].labels;
      //   salesLineChart_date = salesData?.groupByMonth[0].labels;
      //   salesLineChart_data = salesData?.groupByMonth[0].data;
      // }

      //Statements Table data
      const statementsTable__sales = groupedByCategory(salesData?.groupByType);
      let statementsTable__expenses = groupedByCategory(
        expensesData?.groupByType
      );

      const datesArr = ((startD, endD) => {
        let dates = { day: [], month: [], year: [] };
        if (monthsDuration >= 2)
          dates.month.push(...getMonthsBetween(startD, endD));
        if (yearsDuration >= 2)
          dates.year.push(...getYearsBetween(startD, endD));
        dates.day.push(...getDatesBetween(startD, endD));
        return dates;
      })(dates[0], dates[1]);

      const expensesAddedOn =
        (cogs && cogs / datesDuration) +
        (salesData?.groupByStats[0].fees &&
          salesData?.groupByStats[0].fees / datesDuration);

      let final_expensesLineChart_data = { day: [], month: [], year: [] };
      let final_salesLineChart_data = { day: [], month: [], year: [] };
      if (datesArr) {
        for (const date in datesArr) {
          
          if (datesArr[date].length) {
            datesArr[date].map((d) => {
              let exp_ind = getIndexIfSameDate(
                expensesData[date][0].labels,
                d,
                date
              );
              let sales_ind = getIndexIfSameDate(
                salesData[date][0].labels,
                d,
                date
              );

              if (exp_ind > -1) {
                final_expensesLineChart_data[date].push(
                  expensesData[date][0].data[exp_ind] + expensesAddedOn
                );
              } else {
                final_expensesLineChart_data[date].push(expensesAddedOn);
              }

              if (sales_ind > -1) {
                final_salesLineChart_data[date].push(
                  salesData[date][0].data[sales_ind]
                );
              } else {
                final_salesLineChart_data[date].push(0);
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
        datesArr.day.map((date) => {
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
        statementsTable__expenses = addNewCategoryToStatementTable(
          statementsTable__expenses,
          "Cost of Goods Sold",
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
          yearsDuration: yearsDuration,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOADING_ERROR,
        payload: {
          msg: `There was an error. Try again later`,
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
