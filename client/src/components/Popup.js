import { useAppContext } from "../context/appContext";
import Button from "./Button";

const PopUp = () => {
  const {
    closeDemoMessage,
    defaultDemoText,
    callbackBtnText,
    closeBtnText,
    callbackDemo,
    demoContent
  } = useAppContext();

  return (
    <div className="popup">
      <div className="popup_inner">
        {demoContent ? demoContent : <p>{defaultDemoText}</p> }
        <div className="flex align-center justify-center popup-btn-container">
          {callbackBtnText && (
            <Button
              onSetActive={() => callbackDemo()}
              title={callbackBtnText}
              classList="save-btn"
            />
          )}
          <Button
            onSetActive={closeDemoMessage}
            title={closeBtnText}
            classList="plain-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default PopUp;
