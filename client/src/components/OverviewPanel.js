import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { currencyFormatter } from "../utils/Helpers";
import { Wrapper } from "../assets/wrappers/OverviewPanel";
import OverviewChart from "./OverviewChart.js";

const OverviewPanel = () => {
  const { dashboardTable_TotalProfits } = useAppContext();

  return (
    <Wrapper className="item-box">
      <h6 className="overview-header">Overview</h6>
      <div className="profit-title">
        <p>Total {dashboardTable_TotalProfits >= 0 ? "profits" : "loss"}</p>
        <h3>{currencyFormatter.format(dashboardTable_TotalProfits)}</h3>
      </div>
      <OverviewChart />
    </Wrapper>
  );
};
export default OverviewPanel;
