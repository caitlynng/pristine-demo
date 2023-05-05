import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useAppContext } from "../context/appContext";

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
        console.log(selectedDates);
        handleDateChange(selectedDates);
      },
    });
  }, [dashboardDate]);

  return (
    <>
      <label htmlFor="datepicker"></label>
      <input
        type="text"
        ref={inputRef}
        className="datepicker-input"
        id="datepicker"
      />
    </>
  );
};

export default DatePicker;
