// src/components/Calendar/Calendar.jsx
import DayCell from "./DayCell";
import { createCalendar } from "../../util/createCalendar";

function Calendar({ year, month, selectedDate, setSelectedDate, records }) {
  const calendar = createCalendar(year, month);
  const weekLabels = ["日", "月", "火", "水", "木", "金", "土"];
  const effortColors = {
    0: "white",
    1: "#eaf6ff",
    2: "#cfe9ff",
    3: "#9fd3ff",
    4: "#4aa8ff",
  };

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const TODAY_BG = "#ffc6b3ff"; // 今日の色

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
            const mm = String(month).padStart(2, "0");
            const dd = String(d.day).padStart(2, "0");
            const dateKey = hasDay ? `${year}-${mm}-${dd}` : null;

            const effort =
              hasDay && dateKey ? records?.[dateKey]?.effort ?? 0 : 0;

            let bgColor = "transparent";
            if (hasDay) {
              if (effort > 0) {
                bgColor = effortColors[effort] ?? effortColors[0];
              } else if (dateKey === todayKey) {
                bgColor = TODAY_BG;
              } else {
                bgColor = "white";
              }
            }

            return (
              <DayCell
                key={dIndex}
                day={d.day}
                bgColor={bgColor}
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
