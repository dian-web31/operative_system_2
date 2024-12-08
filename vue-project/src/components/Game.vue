<!-- src/components/Game.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>Videojuego: Pong</v-card-title>
        <canvas
          ref="gameCanvas"
          width="800"
          height="400"
          style="border: 1px solid black; background-color: black;"
        ></canvas>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ball: { x: 400, y: 200, vx: 3, vy: 2 },
        paddle1: { y: 150, score: 0 },
        paddle2: { y: 150, score: 0 },
        paddleHeight: 100,
        paddleWidth: 10,
        ballRadius: 10,
        isRunning: true, // Control para pausar el juego si es necesario
      };
    },
    mounted() {
      this.canvas = this.$refs.gameCanvas;
      this.ctx = this.canvas.getContext("2d");
      window.addEventListener("keydown", this.handleKeyDown);
      this.gameLoop();
    },
    beforeUnmount() {
      window.removeEventListener("keydown", this.handleKeyDown);
    },
    methods: {
      handleKeyDown(event) {
        // Controles para el jugador 1
        if (event.key === "w") {
          this.paddle1.y = Math.max(0, this.paddle1.y - 20);
        }
        if (event.key === "s") {
          this.paddle1.y = Math.min(
            400 - this.paddleHeight,
            this.paddle1.y + 20
          );
        }
        // Controles para el jugador 2
        if (event.key === "ArrowUp") {
          this.paddle2.y = Math.max(0, this.paddle2.y - 20);
        }
        if (event.key === "ArrowDown") {
          this.paddle2.y = Math.min(
            400 - this.paddleHeight,
            this.paddle2.y + 20
          );
        }
      },
      gameLoop() {
        if (this.isRunning) {
          this.updateGame();
          this.renderGame();
          requestAnimationFrame(this.gameLoop);
        }
      },
      updateGame() {
        // Movimiento de la pelota
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;
  
        // Rebote en bordes superior e inferior
        if (this.ball.y - this.ballRadius <= 0 || this.ball.y + this.ballRadius >= 400) {
          this.ball.vy *= -1;
        }
  
        // Colisión con las paletas
        if (
          (this.ball.x - this.ballRadius <= 30 &&
            this.ball.y >= this.paddle1.y &&
            this.ball.y <= this.paddle1.y + this.paddleHeight) ||
          (this.ball.x + this.ballRadius >= 770 &&
            this.ball.y >= this.paddle2.y &&
            this.ball.y <= this.paddle2.y + this.paddleHeight)
        ) {
          this.ball.vx *= -1.1; // Aumenta la velocidad después de cada rebote
        }
  
        // Puntaje y reinicio si la pelota pasa las paletas
        if (this.ball.x + this.ballRadius < 0) {
          this.paddle2.score += 1;
          this.resetBall();
        } else if (this.ball.x - this.ballRadius > 800) {
          this.paddle1.score += 1;
          this.resetBall();
        }
      },
      renderGame() {
        // Limpia el lienzo
        this.ctx.clearRect(0, 0, 800, 400);
  
        // Fondo
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 800, 400);
  
        // Dibujar pelota
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fill();
  
        // Dibujar paletas
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(20, this.paddle1.y, this.paddleWidth, this.paddleHeight);
        this.ctx.fillRect(
          770,
          this.paddle2.y,
          this.paddleWidth,
          this.paddleHeight
        );
  
        // Dibujar línea central
        this.ctx.strokeStyle = "white";
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(400, 0);
        this.ctx.lineTo(400, 400);
        this.ctx.stroke();
  
        // Mostrar puntajes
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Jugador 1: ${this.paddle1.score}`, 50, 30);
        this.ctx.fillText(`Jugador 2: ${this.paddle2.score}`, 600, 30);
      },
      resetBall() {
        // Reinicia la posición y velocidad de la pelota
        this.ball = { x: 400, y: 200, vx: 3, vy: 2 };
      },
    },
  };
  </script>
  
  <style scoped>
  canvas {
    display: block;
    margin: 0 auto;
  }
  </style>
  