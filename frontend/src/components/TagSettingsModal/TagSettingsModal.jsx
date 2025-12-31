import { useState } from "react";
import "./TagSettingsModal.css";

export default function TagSettingsModal({
  isOpen,
  onClose,
  tags,
  onAddTag,
  onRenameTag,
  onDeleteTag,
}) {
  const [newName, setNewName] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    onAddTag(newName);
    setNewName("");
  };

  const handleDelete = (tagId, tagName) => {
    const ok = window.confirm(
      `「${tagName}」を削除しますか？\nこのタグは全ての日付の記録からも削除されます。`
    );
    if (!ok) return;
    onDeleteTag(tagId);
  };

  return (
    <div className="tagSettingsModal">
      <div className="tagSettingsModal__backdrop" onClick={onClose} />
      <div className="tagSettingsModal__content">
        <div className="tagSettingsModal__header">
          <div className="tagSettingsModal__title">タグ設定</div>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>

        <div className="tagSettingsModal__body">
          <div className="tagSettingsModal__sectionTitle">タグ名の変更</div>

          {tags.map((t) => (
            <div key={t.id} className="tagSettingsModal__row">
              <input
                className="form-control form-control-sm"
                value={t.name}
                onChange={(e) => onRenameTag(t.id, e.target.value)}
              />
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(t.id, t.name)}
              >
                削除
              </button>
            </div>
          ))}

          <hr />

          <div className="tagSettingsModal__sectionTitle">タグ追加</div>
          <div className="tagSettingsModal__row">
            <input
              className="form-control form-control-sm"
              placeholder="新しいタグ名"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>
              追加
            </button>
          </div>

          <div className="text-muted" style={{ fontSize: 12, marginTop: 8 }}>
            ※同名タグは追加できません（空欄も不可）
          </div>
        </div>
      </div>
    </div>
  );
}
