export const getCenterCoordinatesOfClock = () => {
  let clock = document.getElementById("clockContainer");
  let clockRect = clock?.getBoundingClientRect();
  if (clockRect) {
    let centerX = clockRect.left + clockRect.width / 2;
    let centerY = clockRect.top + clockRect.height / 2;
    return { clockX: centerX, clockY: centerY };
  }
  return null;
};

export const trackDragMovement = (e: any, onChange: (data: number) => void) => {
  e.preventDefault();
  console.log("mouseDown");
  const centerCor = getCenterCoordinatesOfClock();
  if (!centerCor) return;

  function onMouseMove(e: any) {
    if (!centerCor) return;
    let deltaX = centerCor.clockX - e.clientX;
    let deltaY = centerCor.clockY - e.clientY;
    let rad = Math.atan2(deltaY, deltaX);
    let deg = rad * (180 / Math.PI) - 90;
    if (deg < 0) {
      deg += 360;
    }
    if (deg > 360) {
      deg -= 360;
    }
    let minutes = Math.floor(deg / 6) % 60;
    onChange(minutes);
  }
  function onMouseUp() {
    console.log("mouseup");
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};
