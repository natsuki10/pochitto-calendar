// src/components/DayCell.jsx
function DayCell({ day, bgColor, isSelected, onClick }) {
  const style = {
    width: "60px",
    height: "60px",
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
