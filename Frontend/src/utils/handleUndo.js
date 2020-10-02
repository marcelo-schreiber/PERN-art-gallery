export const undo = (path, setPath, lastPath, setLastPath, canvas, ctx) => {
  if (path.length === 0 || lastPath.length === 0) {
    return;
  }

  const diff = path.length - lastPath.length - 1;
  const allPointsExceptLast = path.slice(0, diff);

  ctx.fillStyle = 'white';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (diff === 0) {
    setPath([]);
    setLastPath([]);
    return;
  }

  for (let i = 0; i < allPointsExceptLast.length; i++) {
    const pt = allPointsExceptLast[i];
    const pt2 = allPointsExceptLast[i + 1];
    const pt3 = allPointsExceptLast[i + 2];
    if (pt2 !== false && pt2) {
      ctx.strokeStyle = pt.color;
      ctx.lineWidth = pt.brushSize + 0.55;
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
      ctx.lineTo(pt2.x, pt2.y);
      ctx.stroke();
    } else if (pt3) {
      i++;
    }

    ctx.stroke();
  }

  setPath(allPointsExceptLast);
  setLastPath([]);
};
