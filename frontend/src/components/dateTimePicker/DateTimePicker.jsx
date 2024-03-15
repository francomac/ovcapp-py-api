import { CalendarIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimePicker.css";

const DateTimePicker = () => {
  const createDateTime = (hours, minutes) => {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  };

  const [startDate, setStartDate] = useState(createDateTime(16, 30));

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      className="flex flex-row rounded-md bg-gray-200 p-2 focus:border-blue-300 focus:outline-none focus:ring"
      onClick={onClick}
      ref={ref}
    >
      {value}
      <CalendarIcon className="ml-2 h-5 w-5 text-gray-500" />
    </button>
  ));

  CustomInput.displayName = "CustomDateTimePickerInput";
  CustomInput.propTypes = {
    value: PropTypes.any,
    onClick: PropTypes.func,
  };

  return (
    <DatePicker
      className="flex flex-row rounded-md border-0 bg-gray-200 p-2 focus:border-blue-300 focus:outline-none focus:ring"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      excludeTimes={[
        createDateTime(17, 0),
        createDateTime(18, 30),
        createDateTime(19, 30),
        createDateTime(17, 30),
      ]}
      dateFormat="MMMM d, yyyy h:mm aa"
      customInput={<CustomInput />}
    />
  );
};

export default DateTimePicker;
