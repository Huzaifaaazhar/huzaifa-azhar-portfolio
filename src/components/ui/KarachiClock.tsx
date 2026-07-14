"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Karachi",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

/** Live local time in Karachi. Renders a stable placeholder on the server
 *  and starts ticking after mount to avoid hydration mismatches. */
export function KarachiClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono tabular-nums" suppressHydrationWarning>
      {time ?? "--:--:-- --"}
    </span>
  );
}
