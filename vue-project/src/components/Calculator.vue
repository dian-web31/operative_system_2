<template>
  <v-container>
    <v-card class="calculator">
      <v-card-title class="text-center">Calculadora Científica</v-card-title>
      <v-text-field
        v-model="expression"
        label="Expresión"
        readonly
        outlined
        dense
      ></v-text-field>
      <div class="buttons-grid">
        <v-btn v-for="btn in buttons" :key="btn" @click="appendToExpression(btn)" small>{{ btn }}</v-btn>
      </div>
      <v-row justify="space-between">
        <v-btn color="primary" @click="calculate" small>Calcular</v-btn>
        <v-btn color="error" @click="clear" small>Limpiar</v-btn>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <div>Resultado: <strong>{{ result }}</strong></div>
    </v-card>
  </v-container>
</template>

<script>
import { evaluate } from "mathjs";

export default {
  data() {
    return {
      expression: "",
      result: "",
      buttons: [
        "7", "8", "9", "/", 
        "4", "5", "6", "*", 
        "1", "2", "3", "-", 
        "0", ".", "(", ")", 
        "+", "sin", "cos", "tan", 
        "log", "ln", "sqrt", "^", 
        "π", "e"
      ],
    };
  },
  methods: {
    appendToExpression(value) {
      const replacements = {
        π: "pi",
        e: "e",
        "√": "sqrt"
      };
      this.expression += replacements[value] || value;
    },
    calculate() {
      try {
        this.result = evaluate(this.expression);
      } catch {
        this.result = "Error en la expresión";
      }
    },
    clear() {
      this.expression = "";
      this.result = "";
    },
  },
};
</script>

<style scoped>
.calculator {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
.buttons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 20px 0;
}
.v-btn {
  text-transform: none;
}
</style>
