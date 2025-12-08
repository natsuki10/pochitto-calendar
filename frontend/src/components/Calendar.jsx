// src/Calendar.jsx
import DayCell from "./DayCell";
import { createCalendar } from "../util/createCalendar";

function Calendar({ year, month }) {
  const calendar = createCalendar(year, month);
  const weekLabels = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div>
      <h2>
        {year}年 {month}月
      </h2>

      {/* 曜日ヘッダー */}
      <div style={{ display: "flex" }}>
        {weekLabels.map((label) => (
          <div
            key={label}
            style={{
              width: "40px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* 本体 */}
      {calendar.map((week, wIndex) => (
        <div key={wIndex} style={{ display: "flex" }}>
          {week.map((d, dIndex) => (
            <DayCell key={dIndex} day={d.day} bgColor={d.bgColor} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Calendar;
