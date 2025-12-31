import "./TagSettingsModal.css";

const DEFAULT_TAG_NAMES = {
  tag1: "タグ1",
  tag2: "タグ2",
};

export default function TagSettingsModal({
  isOpen,
  onClose,
  tagNames,
  setTagNames,
}) {
  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setTagNames((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBlur = (key, value) => {
    if (value.trim() === "") {
      setTagNames((prev) => ({
        ...prev,
        [key]: DEFAULT_TAG_NAMES[key],
      }));
    }
  };

  return (
    <div className="tagModal__backdrop" onClick={onClose} role="presentation">
      <div
        className="tagModal__dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="タグ設定"
      >
        <div className="tagModal__header">
          <div className="tagModal__title">タグ設定</div>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={onClose}
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <div className="tagModal__body">
          <div className="mb-2">
            <label className="form-label">タグ1</label>
            <input
              className="form-control form-control-sm"
              value={tagNames.tag1}
              onChange={(e) => handleChange("tag1", e.target.value)}
              onBlur={(e) => handleBlur("tag1", e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">タグ2</label>
            <input
              className="form-control form-control-sm"
              value={tagNames.tag2}
              onChange={(e) => handleChange("tag2", e.target.value)}
              onBlur={(e) => handleBlur("tag2", e.target.value)}
            />
          </div>

          <div className="text-muted" style={{ fontSize: 12 }}>
            ※追加・削除は次のIssueで対応
          </div>
        </div>
      </div>
    </div>
  );
}
