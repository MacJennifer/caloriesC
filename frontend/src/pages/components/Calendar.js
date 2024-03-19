import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const CustomDatePickerInput = ({ value, onClick }) => (
    <div className="containerInput">
      <input
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        className="inputDateCalendar"
      />
      <FaCalendarAlt
        style={{ cursor: "pointer" }}
        onClick={onClick}
        className="iconCalendar"
      />
    </div>
  );
  return (
    <div className="containerCalendar">
      <div>
        <span>Journal :</span>
      </div>
      <div className="inputCalendar">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          customInput={<CustomDatePickerInput />}
        />
      </div>
    </div>
  );
};

export default Calendar;
