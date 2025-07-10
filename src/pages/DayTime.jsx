import React, { useEffect, useState } from "react";

function DayTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const update = () => setCurrentTime(new Date());
    const interval = setInterval(update, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  // Format date and time
  const formattedDate = currentTime.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="absolute top-14 sm:top-13 right-4 text-white text-sm font-mono bg-black/40 px-4 py-2 rounded shadow-md">
      <div>{formattedDate}</div>
      <div>{formattedTime}</div>
      <div className="text-gray-300 text-xs">{timeZone}</div>
    </div>
  );
}

export default DayTime;
