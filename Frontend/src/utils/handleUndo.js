export const undo = (path, setPath, lastPath, setLastPath, canvas, ctx) => {
  if (path.length === 0 || lastPath.length === 0) {
    return;
  }

  const allPointsExceptLast = path.slice(0, path.length - lastPath.length);
  ctx.lineWidth = 4.4;
  ctx.fillStyle = 'white';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < allPointsExceptLast.length; i++) {
    let pt = allPointsExceptLast[i];
    let pt2 = allPointsExceptLast[i + 1];
    if (pt2 !== false && pt2) {
      ctx.strokeStyle = pt.color;
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
      ctx.lineTo(pt2.x, pt2.y);
      ctx.stroke();
    } else if (allPointsExceptLast[i + 2]) {
      ctx.moveTo(allPointsExceptLast[i + 2].x, allPointsExceptLast[i + 2].y);
    }

    ctx.stroke();

    setPath(allPointsExceptLast);
    setLastPath([]);
  }
};
