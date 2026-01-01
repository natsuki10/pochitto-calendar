import { useEffect, useMemo, useState } from "react";
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

  // 編集中の入力値（draft）をローカルで保持
  // { [tagId]: string }
  const [draftNames, setDraftNames] = useState({});

  // モーダルを開いたタイミングで、現在のタグ名を draft に同期
  useEffect(() => {
    if (!isOpen) return;
    const next = {};
    tags.forEach((t) => {
      next[t.id] = t.name ?? "";
    });
    setDraftNames(next);
  }, [isOpen, tags]);

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

  // 確定処理：空なら「元に戻す」、空でなければ保存
  const commitName = (tag) => {
    const raw = draftNames[tag.id] ?? "";
    const trimmed = raw.trim();

    if (trimmed.length === 0) {
      // 空はNG：元の名前に戻す
      setDraftNames((prev) => ({ ...prev, [tag.id]: tag.name ?? "" }));
      return;
    }

    // 変更があるときだけ保存（無駄な更新を減らす）
    if (trimmed !== tag.name) {
      onRenameTag(tag.id, trimmed);
    }

    // 余計な空白を消した状態で draft も揃える
    setDraftNames((prev) => ({ ...prev, [tag.id]: trimmed }));
  };

  // 閉じる前に、全タグを確定してから閉じる（保険）
  const handleClose = () => {
    tags.forEach((t) => commitName(t));
    onClose();
  };

  return (
    <div className="tagSettingsModal">
      <div className="tagSettingsModal__backdrop" onClick={handleClose} />
      <div className="tagSettingsModal__content">
        <div className="tagSettingsModal__header">
          <div className="tagSettingsModal__title">タグ設定</div>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleClose}
          >
            閉じる
          </button>
        </div>

        <div className="tagSettingsModal__body">
          <div className="tagSettingsModal__sectionTitle">タグ名の変更</div>
          <div className="text-muted" style={{ fontSize: 12, marginTop: 8 }}>
            ※空欄にした場合は確定時に元の名前に戻ります。
          </div>
          {tags.map((t) => (
            <div key={t.id} className="tagSettingsModal__row">
              <input
                className="form-control form-control-sm"
                value={draftNames[t.id] ?? ""}
                onChange={(e) =>
                  setDraftNames((prev) => ({ ...prev, [t.id]: e.target.value }))
                }
                onBlur={() => commitName(t)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur(); // blur で確定させる
                  }
                  if (e.key === "Escape") {
                    // Esc で元に戻す（任意）
                    setDraftNames((prev) => ({
                      ...prev,
                      [t.id]: t.name ?? "",
                    }));
                    e.currentTarget.blur();
                  }
                }}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
              }}
            />
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>
              追加
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
