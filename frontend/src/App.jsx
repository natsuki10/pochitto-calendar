import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import EditPanel from "./components/EditPanel/EditPanel";

function App() {
  //localStorage保存
  const STORAGE_KEYS = {
    records: "pochitto-records",
    tagNames: "pochitto-tagNames",
  };

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

  const [tagNames, setTagNames] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.tagNames);
      if (!raw) return { tag1: "タグ1", tag2: "タグ2" };

      const parsed = JSON.parse(raw);
      return {
        tag1: typeof parsed?.tag1 === "string" ? parsed.tag1 : "タグ1",
        tag2: typeof parsed?.tag2 === "string" ? parsed.tag2 : "タグ2",
      };
    } catch {
      return { tag1: "タグ1", tag2: "タグ2" };
    }
  });

  const [records, setRecords] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.records);
      if (!raw) return {};

      const parsed = JSON.parse(raw);

      if (parsed && typeof parsed === "object") return parsed;

      return {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(records));
    } catch {
      // 保存失敗（容量など）してもアプリを落とさない
    }
  }, [records]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.tagNames, JSON.stringify(tagNames));
    } catch {
      // 保存失敗してもアプリを落とさない
    }
  }, [tagNames]);

  // 初期値（存在しない日付のデフォルト）
  const defaultRecord = useMemo(
    () => ({
      effort: 0,
      tags: { tag1: false, tag2: false },
    }),
    []
  );

  // 選択日のrecord（ない場合はデフォルト）
  const selectedRecord = useMemo(() => {
    if (!selectedDate) return null;
    return records[selectedDate] ?? defaultRecord;
  }, [selectedDate, records, defaultRecord]);

  // 記録を安全に更新する共通関数（その日付だけ更新）
  const updateRecord = (dateKey, updater) => {
    setRecords((prev) => {
      const current = prev[dateKey] ?? defaultRecord;
      const next = updater(current);
      return { ...prev, [dateKey]: next };
    });
  };

  // 頑張り度を更新
  const setEffortForSelectedDate = (effort) => {
    if (!selectedDate) return;
    updateRecord(selectedDate, (current) => ({
      ...current,
      effort,
    }));
  };

  // タグをON/OFF（チェック式）
  const toggleTagForSelectedDate = (tagKey) => {
    if (!selectedDate) return;
    updateRecord(selectedDate, (current) => ({
      ...current,
      tags: {
        ...current.tags,
        [tagKey]: !current.tags[tagKey],
      },
    }));
  };

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
                records={records}
              />

              <EditPanel
                selectedDate={selectedDate}
                selectedRecord={selectedRecord}
                tagNames={tagNames}
                setTagNames={setTagNames}
                onClose={() => setSelectedDate(null)}
                onSetEffort={setEffortForSelectedDate}
                onToggleTag={toggleTagForSelectedDate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
