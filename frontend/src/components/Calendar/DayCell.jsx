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
  };

  return (
    <div style={style} onClick={onClick}>
      {day ?? ""}
    </div>
  );
}

export default DayCell;
