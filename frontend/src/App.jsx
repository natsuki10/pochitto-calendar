import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import EditPanel from "./components/EditPanel/EditPanel";
import TagSettingsModal from "./components/TagSettingsModal/TagSettingsModal";

function App() {
  // localStorage保存
  const STORAGE_KEYS = {
    records: "pochitto-records-v2",
    tags: "pochitto-tags-v2",
  };

  const [ym, setYm] = useState({ year: 2025, month: 12 });
  const handlePrevMonth = () => {
    setYm((prev) => {
      if (prev.month === 1) return { year: prev.year - 1, month: 12 };
      return { year: prev.year, month: prev.month - 1 };
    });
  };
  const handleNextMonth = () => {
    setYm((prev) => {
      if (prev.month === 12) return { year: prev.year + 1, month: 1 };
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  // 選択されている日
  const [selectedDate, setSelectedDate] = useState(null);

  // タグ（動的）
  const [tags, setTags] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.tags);
      if (!raw) {
        return [
          { id: "t1", name: "タグ1" },
          { id: "t2", name: "タグ2" },
        ];
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      return [
        { id: "t1", name: "タグ1" },
        { id: "t2", name: "タグ2" },
      ];
    } catch {
      return [
        { id: "t1", name: "タグ1" },
        { id: "t2", name: "タグ2" },
      ];
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
      // 保存失敗してもアプリを落とさない
    }
  }, [records]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.tags, JSON.stringify(tags));
    } catch {
      // 保存失敗してもアプリを落とさない
    }
  }, [tags]);

  // 初期値（存在しない日付のデフォルト）
  const defaultRecord = useMemo(
    () => ({
      effort: 0,
      tagIds: [],
    }),
    []
  );

  // 選択日のrecord（ない場合はデフォルト）
  const selectedRecord = useMemo(() => {
    if (!selectedDate) return null;
    return records[selectedDate] ?? defaultRecord;
  }, [selectedDate, records, defaultRecord]);

  // 記録を安全に更新（その日付だけ更新）
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

  // タグをON/OFF（tagIds配列）
  const toggleTagForSelectedDate = (tagId) => {
    if (!selectedDate) return;
    updateRecord(selectedDate, (current) => {
      const tagIds = Array.isArray(current.tagIds) ? current.tagIds : [];
      const has = tagIds.includes(tagId);
      return {
        ...current,
        tagIds: has ? tagIds.filter((id) => id !== tagId) : [...tagIds, tagId],
      };
    });
  };

  // タグ削除：tagsから消す＋recordsからも除去
  const deleteTag = (tagId) => {
    setTags((prev) => prev.filter((t) => t.id !== tagId));
    setRecords((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((dateKey) => {
        const r = next[dateKey];
        if (!r || !Array.isArray(r.tagIds)) return;
        if (!r.tagIds.includes(tagId)) return;
        next[dateKey] = { ...r, tagIds: r.tagIds.filter((id) => id !== tagId) };
      });
      return next;
    });
  };

  // タグ名変更
  const renameTag = (tagId, name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setTags((prev) =>
      prev.map((t) => (t.id === tagId ? { ...t, name: trimmed } : t))
    );
  };

  // タグ追加
  const addTag = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    // 同名は追加しない
    const exists = tags.some((t) => t.name === trimmed);
    if (exists) return;

    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;

    setTags((prev) => [...prev, { id, name: trimmed }]);
  };

  // タグ設定モーダル
  const [isTagSettingsOpen, setIsTagSettingsOpen] = useState(false);

  return (
    <>
      <div className="app">
        <div className="container py-4 px-3">
          <div className="mx-auto" style={{ maxWidth: 420 }}>
            <div className="app__container">
              <h1 className="app__title mb-0">ぽちっとカレンダー(仮)</h1>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setIsTagSettingsOpen(true)}
              >
                タグ設定
              </button>
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
                tags={tags}
                onClose={() => setSelectedDate(null)}
                onSetEffort={setEffortForSelectedDate}
                onToggleTag={toggleTagForSelectedDate}
              />

              <TagSettingsModal
                isOpen={isTagSettingsOpen}
                onClose={() => setIsTagSettingsOpen(false)}
                tags={tags}
                onAddTag={addTag}
                onRenameTag={renameTag}
                onDeleteTag={deleteTag}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
