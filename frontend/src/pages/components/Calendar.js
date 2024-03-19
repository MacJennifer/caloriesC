import moment from "moment";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <p onClick={() => console.log("Ouverture du calendrier")}>
        {moment(selectedDate).format("DD/MM/YYYY")}
      </p>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
    </div>
  );
};

export default DateSelector;
