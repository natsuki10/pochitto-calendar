import "./EditPanel.css";

export default function EditPanel({
  selectedDate,
  selectedRecord,
  tags,
  onClose,
  onSetEffort,
  onToggleTag,
}) {
  if (!selectedDate || !selectedRecord) return null;

  const selectedTagIds = Array.isArray(selectedRecord.tagIds)
    ? selectedRecord.tagIds
    : [];

  return (
    <div className="editPanel">
      <div className="editPanel__header">
        <div className="editPanel__title">{selectedDate}</div>
        <button className="btn btn-outline-secondary btn-sm" onClick={onClose}>
          閉じる
        </button>
      </div>

      <div className="editPanel__section">
        <div className="editPanel__label">頑張り度</div>
        <div className="editPanel__effort">
          {[0, 1, 2, 3, 4].map((v) => (
            <button
              key={v}
              className={`btn btn-sm ${
                selectedRecord.effort === v
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => onSetEffort(v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="editPanel__section">
        <div className="editPanel__label">タグ</div>

        {tags.map((tag) => (
          <label key={tag.id} className="editPanel__checkbox">
            <input
              type="checkbox"
              checked={selectedTagIds.includes(tag.id)}
              onChange={() => onToggleTag(tag.id)}
            />
            <span>{tag.name}</span>
          </label>
        ))}

        {tags.length === 0 && (
          <div className="text-muted" style={{ fontSize: 12 }}>
            タグがありません。「タグ設定」から追加してください。
          </div>
        )}
      </div>
    </div>
  );
}
