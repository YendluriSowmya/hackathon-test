document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("diceCanvas");
    const context = canvas.getContext("2d");
  
    function rollDice() {
      const result = Math.floor(Math.random() * 6) + 1;
      drawDice(context, result);
    }
  
    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        rollDice();
      }
    });
    rollDice();
  });
  