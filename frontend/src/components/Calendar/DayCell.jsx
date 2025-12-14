// src/components/Calendar/DayCell.jsx
function DayCell({ day, bgColor, isSelected, onClick }) {
  const style = {
    flex: 1,
    aspectRatio: "1 / 1", //正方形にする
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: bgColor || "white",
    border: isSelected ? "3px solid #333" : "1px solid #ccc",
    cursor: day ? "pointer" : "default",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    userSelect: "none", //カーソルを表示させない
    WebkitUserSelect: "none", // iOS対策
    WebkitTapHighlightColor: "transparent", //iOS対策
  };

  return (
    <div
      style={style}
      onClick={day ? onClick : undefined}
      onMouseDown={(e) => {
        if (day) e.currentTarget.style.transform = "scale(0.95)";
      }}
      onMouseUp={(e) => {
        if (day) e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        if (day) e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {day ?? ""}
    </div>
  );
}

export default DayCell;
