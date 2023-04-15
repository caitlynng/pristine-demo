import React, { forwardRef } from "react";
import {  useEffect } from "react";

import MaterialTable from "@material-table/core";
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const tableIcons = {
  // Filter: forwardRef((props, ref) => <ArrowDropDown {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <span />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
};
//https://material-table-core.com/demos/sort/multi

//override MU global styles
const useStyles = makeStyles((theme) => ({
  root: {
    "& .css-wk9895-MuiToolbar-root": {
      backgroundColor: "#0eb9c552",
      color: "#343a40",
    },
    "& .MuiBox-root h6": {
      fontSize: "1.1em",
    },
    "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
      paddingLeft: "4px",
    },
  },
}));

const ReportTable = (props) => {
  const classes = useStyles();
  const tableRef = React.createRef();

  const options = {
    exportMenu: [
      {
        label: "Export PDF",
        exportFunc: (cols, datas) => ExportPdf(cols, datas, "myPdfFileName"),
      },
      {
        label: "Export CSV",
        exportFunc: (cols, datas) => ExportCsv(cols, datas, "myCsvFileName"),
      },
    ],
    idSynonym:"_id",
    paging: true,
    pageSizeOptions: [5, 10, 15, 25, 50, 100],
    showTitle: false,
    maxColumnSort: "all_columns",
    headerStyle: {
      backgroundColor: "#f2f2f2",
      color: "#343a40",
      fontWeight: 600,
      columnsButton: true,
    },
    //  padding: "dense",
    ...props?.options
  };

  useEffect(() => {}, [props]);
  return (
    <div className={`report-table-container ${classes.root}`}>
      <MaterialTable
        columns={props?.columns}
        data={props?.data}
        tableRef={tableRef}
        icons={tableIcons}
        // icons={{ Filter: (props) => <ArrowDropDown {...props} /> }}
        //https://www.freakyjolly.com/react-material-table-how-to-show-icons-in-action-and-other-components/
        detailPanel={props?.detailPanel}
        actions={props?.actions}
        options={options}
        onRowClick={props?.onRowClick}
      />
    </div>
  );
};

export default ReportTable;
