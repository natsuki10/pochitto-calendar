import "./EditPanel.css";

const DEFAULT_TAG_NAMES = {
  tag1: "タグ1",
  tag2: "タグ2",
};

export default function EditPanel({
  selectedDate,
  selectedRecord,
  tagNames,
  setTagNames,
  onClose,
  onSetEffort,
  onToggleTag,
}) {
  if (!selectedDate || !selectedRecord) return null;

  const handleChangeTagName = (key, value) => {
    const trimmed = value;
    setTagNames((prev) => ({
      ...prev,
      [key]: trimmed,
    }));
  };
  const handleBlurTagName = (key, value) => {
    if (value.trim() === "") {
      setTagNames((prev) => ({
        ...prev,
        [key]: DEFAULT_TAG_NAMES[key],
      }));
    }
  };

  return (
    <div className="editPanel">
      <div className="editPanel__header">
        <div className="editPanel__date">選択日：{selectedDate}</div>

        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={onClose}
          aria-label="閉じる"
        >
          ×
        </button>
      </div>

      <div className="editPanel__section">
        <div className="editPanel__label">頑張り度</div>
        <div className="editPanel__row">
          {[0, 1, 2, 3, 4].map((n) => (
            <button
              key={n}
              className={
                "btn btn-sm " +
                (selectedRecord.effort === n
                  ? "btn-primary"
                  : "btn-outline-primary")
              }
              onClick={() => onSetEffort(n)}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="editPanel__hint">
          0:やっていない / 1:少し / 2:まあまあ / 3:けっこう / 4:かなり
        </div>
      </div>

      <div className="editPanel__section">
        <div className="editPanel__label">タグ</div>

        <label className="editPanel__checkbox">
          <input
            type="checkbox"
            checked={!!selectedRecord.tags.tag1}
            onChange={() => onToggleTag("tag1")}
          />
          <span>{tagNames.tag1}</span>
        </label>

        <label className="editPanel__checkbox">
          <input
            type="checkbox"
            checked={!!selectedRecord.tags.tag2}
            onChange={() => onToggleTag("tag2")}
          />
          <span>{tagNames.tag2}</span>
        </label>
      </div>
    </div>
  );
}
