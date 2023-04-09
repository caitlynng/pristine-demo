import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/DatePicker";
import DateRangePicker from "rsuite/DateRangePicker";
import isAfter from "date-fns/isAfter";
import "rsuite/dist/rsuite.min.css";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import {
  format,
  differenceInDays,
} from "date-fns";
import { isFullMonth } from "../utils/Helpers";

const DatePicker = () => {
  const { handleDateChange, dashboardDate } = useAppContext();
  
  const {
    allowedMaxDays,
    allowedDays,
    allowedRange,
    beforeToday,
    afterToday,
    combine,
  } = DateRangePicker;

  const twoYearsBeforeTodayDate = subDays(new Date(), 365);
  
  const predefinedRanges = [
          {
            label: "Today",
            value: [new Date(), new Date()],
            placement: "left",
            appearance: "subtle",
          },
          {
            label: "Yesterday",
            value: [addDays(new Date(), -1), addDays(new Date(), -1)],
            placement: "left",
            appearance: "subtle",
          },
          {
            label: "This week",
            value: [startOfWeek(new Date()), endOfWeek(new Date())],
            placement: "left",
            appearance: "subtle",
          },
          {
            label: "Last 7 days",
            value: [subDays(new Date(), 6), new Date()],
            placement: "left",
            appearance: "subtle",
          },
          {
            label: "Last 30 days",
            value: [subDays(new Date(), 29), new Date()],
            placement: "left",
            appearance: "subtle",
          },
          {
            label: "This month",
            value: [startOfMonth(new Date()), new Date()],
            placement: "left",
            appearance: "subtle", //"subtle" or "default"
          },
          {
            label: "Last month",
            value: [
              startOfMonth(addMonths(new Date(), -1)),
              endOfMonth(addMonths(new Date(), -1)),
            ],
            placement: "left",
            appearance: "subtle",
          },
          {
            label: "This year",
            value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
            placement: "left",
            appearance: "subtle",
          },
          {
            label: "Last year",
            value: [
              new Date(new Date().getFullYear() - 1, 0, 1),
              new Date(new Date().getFullYear(), 0, 0),
            ],
            placement: "left",
            appearance: "subtle",
          },
          {
            label: "All time",
            value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
            placement: "left",
            appearance: "subtle",
          },
        ];

  const handleDate = (value) => {
    handleDateChange(value);
  };
  // const monthDiff = (d1, d2) => {
  //   var months;
  //   months = (d2.getFullYear() - d1.getFullYear()) * 12;
  //   months -= d1.getMonth();
  //   months += d2.getMonth();
  //   return months <= 0 ? 0 : months;
  // }

  return (
    <Wrapper>
      <DateRangePicker
        placement="autoVerticalEnd"
        ranges={predefinedRanges}
        showOneCalendar
        preventOverflow={true}
        cleanable={false} //	Whether the selected value can be cleared
        character="-" //The character that separates two dates
        placeholder="Set a date range"
        onChange={handleDate}
        format={"M/dd/yy"}
        size="sm" //	'lg' | 'md' | 'sm' | 'xs'
        value={dashboardDate}
        disabledDate={allowedRange(twoYearsBeforeTodayDate, afterToday())}
        renderValue={(value) => {
          //return label names if selected days are in predefined range
          for (const range of predefinedRanges) {
            if (
              differenceInDays(range.value[0], value[0]) === 0 &&
              differenceInDays(range.value[1], value[1]) === 0
            ) {
              return range.label;
            }
          }
          //return month name if selected days are in specific month
          if (isFullMonth(value[0], value[1])) {
            return format(new Date(value[0]), "MMM yyyy");
          }
          return (
            format(new Date(value[0]), "MM/dd/yy") +
            " - " +
            format(new Date(value[1]), "MM/dd/yy")
          );
        }} //https://github.com/rsuite/rsuite/issues/1043
      />
    </Wrapper>
  );
  //https://stackoverflow.com/questions/33437909/how-to-read-value-from-daterangepicker
};

export default DatePicker;
