import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import ReportTable from "./ReportTable";
import Loading from './Loading'
import Button from './Button'
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const PopUp = (props) => {
  return (
    <div className="popup">
      <div className="popup_inner">
        <p>{props?.text}</p>
        {props?.isLoading && <Loading />}
        <Button onSetActive={props.confirmPopup} title="confirm" classList="save-btn"/>
        <Button onSetActive={props.closePopup} title="cancel" />
      </div>
    </div>
  );
};

const ManageUpload = () => {
  const { manageUpload, uploads, deleteUpload, isLoading } = useAppContext();

  const [data, setData] = useState(uploads);
  const [deleted, setDeleted] = useState([])
  const [popup, setPopup] = useState(false);

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
        setPopup(true)
        setDeleted(data)
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

  const confirmPopup = () => {
    deleteUpload(deleted);
    setPopup(false)
  };
  const cancelPopup = () => {
    setDeleted([])
    setPopup(false)
  }

  useEffect(() => {
    manageUpload();
  }, []);

  return (
    <div>
      {popup && (
        <PopUp
          confirmPopup={confirmPopup}
          closePopup={cancelPopup}
          isLoading={isLoading}
          text="Do you want to delete all report data under selected upload(s)?"
        />
      )}
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
