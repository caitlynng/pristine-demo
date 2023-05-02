import { useState, useRef } from "react";
import { useAppContext } from "../../context/appContext";
import { IoCloudUploadOutline } from "react-icons/io5";
import {MdOutlineInfo} from 'react-icons/md'

import Wrapper from "../../assets/wrappers/Uploads";
// import Loading from "../../components/Loading";
// import Alert from "../../components/Alert";
import FormRowDropDown from "../../components/FormRowDropDown";
import { Button, Loading, Alert } from '../../components'

const Uploads = () => {
  const { fileUpload, showDemoMessage, fileType, shippingCompany } =
    useAppContext();

  const [type, setType] = useState(fileType[0]);
  const [shipping, setShipping] = useState(shippingCompany[0]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleShippingChange = (e) => {
    setShipping(e.target.value);
  };


  return (
    <Wrapper className="max-width uploads-joyride">
      <div className="page-header">
        <h2 className="page-title uploads-header">Uploads</h2>
      </div>
      <div className="type-selection-container">
        <label htmlFor="fileType">Select file type to upload:</label>
        <select
          id="fileType"
          value={type}
          className="dropdown-select"
          onChange={handleTypeChange}
        >
          {fileType.map((item, ind) => {
            return (
              <option key={ind} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <div className="tooltip upload-requirement">
          <MdOutlineInfo className="fill-primary"/>
          <div className="tooltiptext right">
            <p className="title">*Requirements:</p>
            <p>- The uploaded files should not exceed 10MB in size, and you can upload up to 5 files at once</p>
            <p>- Make sure to include all report header fields in your files.</p>
          </div>
        </div>
      </div>
      {type === "Shipping reports" && (
        <div className="type-selection-container">
          <label htmlFor="fileType">Select shipping company:</label>
          <select
            id="fileType"
            value={shipping}
            className="dropdown-select"
            onChange={handleShippingChange}
          >
            {shippingCompany.map((item, ind) => {
              return (
                <option key={ind} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      )}
      <div>
        <div></div>
        <form className="form-file-upload" onDragEnter={showDemoMessage}>
          <input ref={inputRef} type="file" className="input-file-upload" />
          <label
            htmlFor="input-file-upload"
            className={dragActive ? "drag-active" : ""}
          >
            <div>
              <IoCloudUploadOutline className="upload-icon" />
              <p>Drag and drop to upload</p>
              <Button
                classList="plain-btn"
                onSetActive={showDemoMessage}
                title="or browse"
              />
            </div>
          </label>
        </form>
      </div>
    </Wrapper>
  );
};

export default Uploads;
