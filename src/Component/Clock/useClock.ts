import { useEffect } from "react";
import { eventId } from "Component/Clock/constant";
import { trackDragMovement } from "Component/Clock/utils";

const useClock = (onUpdate: (data: number, unit: "min" | "sec") => void) => {
  useEffect(() => {
    if (typeof window != "undefined") {
      clockHandEventLister(eventId.clockMinHand, (data) =>
        onUpdate(data, "min")
      );
      clockHandEventLister(eventId.clockSecondHand, (data) =>
        onUpdate(data, "sec")
      );
    }
  }, []);
  const clockHandEventLister = (
    eventId: string,
    onChange: (result: number) => void
  ) => {
    const handElement = document.getElementById(eventId);
    handElement?.addEventListener("mousedown", (e) =>
      trackDragMovement(e, onChange)
    );
  };
};
export default useClock;
