import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const Calendar = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Set the selected date to today when the component mounts
    setSelectedDate(new Date());
  }, []);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date); // Appel de la fonction de rappel avec la nouvelle date
  };

  return (
    <div className="containerCalendar">
      <div>
        <span>Journal :</span>
      </div>
      <div className="inputCalendar">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          customInput={<CustomDatePickerInput />}
        />
      </div>
    </div>
  );
};

export default Calendar;
