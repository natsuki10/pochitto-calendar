// src/components/Calendar/Calendar.jsx
import DayCell from "./DayCell";
import { createCalendar } from "../../util/createCalendar";

function Calendar({ year, month, selectedDate, setSelectedDate, records }) {
  const calendar = createCalendar(year, month);
  const weekLabels = ["日", "月", "火", "水", "木", "金", "土"];

  // 頑張り度ごとの背景色
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
            const hasDay = d.day != null;
            const mm = String(month).padStart(2, "0");
            const dd = String(d.day).padStart(2, "0");
            const dateKey = hasDay ? `${year}-${mm}-${dd}` : null;

            const record = hasDay && dateKey ? records?.[dateKey] : null;
            const effort = record?.effort ?? 0;
            const tagIds = record?.tagIds ?? [];

            // ●表示条件：タグが1つ以上ある場合のみ
            const showDot =
              hasDay && Array.isArray(tagIds) && tagIds.length > 0;

            // 背景色：頑張り度があれば色付け
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
                showDot={showDot}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Calendar;
