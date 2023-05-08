import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  LOADING_BEGIN,
  SETUP_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  TOGGLE_SIDEBAR,
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
  SHOW_DEMO_MESSAGE,
  CLOSE_DEMO_MESSAGE,
} from "./actions";

import { initialState } from "./appContext.js";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values!",
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
      };

    case SHOW_DEMO_MESSAGE:
      return {
        ...state,
        demoMessage: true,
        defaultDemoText: action.payload.defaultDemoText,
        callbackDemo: action.payload.callbackDemo,
        callbackBtnText: action.payload.callbackBtnText,
        closeBtnText: action.payload.closeBtnText,
        demoContent: action.payload.demoContent,
      };
    case CLOSE_DEMO_MESSAGE:
      return {
        ...state,
        demoMessage: false,
      };
    case LOADING_BEGIN:
      return { ...state, isLoading: true };

    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOADING_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        noData: true,
        dashboardStats_Sales: [],
        dashboardTable_TotalSales: 0,
        dashboardTable_TotalExpenses: 0,
        dashboardTable_TotalProfits: 0,
        dashboardLineChart_Date: [],
        dashboardLineChart_SalesData: [],
        dashboardLineChart_ExpensesData: [],
        dashboardDoughnutChart_SalesData: {},
        dashboardDoughnutChart_ExpensesData: {},
        statementTable_ExpensesData: [],
        statementTable_SalesData: [],
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        showAlert: true,
        alertType: "success",
        alertText: "Information has been updated.",
      };

    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    case GET_REPORT_SUCCESS:
      return {
        ...state,
        isBack: false,
        reportData: action.payload.reportData,
        activeHeaders: action.payload.activeHeaders,
      };
    case HANDLE_SEARCH_TO_REPORT:
      return {
        ...state,
        isLoading: false,
        isBack: true,
        reportData: action.payload.reportData,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.msg,
      };

    case UPDATE_COLUMN_HIDDEN:
      return {
        ...state,
        reportHeaders: action.payload.data.update[0].tableHeaders,
      };

    case SHOW_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        noData: false,
        dashboardStats_Sales: action.payload.dashboardStats_Sales,
        statementTable_SalesData: action.payload.statementTable_SalesData,
        statementTable_ExpensesData: action.payload.statementTable_ExpensesData,
        dashboardTable_TotalSales: action.payload.dashboardTable_TotalSales,
        dashboardTable_TotalProfits: action.payload.dashboardTable_TotalProfits,
        dashboardTable_TotalExpenses:
          action.payload.dashboardTable_TotalExpenses,
        dashboardLineChart_Date: action.payload.dashboardLineChart_Date,
        dashboardLineChart_SalesData:
          action.payload.dashboardLineChart_SalesData,
        dashboardLineChart_ExpensesData:
          action.payload.dashboardLineChart_ExpensesData,
        dashboardDoughnutChart_SalesData:
          action.payload.dashboardDoughnutChart_SalesData,
        dashboardDoughnutChart_ExpensesData:
          action.payload.dashboardDoughnutChart_ExpensesData,
        cogs: action.payload.cogs,
        monthsDuration: action.payload.monthsDuration,
        weeksDuration: action.payload.weeksDuration,
      };
    case HANDLE_DATE_CHANGE:
      return {
        ...state,
        dashboardDate: action.payload.formatedDate,
      };

    case HANDLE_ELEMENT_SIZE:
      return {
        ...state,
        viewportWidth: action.payload.size,
      };
    case HANDLE_SCREEN_RESIZE:
      return {
        ...state,
        screenSize: action.payload,
      };
    case HANDLE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.text,
      };

    case MANAGE_UPLOADS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        uploads: action.payload.uploads,
      };
  }
  return state;
};
export default reducer;
