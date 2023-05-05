import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import ReportTable from "./ReportTable";
import Loading from "./Loading";
import PopUp from "./Popup";

const ManageUpload = () => {
  const { manageUpload, uploads, isLoading, showPopupMessage } =
    useAppContext();

  const [data, setData] = useState(uploads);

  if (data != uploads) {
    setData(uploads);
  }
  const headers = [
    { title: "File Name", field: "fileName" },
    { title: "File Type", field: "type" },
    { title: "File Size", field: "fileSize" },
    { title: "Upload Date", field: "createdAt" },
  ];

  const options = {
    pageSize: 10,
    selection: true,
    actionsColumnIndex: -1,
  };

  const actions = [
    {
      tooltip: "Remove All Selected Rows",
      icon: "delete",
      onClick: (evt, data) => {
        showPopupMessage();
      },
    },
  ];
  const onRowClicked = (event, rowData) => {
    // Copy row data and set checked state
    const rowDataCopy = { ...rowData };
    rowDataCopy.tableData.checked = !rowDataCopy.tableData.checked;
    // Copy data so we can modify it
    const dataCopy = [...data];
    // Find the row we clicked and update it with `checked` prop
    dataCopy[rowDataCopy.tableData.id] = rowDataCopy;
    setData(dataCopy);
  };

  useEffect(() => {
    manageUpload();
  }, []);

  return (
    <div>
      {isLoading && <Loading />}
      <ReportTable
        columns={headers}
        data={uploads}
        options={options}
        actions={actions}
        onRowClick={onRowClicked}
      />
    </div>
  );
};

export default ManageUpload;
