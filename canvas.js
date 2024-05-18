function drawDice(context, number) {
    const canvas = context.canvas;
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    context.fillStyle = "red";
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    context.fillStyle = "white";
    const dotRadius = 10;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const offset = 30;
  
    function drawDot(x, y) {
      context.beginPath();
      context.arc(x, y, dotRadius, 0, 2 * Math.PI);
      context.fill();
    }
  
    switch (number) {
      case 1:
        drawDot(centerX, centerY);
        break;
      case 2:
        drawDot(centerX - offset, centerY - offset);
        drawDot(centerX + offset, centerY + offset);
        break;
      case 3:
        drawDot(centerX - offset, centerY - offset);
        drawDot(centerX, centerY);
        drawDot(centerX + offset, centerY + offset);
        break;
      case 4:
        drawDot(centerX - offset, centerY - offset);
        drawDot(centerX + offset, centerY - offset);
        drawDot(centerX - offset, centerY + offset);
        drawDot(centerX + offset, centerY + offset);
        break;
      case 5:
        drawDot(centerX - offset, centerY - offset);
        drawDot(centerX + offset, centerY - offset);
        drawDot(centerX, centerY);
        drawDot(centerX - offset, centerY + offset);
        drawDot(centerX + offset, centerY + offset);
        break;
      case 6:
        drawDot(centerX - offset, centerY - offset);
        drawDot(centerX + offset, centerY - offset);
        drawDot(centerX - offset, centerY);
        drawDot(centerX + offset, centerY);
        drawDot(centerX - offset, centerY + offset);
        drawDot(centerX + offset, centerY + offset);
        break;
      default:
        break;
    }
  }
  