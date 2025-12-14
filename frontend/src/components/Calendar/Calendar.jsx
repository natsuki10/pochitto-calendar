// src/components/Calendar/Calendar.jsx
import DayCell from "./DayCell";
import { createCalendar } from "../../util/createCalendar";

function Calendar({ year, month, selectedDate, setSelectedDate }) {
  const calendar = createCalendar(year, month);
  const weekLabels = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div>
      {/* 曜日ヘッダー */}
      <div style={{ display: "flex" }}>
        {weekLabels.map((label) => (
          <div
            key={label}
            style={{
              flex: 1,
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
          {week.map((d, dIndex) => {
            const hasDay = d.day != null; // 日付が入っているマスかどうか
            const dateKey = hasDay ? `${year}-${month}-${d.day}` : null;

            return (
              <DayCell
                key={dIndex}
                day={d.day}
                bgColor={d.bgColor}
                isSelected={hasDay && selectedDate === dateKey}
                onClick={hasDay ? () => setSelectedDate(dateKey) : undefined}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Calendar;
