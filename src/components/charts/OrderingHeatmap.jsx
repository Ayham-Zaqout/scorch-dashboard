"use client";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = [
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
];
const COLORS = [
  "#fff0eb",
  "#ffe1d5",
  "#ffc4ad",
  "#ff9a78",
  "#ff7650",
  "#ff5a1f",
];

export default function OrderingHeatmap({ data }) {
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full">
        <div className="grid grid-cols-[30px_repeat(15,minmax(0,1fr))] gap-0.5">
          <span />
          {HOURS.map((hour) => (
            <span
              key={hour}
              className="truncate pb-1 text-center text-[9px] text-ink-400"
            >
              {hour}
            </span>
          ))}
          {data.map((row, rowIndex) => (
            <div key={DAYS[rowIndex]} className="contents">
              <span className="self-center text-xs text-ink-500">
                {DAYS[rowIndex]}
              </span>
              {row.map((level, index) => (
                <div
                  key={index}
                  title={`${DAYS[rowIndex]} ${index + 8}:00`}
                  className="aspect-square w-full rounded transition-transform hover:scale-110"
                  style={{ background: COLORS[level] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
