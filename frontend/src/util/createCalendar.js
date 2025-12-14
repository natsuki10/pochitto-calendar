const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1; // 0-index → +1
const todayDate = today.getDate();

export function createCalendar(year, month) {
  // 月初の曜日（0:日曜〜6:土曜）
  const startDay = new Date(year, month - 1, 1).getDay();

  // 月の日数
  const totalDays = new Date(year, month, 0).getDate();

  const weeks = [];
  let currentDay = 1;

  // 最大 6 週分用意
  for (let i = 0; i < 6; i++) {
    const week = [];

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        // 1週目の月初前は空白
        week.push({ day: null, bgColor: "#fff" });
      } else if (currentDay > totalDays) {
        // 月末を過ぎたら空白
        week.push({ day: null, bgColor: "#fff" });
      } else {
        const isSunday = j === 0;
        const isSaturday = j === 6;

        const isToday =
          year === todayYear &&
          month === todayMonth &&
          currentDay === todayDate;

        week.push({
          day: currentDay,
          bgColor: isToday
            ? "#e79c5aff" // ← 今日だけ特別な色に
            : isSunday
            ? "#ffe4e1"
            : isSaturday
            ? "#e6f7ff"
            : "#fff",
        });

        currentDay++;
      }
    }

    weeks.push(week);

    if (currentDay > totalDays) break;
  }

  return weeks;
}
