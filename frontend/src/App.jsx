import { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar/Calendar";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState();

  const [ym, setYm] = useState({ year: 2025, month: 12 });
  const handlePrevMonth = () => {
    setYm((prev) => {
      if (prev.month === 1) {
        // 1月の前 → 前年の12月
        return { year: prev.year - 1, month: 12 };
      } else {
        return { year: prev.year, month: prev.month - 1 };
      }
    });
  };
  const handleNextMonth = () => {
    setYm((prev) => {
      if (prev.month === 12) {
        // 12月の次 → 翌年の1月
        return { year: prev.year + 1, month: 1 };
      } else {
        return { year: prev.year, month: prev.month + 1 };
      }
    });
  };

  //選択されている日
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <div className="app">
        <div className="container py-4 px-3">
          <div className="mx-auto" style={{ maxWidth: 420 }}>
            <div className="app__container">
              <h1 className="app__title">ぽちっとカレンダー(仮)</h1>

              {/* カレンダー */}
              <h2>カレンダー</h2>
              {/* 月移動ボタン */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handlePrevMonth}
                >
                  &lt;
                </button>

                <span>
                  {ym.year}年 {ym.month}月
                </span>

                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleNextMonth}
                >
                  &gt;
                </button>
              </div>
              <Calendar
                year={ym.year}
                month={ym.month}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
