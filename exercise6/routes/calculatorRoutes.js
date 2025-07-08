const express = require("express");
const calculatorController = require("../controllers/calculatorController");
const router = express.Router();

// Add route - based on Module5Code example
router.get("/add", (req, res) => {
  calculatorController.addNumbers(req, res);
});

// Subtract route
router.get("/subtract", (req, res) => {
  calculatorController.subtractNumbers(req, res);
});

// Multiply route
router.get("/multiply", (req, res) => {
  calculatorController.multiplyNumbers(req, res);
});

// Divide route
router.get("/divide", (req, res) => {
  calculatorController.divideNumbers(req, res);
});

module.exports = router;