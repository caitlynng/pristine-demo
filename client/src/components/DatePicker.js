import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useAppContext } from "../context/appContext";
import { format, addYears } from "date-fns";

const DatePicker = () => {
  const { dashboardDate, handleDateChange } = useAppContext();

    
  const inputRef = useRef(null);
    const allowedDateRange = {
      minDate: new Date().setFullYear(new Date().getFullYear() - 1),
      maxDate: new Date(),
    };
    
  useEffect(() => {
    const fp = flatpickr(inputRef.current, {
      mode: "range",
      dateFormat: "m/d/Y",
      defaultDate: dashboardDate,
        wrap: false,
      ...allowedDateRange,
      onChange: (selectedDates) => {
        handleDateChange(selectedDates);
        },
    });
  }, [dashboardDate]);

  return <input type="text" ref={inputRef} className="datepicker-input"/>;
};

export default DatePicker;
