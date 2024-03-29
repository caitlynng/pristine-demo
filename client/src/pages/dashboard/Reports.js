import { Loading, ReportTable, Button, DatePicker } from "../../components";
import Wrapper from "../../assets/wrappers/Reports";
import { useEffect, useState } from "react";
import {BiArrowBack} from 'react-icons/bi'
import { useAppContext } from "../../context/appContext";
import {
  transaction_details,
  product_info,
  customer_info,
} from "../../utils/paypalTCode";
import { addSpaceBeforeEachCapitalLetter } from "../../utils/Helpers";
import { useFullscreen } from "../../context/fullscreenContext";

const Reports = () => {
  const { fullscreenRef, enterFullscreen, exitFullscreen, fullscreenActive } =
    useFullscreen();
  const { handleDateChange, isLoading, reportData, activeHeaders, isBack , screenSize} =
    useAppContext();

  useEffect(() => {
    handleDateChange();
  }, []);

  const [isFilter, setIsFilter] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const tableStyle = {
    outer: {
      fontSize: 13,
      textAlign: "left",
      padding: "2% 10% 2% 2%",
      borderBottom: "2px solid black",
    },
  };
  const getRows = (data, category) => {
    const result = Object.keys(data.rowData)
      .sort()
      .map((i, ind) => {
        if (
          typeof i !== "object" &&
          typeof data[i] !== "object" &&
          category.includes(i)
        ) {
          return (
            <div className="detail-panel-row flex flex-wrap" key={`${i}-${ind}`}>
              <div className="detail-panel-title">
                {addSpaceBeforeEachCapitalLetter(i)}
              </div>
              <div className="detail-panel-desc">{data.rowData[i]}</div>
            </div>
          );
        }
      });
    return result;
  };

  const onRowClick = (evt, selectedRow) =>
    setSelectedRow(selectedRow.tableData.id);

  const options = {
    filtering: isFilter,
    columnsButton: !fullscreenActive ? true : false,
    detailPanelColumnAlignment: "right",
    pageSize: 15,
    searchFieldAlignment: "left",
  };
  const fullscreen = fullscreenActive
    ? [
        {
          icon: "fullscreen_exit",
          tooltip: "Fullscreen",
          isFreeAction: true,
          onClick: () => exitFullscreen(),
        },
      ]
    : [
        {
          icon: "filter_alt",
          tooltip: "Enable Filter",
          isFreeAction: true,
          onClick: () => {
            setIsFilter(!isFilter);
          },
        },
        {
          icon: "fullscreen",
          tooltip: "Fullscreen",
          isFreeAction: true,
          onClick: () => enterFullscreen(),
        },
      ];
  const actions = screenSize <= 450 ? [{
          icon: "filter_alt",
          tooltip: "Enable Filter",
          isFreeAction: true,
          onClick: () => {
            setIsFilter(!isFilter);
          },
  }] : fullscreen
  
  const detailPanel = [
    {
      //https://stackoverflow.com/questions/50303454/how-to-use-the-new-material-design-icon-themes-outlined-rounded-two-tone-and
      icon: "check_box_outline_blank",
      openIcon: "check_box",
      tooltip: "Product Details",
      render: (rowData) => {
        return (
          <div style={tableStyle.outer}>{getRows(rowData, product_info)}</div>
        );
      },
    },
    {
      icon: "person_outline",
      openIcon: "person",
      tooltip: "Customer Info",
      render: (rowData) => {
        return (
          <div className="detail-panel-container">
            {getRows(rowData, customer_info)}
          </div>
        );
      },
    },
    {
      icon: "info_outline",
      openIcon: "info",
      tooltip: "Transaction Details",
      render: (rowData) => {
        return (
          <div style={tableStyle.outer}>
            {getRows(rowData, transaction_details)}
          </div>
        );
      },
    },
  ];
  const fullscreenStyle = fullscreenActive
    ? { backgroundColor: "white" }
    : { backgroundColor: "transparent" };


  return (
    <Wrapper className="max-width reports-joyride" style={fullscreenStyle}>
      <div className="page-header">
        <h2 className="page-title">Filter</h2>
        <div className="date-picker-container">
          <DatePicker />
        </div>
      </div>
      {isBack && (
        <div className="onbackbtn-container flex align-center">
          <BiArrowBack />
          <Button
            title="Back"
            onSetActive={() => handleDateChange()}
            classList="plain-btn"
            ariaLabel="back"
          />
        </div>
      )}
      {isLoading && <Loading />}
      <div style={{ overflow: "auto", marginTop: '1em' }} ref={fullscreenRef}>
        <ReportTable
          data={reportData}
          columns={activeHeaders}
          options={options}
          detailPanel={detailPanel}
          actions={actions}
          onRowClick={onRowClick}
        />
      </div>
    </Wrapper>
  );
};

export default Reports;
