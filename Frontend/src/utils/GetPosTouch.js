// Get the position of a touch relative to the canvas
export const getTouchPos = (canvasDom, touchEvent) => {
  var rect = canvasDom.getBoundingClientRect();
  return {
    posx: touchEvent.touches[0].clientX - rect.left,
    posy: touchEvent.touches[0].clientY - rect.top,
  };
};
