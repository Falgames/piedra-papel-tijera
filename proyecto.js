// Configuración básica
const moves = ["piedra", "papel", "tijera"];

const playerScoreEl = document.getElementById("playerScore");
const cpuScoreEl = document.getElementById("cpuScore");
const roundsEl = document.getElementById("rounds");
const resultTextEl = document.getElementById("resultText");
const playerMoveEl = document.getElementById("playerMove");
const cpuMoveEl = document.getElementById("cpuMove");
const logEl = document.getElementById("log");
const resetBtn = document.getElementById("resetBtn");
const choiceButtons = document.querySelectorAll("button.choice");

let playerScore = 0;
let cpuScore = 0;
let rounds = 0;
let consecutiveWins = 0;     // NUEVO: contador de victorias seguidas
let consecutiveLosses = 0;   // NUEVO: contador de derrotas seguidas

// Lógica de ganador
function decideWinner(player, cpu) {
  if (player === cpu) return "empate";
  const wins =
    (player === "piedra" && cpu === "tijera") ||
    (player === "papel" && cpu === "piedra") ||
    (player === "tijera" && cpu === "papel");
  return wins ? "jugador" : "cpu";
}

// Movimiento aleatorio de la CPU
function cpuPlay() {
  const i = Math.floor(Math.random() * moves.length);
  return moves[i];
}

// Actualiza marcador y UI
function updateUI(player, cpu, outcome) {
  rounds++;
  roundsEl.textContent = rounds;
  playerMoveEl.textContent = player;
  cpuMoveEl.textContent = cpu;

  if (outcome === "jugador") {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    resultTextEl.textContent = "¡Ganaste esta ronda!";
    consecutiveWins++;
    consecutiveLosses = 0; // reinicia derrotas

    if (consecutiveWins === 3) {
      resultTextEl.textContent = "🎉 ¡Felicidades! Has ganado 3 partidas seguidas. ¡Premio desbloqueado!";
      alert("🎉 ¡Felicidades! Has ganado 3 partidas seguidas. ¡Premio desbloqueado!");
      consecutiveWins = 0;
    }

  } else if (outcome === "cpu") {
    cpuScore++;
    cpuScoreEl.textContent = cpuScore;
    resultTextEl.textContent = "La CPU gana esta ronda.";
    consecutiveLosses++;
    consecutiveWins = 0; // reinicia victorias

    if (consecutiveLosses === 3) {
      resultTextEl.textContent = "😓 ¡Racha de derrotas! Intenta concentrarte más.";
      alert("😓 Has perdido 3 veces seguidas. ¡Ánimo, puedes mejorar!");
      consecutiveLosses = 0;
    }

  } else {
    resultTextEl.textContent = "Empate.";
    consecutiveWins = 0;
    consecutiveLosses = 0;
  }

  const line = `Ronda ${rounds}: Tú (${player}) vs CPU (${cpu}) → ${outcome.toUpperCase()}`;
  logEl.textContent = (logEl.textContent ? logEl.textContent + "\n" : "") + line;
}

// Manejadores de eventos
choiceButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const player = btn.dataset.move;
    const cpu = cpuPlay();
    const outcome = decideWinner(player, cpu);
    updateUI(player, cpu, outcome);
  });
});

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  cpuScore = 0;
  rounds = 0;
  consecutiveWins = 0;
  consecutiveLosses = 0;
  playerScoreEl.textContent = "0";
  cpuScoreEl.textContent = "0";
  roundsEl.textContent = "0";
  playerMoveEl.textContent = "—";
  cpuMoveEl.textContent = "—";
  resultTextEl.textContent = "Haz tu jugada.";
  logEl.textContent = "";
});


