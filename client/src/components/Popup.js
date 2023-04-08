
import { useAppContext } from "../context/appContext";
import Button from "./Button";

const PopUp = () => {

    const { closeDemoMessage } = useAppContext()
    
    
  return (
      <div className='popup'>
      <div className="popup_inner">
        <p>This is only a demo version. Please sign in to use the full features.</p>
        <Button
          onSetActive={closeDemoMessage}
          title="ok"
          classList="save-btn"
        />
      </div>
    </div>
  );
};

export default PopUp;
