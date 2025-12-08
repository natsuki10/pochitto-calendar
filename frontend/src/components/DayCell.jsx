function DayCell({ day, bgColor }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        backgroundColor: bgColor || "white", // 指定なければ白
      }}
    >
      {day}
    </div>
  );
}

export default DayCell;
