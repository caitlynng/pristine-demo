import { useState, useRef } from "react";
import { useAppContext } from "../../context/appContext";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";

import Wrapper from "../../assets/wrappers/Uploads";
import { Button } from "../../components";
import FormRowDropDown from "../../components/FormRowDropDown";

const Uploads = () => {
  const { showDemoMessage, fileType, shippingCompany, screenSize } = useAppContext();

  const [type, setType] = useState(fileType[0]);
  const [shipping, setShipping] = useState(shippingCompany[0]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleTypeChange = (val) => {
    setType(val);
    
  };
  const handleShippingChange = (val) => {
    setShipping(val);
  };

  return (
    <Wrapper className="max-width uploads-joyride">
      <div className="page-header">
        <h2 className="page-title uploads-header">Uploads</h2>
      </div>
      <div className="type-selection-container flex align-center flex-wrap">
        <FormRowDropDown
          name="fileType"
          labelText="select uploading file type"
          list={fileType}
          onClickHandle={handleTypeChange}
          inputType="radio"
          defaultChecked={type}
        />
        <div className="tooltip upload-requirement">
          <MdOutlineInfo className="fill-primary" />
          <div className={`tooltiptext ${screenSize < 499 ? "bottom" :"right"}`}>
            <p className="title">*Requirements:</p>
            <p>
              - The uploaded files should not exceed 10MB in size, and you can
              upload up to 5 files at once
            </p>
            <p>
              - Make sure to include all report header fields in your files.
            </p>
          </div>
        </div>
      </div>
      {type === "Shipping reports" && (
        <div className="type-selection-container">
          <FormRowDropDown
          name="fileType"
          labelText="shipping company"
          list={shippingCompany}
          onClickHandle={handleShippingChange}
          inputType="radio"
          defaultChecked={shipping}
        />
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
                ariaLabel="browse"
              />
            </div>
          </label>
        </form>
      </div>
    </Wrapper>
  );
};

export default Uploads;
