import { useState, useRef } from "react";
import { useAppContext } from "../../context/appContext";
import { IoCloudUploadOutline } from "react-icons/io5";

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

  // handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    setDragActive(false);
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      fileUpload(e.dataTransfer.files, type, shipping);
    }
  };

  // triggers when file is selected with click
  const handleClick = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      fileUpload(e.target.files[0], type, shipping);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  //https://www.codemzy.com/blog/react-drag-drop-file-upload

  // if (isLoading) {
  //   //set loading spinning center css in index.css
  //   return <Loading center />;
  // }
  return (
    <Wrapper className="max-width">
      <div className="page-header analytics__page-header">
        <h4 className="page-title">Uploads</h4>
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
        <form
          className="form-file-upload"
          onDragEnter={showDemoMessage}
        >
          <input
            ref={inputRef}
            type="file"
            className="input-file-upload"
          />
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
