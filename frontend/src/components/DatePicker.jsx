import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function BasicRangeShortcuts() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <DateRangePicker
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        ranges={state}
        months={2} // Show 2 calendars side by side
        direction="horizontal" // Layout direction of the calendars
        rangeColors={["#3f51b5"]} // Color for highlighted range
      />
    </div>
  );
}
